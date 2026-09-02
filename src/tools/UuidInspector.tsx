'use client'

import { useState } from 'react'

export default function UuidInspector() {
  const [input, setInput] = useState('')

  const uuid = input.trim().toLowerCase()
  const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(uuid)
  let version = 0, variant = '', timestamp = ''
  if (valid) {
    version = parseInt(uuid[14], 16)
    const v = parseInt(uuid[19], 16)
    variant = v >= 8 && v <= 0xb ? 'RFC 4122' : v >= 0xc ? 'Microsoft' : 'NCS/reserved'
    if (version === 1) {
      // v1: time in 100ns intervals since 1582-10-15
      const hex = uuid.slice(15, 18) + uuid.slice(9, 13) + uuid.slice(0, 8)
      const intervals = BigInt('0x' + hex)
      const ms = Number(intervals / BigInt(10000)) - 12219292800000
      timestamp = new Date(ms).toISOString()
    }
  }

  return (
    <div className="space-y-4">
      <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Paste a UUID..." className="w-full px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {input && !valid && <p className="text-sm text-red-600">Not a valid UUID format.</p>}
      {valid && (
        <div className="space-y-2 text-sm">
          <div className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg text-green-700 dark:text-green-400">Valid UUID</div>
          <table className="w-full font-mono">
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="py-1.5 text-gray-500 dark:text-gray-400">Version</td><td className="py-1.5">v{version}</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="py-1.5 text-gray-500 dark:text-gray-400">Variant</td><td className="py-1.5">{variant}</td></tr>
              {timestamp && <tr className="border-b border-gray-100 dark:border-gray-800"><td className="py-1.5 text-gray-500 dark:text-gray-400">Timestamp (v1)</td><td className="py-1.5">{timestamp}</td></tr>}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Detects UUID version and variant. Timestamp extraction works for version 1 (time-based) UUIDs.</p>
    </div>
  )
}
