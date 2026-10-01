'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function NumberBaseConverter() {
  const [input, setInput] = useState('')
  const [base, setBase] = useState(10)
  const [error, setError] = useState('')

  let decimal = 0
  let valid = false
  const trimmed = input.trim()
  if (trimmed !== '') {
    // Reject any digit not valid for the chosen base (parseInt silently
    // truncates on the first invalid char otherwise).
    const digits = '0123456789abcdefghijklmnopqrstuvwxyz'.slice(0, base)
    const allowed = new RegExp(`^[+-]?[${digits}]+$`, 'i')
    if (allowed.test(trimmed)) {
      decimal = parseInt(trimmed, base)
      valid = !isNaN(decimal)
    }
  }

  const results = valid ? [
    { label: 'Binary (2)', value: decimal.toString(2) },
    { label: 'Octal (8)', value: decimal.toString(8) },
    { label: 'Decimal (10)', value: decimal.toString(10) },
    { label: 'Hexadecimal (16)', value: decimal.toString(16).toUpperCase() },
  ] : []

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a number..."
          className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={base}
          onChange={e => setBase(+e.target.value)}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg"
        >
          <option value={2}>Binary (2)</option>
          <option value={8}>Octal (8)</option>
          <option value={10}>Decimal (10)</option>
          <option value={16}>Hex (16)</option>
        </select>
      </div>
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {results.map(r => (
            <div key={r.label} className="relative p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{r.label}</p>
              <p className="font-mono font-bold text-lg break-all">{r.value}</p>
              <div className="absolute top-2 right-2"><CopyButton text={r.value} /></div>
            </div>
          ))}
        </div>
      )}
      {input && !valid && <p className="text-red-500 text-sm">Invalid number for base {base}</p>}
    </div>
  )
}
