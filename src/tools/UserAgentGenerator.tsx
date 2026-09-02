'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const UA: Record<string, string[]> = {
  'Chrome (Windows)': ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'],
  'Chrome (macOS)': ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'],
  'Safari (macOS)': ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15'],
  'Safari (iPhone)': ['Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'],
  'Firefox (Windows)': ['Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0'],
  'Chrome (Android)': ['Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36'],
  'Edge (Windows)': ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'],
  'Googlebot': ['Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'],
  'curl': ['curl/8.7.1'],
}

export default function UserAgentGenerator() {
  const [selected, setSelected] = useState(Object.keys(UA)[0])
  const ua = UA[selected][0]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Object.keys(UA).map(k => (
          <button key={k} onClick={() => setSelected(k)} className={`px-3 py-2 text-sm rounded-lg border text-left ${selected === k ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>{k}</button>
        ))}
      </div>
      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto whitespace-pre-wrap font-mono text-sm break-all">{ua}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={ua} /></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Recent representative User-Agent strings for testing. Real UA strings change with each browser release.</p>
    </div>
  )
}
