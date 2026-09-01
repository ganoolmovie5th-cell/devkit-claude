'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function CorsExplainer() {
  const [origin, setOrigin] = useState('https://example.com')
  const [methods, setMethods] = useState('GET, POST, OPTIONS')
  const [credentials, setCredentials] = useState(false)
  const [headers, setHeaders] = useState('Content-Type, Authorization')

  const lines = [
    `Access-Control-Allow-Origin: ${credentials ? origin || '<your-origin>' : origin || '*'}`,
    `Access-Control-Allow-Methods: ${methods}`,
    `Access-Control-Allow-Headers: ${headers}`,
  ]
  if (credentials) lines.push('Access-Control-Allow-Credentials: true')
  lines.push('Access-Control-Max-Age: 86400')
  const config = lines.join('\n')

  const wildcardWithCreds = credentials && (origin === '*' || origin === '')

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
        <label className="flex flex-col gap-1 text-gray-700 dark:text-gray-300">Allowed origin
          <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} className="px-3 py-2 font-mono border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
        </label>
        <label className="flex flex-col gap-1 text-gray-700 dark:text-gray-300">Methods
          <input type="text" value={methods} onChange={e => setMethods(e.target.value)} className="px-3 py-2 font-mono border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
        </label>
        <label className="flex flex-col gap-1 text-gray-700 dark:text-gray-300">Allowed headers
          <input type="text" value={headers} onChange={e => setHeaders(e.target.value)} className="px-3 py-2 font-mono border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
        </label>
        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mt-6">
          <input type="checkbox" checked={credentials} onChange={e => setCredentials(e.target.checked)} /> Allow credentials (cookies/auth)
        </label>
      </div>
      {wildcardWithCreds && <p className="text-sm text-red-600">Invalid: you cannot use <code>*</code> origin together with credentials. Set an explicit origin.</p>}
      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto whitespace-pre-wrap font-mono text-sm">{config}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={config} /></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">A browser sends a preflight <code>OPTIONS</code> request for non-simple requests; your server must answer with these headers before the real request runs.</p>
    </div>
  )
}
