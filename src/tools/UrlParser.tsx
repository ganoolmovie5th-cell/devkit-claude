'use client'

import { useState } from 'react'

export default function UrlParser() {
  const [input, setInput] = useState('')

  let parts: { label: string; value: string }[] = []
  let query: [string, string][] = []
  let error = ''
  if (input.trim()) {
    try {
      const u = new URL(input.trim())
      parts = [
        { label: 'Protocol', value: u.protocol },
        { label: 'Host', value: u.host },
        { label: 'Hostname', value: u.hostname },
        { label: 'Port', value: u.port || '(default)' },
        { label: 'Path', value: u.pathname },
        { label: 'Query', value: u.search || '(none)' },
        { label: 'Hash', value: u.hash || '(none)' },
        { label: 'Origin', value: u.origin },
      ]
      query = [...u.searchParams.entries()]
    } catch { error = 'Invalid URL. Include the protocol, e.g. https://example.com/path?a=1' }
  }

  return (
    <div className="space-y-4">
      <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="https://example.com/path?a=1&b=2#section" className="w-full px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {parts.length > 0 && (
        <table className="w-full text-sm font-mono">
          <tbody>
            {parts.map(p => (
              <tr key={p.label} className="border-b border-gray-100 dark:border-gray-800"><td className="py-1.5 text-gray-500 dark:text-gray-400 w-32">{p.label}</td><td className="py-1.5 break-all">{p.value}</td></tr>
            ))}
          </tbody>
        </table>
      )}
      {query.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Query parameters</p>
          <table className="w-full text-sm font-mono">
            <tbody>
              {query.map(([k, v], i) => (
                <tr key={i} className="border-b border-gray-100 dark:border-gray-800"><td className="py-1.5 text-blue-600 dark:text-blue-400 w-40">{k}</td><td className="py-1.5 break-all">{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
