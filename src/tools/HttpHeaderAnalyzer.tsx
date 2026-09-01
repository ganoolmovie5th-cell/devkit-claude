'use client'

import { useState } from 'react'

const NOTES: Record<string, string> = {
  'strict-transport-security': 'Forces HTTPS for the given max-age. Good for security.',
  'content-security-policy': 'Restricts which resources can load. Strong XSS defense.',
  'x-frame-options': 'Controls whether the page can be framed (clickjacking protection).',
  'x-content-type-options': 'nosniff stops MIME-type sniffing.',
  'referrer-policy': 'Controls how much referrer info is sent on navigation.',
  'permissions-policy': 'Enables/disables browser features (camera, geolocation, etc).',
  'access-control-allow-origin': 'CORS: which origins may read the response.',
  'cache-control': 'Caching rules for browsers and CDNs.',
  'set-cookie': 'Sets a cookie. Check for Secure, HttpOnly, SameSite flags.',
  'content-type': 'Media type of the body. Include charset for text.',
  server: 'Server software — consider hiding the version.',
  'x-powered-by': 'Reveals backend tech — usually best removed.',
}

const SECURITY = ['strict-transport-security', 'content-security-policy', 'x-frame-options', 'x-content-type-options', 'referrer-policy']

export default function HttpHeaderAnalyzer() {
  const [input, setInput] = useState('')

  const headers = input
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(l => {
      const i = l.indexOf(':')
      if (i < 0) return null
      return { name: l.slice(0, i).trim(), value: l.slice(i + 1).trim() }
    })
    .filter((h): h is { name: string; value: string } => !!h && !!h.name)

  const present = new Set(headers.map(h => h.name.toLowerCase()))
  const missing = SECURITY.filter(s => !present.has(s))

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={'Paste raw HTTP response headers, e.g.\nContent-Type: text/html\nCache-Control: no-cache'} className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {headers.length > 0 && (
        <div className="space-y-2">
          {headers.map((h, i) => {
            const note = NOTES[h.name.toLowerCase()]
            return (
              <div key={i} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="font-mono text-sm"><span className="font-semibold text-blue-600 dark:text-blue-400">{h.name}</span>: {h.value}</p>
                {note && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{note}</p>}
              </div>
            )
          })}
        </div>
      )}
      {headers.length > 0 && missing.length > 0 && (
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Missing common security headers:</p>
          <ul className="mt-1 text-xs text-yellow-700 dark:text-yellow-400 list-disc list-inside">
            {missing.map(m => <li key={m}>{m}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}
