'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

// Unix cron (5 fields: min hour dom mon dow) -> AWS EventBridge (6 fields: min hour dom mon dow year)
// AWS quirks: day-of-week 1-7 (Sun=1), and you cannot specify both DOM and DOW (one must be ?).
function convert(unix: string): { aws: string; notes: string[] } {
  const p = unix.trim().split(/\s+/)
  if (p.length !== 5) throw new Error('Expected 5-field Unix cron: minute hour day month weekday')
  let [min, hour, dom, mon, dow] = p
  const notes: string[] = []

  // AWS DOW is 1-7 (Sun=1); Unix is 0-6 (Sun=0). Shift numeric values.
  if (dow !== '*' && dow !== '?') {
    dow = dow.replace(/\d+/g, d => String((Number(d) % 7) + 1))
    notes.push('Day-of-week shifted to AWS range (Sun=1..Sat=7).')
  }

  // AWS forbids both DOM and DOW being specified; one must be '?'.
  if (dom !== '*' && dow !== '*') { dow = '?'; notes.push('AWS allows only one of day-of-month / day-of-week — set day-of-week to ?.') }
  else if (dom === '*' && dow !== '*') { dom = '?' }
  else if (dow === '*') { dow = '?' }

  return { aws: `cron(${min} ${hour} ${dom} ${mon} ${dow} *)`, notes }
}

export default function CronAwsEventbridge() {
  const [input, setInput] = useState('*/15 9 * * 1-5')
  let aws = '', notes: string[] = [], err = ''
  try { const r = convert(input); aws = r.aws; notes = r.notes } catch (e) { err = (e as Error).message }

  return (
    <div className="space-y-4">
      <label className="block text-sm text-gray-700 dark:text-gray-300">Unix cron (5 fields)
        <input type="text" value={input} onChange={e => setInput(e.target.value)} className="mt-1 w-full px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
      </label>
      {err && <p className="text-sm text-red-600">{err}</p>}
      {aws && (
        <>
          <div className="relative">
            <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm">{aws}</pre>
            <div className="absolute top-2 right-2"><CopyButton text={aws} /></div>
          </div>
          {notes.length > 0 && (
            <ul className="text-xs text-amber-700 dark:text-amber-400 space-y-1">
              {notes.map((n, i) => <li key={i}>⚠ {n}</li>)}
            </ul>
          )}
        </>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">AWS EventBridge uses a 6-field cron with a year field, 1-based weekdays, and a <code>?</code> for the unused day field. Times are UTC.</p>
    </div>
  )
}
