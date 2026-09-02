'use client'

import { useState } from 'react'

const ZONES = [
  'UTC', 'America/New_York', 'America/Los_Angeles', 'America/Chicago', 'Europe/London',
  'Europe/Paris', 'Europe/Berlin', 'Asia/Jakarta', 'Asia/Singapore', 'Asia/Tokyo',
  'Asia/Shanghai', 'Asia/Kolkata', 'Asia/Dubai', 'Australia/Sydney',
]

export default function TimezoneConverter() {
  const [dt, setDt] = useState(() => new Date().toISOString().slice(0, 16))
  const [fromZone, setFromZone] = useState('Asia/Jakarta')

  // interpret the entered wall-clock time as being in fromZone, get the UTC instant
  let instant: Date | null = null
  try {
    // build a date treating input as local, then adjust by fromZone offset
    const local = new Date(dt)
    const asUtc = new Date(local.toLocaleString('en-US', { timeZone: 'UTC' }))
    const asZone = new Date(local.toLocaleString('en-US', { timeZone: fromZone }))
    const offset = asUtc.getTime() - asZone.getTime()
    instant = new Date(local.getTime() + offset)
  } catch { instant = null }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end text-sm text-gray-700 dark:text-gray-300">
        <label className="flex flex-col gap-1">Date & time
          <input type="datetime-local" value={dt} onChange={e => setDt(e.target.value)} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" />
        </label>
        <label className="flex flex-col gap-1">Source timezone
          <select value={fromZone} onChange={e => setFromZone(e.target.value)} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded">
            {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </label>
      </div>
      {instant && !isNaN(instant.getTime()) && (
        <table className="w-full text-sm font-mono">
          <tbody>
            {ZONES.map(z => (
              <tr key={z} className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-1.5 text-gray-500 dark:text-gray-400">{z}</td>
                <td className="py-1.5">{instant!.toLocaleString('en-GB', { timeZone: z, dateStyle: 'medium', timeStyle: 'short' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Enter a time in the source timezone; the table shows the same instant across zones. DST is handled by your browser&apos;s Intl engine.</p>
    </div>
  )
}
