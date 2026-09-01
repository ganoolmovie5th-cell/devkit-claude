'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

// Parse one cron field into the set of allowed values.
function parseField(field: string, min: number, max: number): Set<number> {
  const out = new Set<number>()
  for (const part of field.split(',')) {
    let step = 1
    let range = part
    const slash = part.split('/')
    if (slash.length === 2) { range = slash[0]; step = Number(slash[1]) }
    let lo = min, hi = max
    if (range !== '*') {
      const dash = range.split('-')
      lo = Number(dash[0])
      hi = dash.length === 2 ? Number(dash[1]) : lo
    }
    for (let v = lo; v <= hi; v += step) out.add(v)
  }
  return out
}

function nextRuns(expr: string, count: number): Date[] {
  const parts = expr.trim().split(/\s+/)
  if (parts.length !== 5) throw new Error('Expected 5 fields: minute hour day month weekday')
  const [min, hr, dom, mon, dow] = [
    parseField(parts[0], 0, 59),
    parseField(parts[1], 0, 23),
    parseField(parts[2], 1, 31),
    parseField(parts[3], 1, 12),
    parseField(parts[4], 0, 6),
  ]
  const runs: Date[] = []
  const d = new Date()
  d.setSeconds(0, 0)
  d.setMinutes(d.getMinutes() + 1)
  let guard = 0
  while (runs.length < count && guard < 500000) {
    guard++
    if (
      min.has(d.getMinutes()) &&
      hr.has(d.getHours()) &&
      mon.has(d.getMonth() + 1) &&
      dom.has(d.getDate()) &&
      dow.has(d.getDay())
    ) {
      runs.push(new Date(d))
    }
    d.setMinutes(d.getMinutes() + 1)
  }
  return runs
}

export default function CronNextRuns() {
  const [expr, setExpr] = useState('*/15 * * * *')
  const [runs, setRuns] = useState<Date[]>([])
  const [err, setErr] = useState('')

  const calc = () => {
    setErr('')
    try { setRuns(nextRuns(expr, 10)) }
    catch (e) { setErr((e as Error).message); setRuns([]) }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={expr} onChange={e => setExpr(e.target.value)} placeholder="*/15 * * * *" className="flex-1 px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button onClick={calc} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Next runs</button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Standard 5-field cron (minute hour day month weekday). Times shown in your local timezone. Supports <code>*</code>, ranges, lists, and <code>*/step</code>.</p>
      {err && <p className="text-sm text-red-600">{err}</p>}
      {runs.length > 0 && (
        <div className="relative">
          <ol className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm space-y-1">
            {runs.map((r, i) => <li key={i}>{i + 1}. {r.toLocaleString()}</li>)}
          </ol>
          <div className="absolute top-2 right-2"><CopyButton text={runs.map(r => r.toLocaleString()).join('\n')} /></div>
        </div>
      )}
    </div>
  )
}
