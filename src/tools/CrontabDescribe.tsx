'use client'

import { useState } from 'react'

const DOW = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MON = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function describeField(f: string, unit: string, names?: string[]): string {
  if (f === '*') return `every ${unit}`
  if (f.startsWith('*/')) return `every ${f.slice(2)} ${unit}s`
  if (f.includes('-')) {
    const [a, b] = f.split('-')
    return `${unit}s ${names ? names[+a] : a} through ${names ? names[+b] : b}`
  }
  if (f.includes(',')) {
    const list = f.split(',').map(v => names ? names[+v] : v)
    return `${unit}s ${list.join(', ')}`
  }
  return `${unit} ${names ? names[+f] : f}`
}

function describe(expr: string): string {
  const p = expr.trim().split(/\s+/)
  if (p.length !== 5) throw new Error('Expected 5 fields: minute hour day month weekday')
  const [min, hr, dom, mon, dow] = p
  const bits: string[] = []

  // time
  if (min === '*' && hr === '*') bits.push('Every minute')
  else if (hr === '*') bits.push(`At ${describeField(min, 'minute')}`)
  else if (min.match(/^\d+$/) && hr.match(/^\d+$/)) bits.push(`At ${hr.padStart(2, '0')}:${min.padStart(2, '0')}`)
  else bits.push(`At ${describeField(min, 'minute')} past ${describeField(hr, 'hour')}`)

  if (dom !== '*') bits.push(`on ${describeField(dom, 'day-of-month')}`)
  if (mon !== '*') bits.push(`in ${describeField(mon, 'month', MON)}`)
  if (dow !== '*') bits.push(`on ${describeField(dow, 'weekday', DOW)}`)

  return bits.join(', ')
}

export default function CrontabDescribe() {
  const [expr, setExpr] = useState('*/15 9-17 * * 1-5')
  let out = '', err = ''
  try { out = describe(expr) } catch (e) { err = (e as Error).message }

  return (
    <div className="space-y-4">
      <input type="text" value={expr} onChange={e => setExpr(e.target.value)} placeholder="*/15 9-17 * * 1-5" className="w-full px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {err && <p className="text-sm text-red-600">{err}</p>}
      {out && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300">{out}</p>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Translates a 5-field cron expression into plain English. Supports <code>*</code>, ranges, lists, and <code>*/step</code>.</p>
    </div>
  )
}
