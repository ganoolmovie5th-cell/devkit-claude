'use client'

import { useState } from 'react'

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

export default function ByteConverter() {
  const [value, setValue] = useState('1')
  const [unit, setUnit] = useState('MB')
  const [binary, setBinary] = useState(false)

  const factor = binary ? 1024 : 1000
  const idx = UNITS.indexOf(unit)
  const bytes = (parseFloat(value) || 0) * Math.pow(factor, idx)

  const label = binary ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'] : UNITS

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <input type="number" value={value} onChange={e => setValue(e.target.value)} className="w-32 px-3 py-2 font-mono border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
        <select value={unit} onChange={e => setUnit(e.target.value)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg">
          {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
        <label className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 ml-2">
          <input type="checkbox" checked={binary} onChange={e => setBinary(e.target.checked)} /> Binary (1024)
        </label>
      </div>
      <table className="w-full text-sm font-mono">
        <tbody>
          {label.map((u, i) => (
            <tr key={u} className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-1.5 text-gray-500 dark:text-gray-400">{u}</td>
              <td className="py-1.5 text-right">{(bytes / Math.pow(factor, i)).toLocaleString(undefined, { maximumFractionDigits: 6 })}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-gray-500 dark:text-gray-400">Decimal uses 1000 (KB/MB, disk vendors). Binary uses 1024 (KiB/MiB, RAM/OS).</p>
    </div>
  )
}
