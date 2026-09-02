'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function QueryStringJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const toJson = () => {
    setError('')
    try {
      const qs = input.trim().replace(/^\?/, '')
      const params = new URLSearchParams(qs)
      const obj: Record<string, string | string[]> = {}
      for (const [k, v] of params) {
        if (k in obj) {
          const ex = obj[k]
          obj[k] = Array.isArray(ex) ? [...ex, v] : [ex as string, v]
        } else obj[k] = v
      }
      setOutput(JSON.stringify(obj, null, 2))
    } catch (e) { setError((e as Error).message); setOutput('') }
  }

  const toQuery = () => {
    setError('')
    try {
      const obj = JSON.parse(input)
      const params = new URLSearchParams()
      for (const [k, v] of Object.entries(obj)) {
        if (Array.isArray(v)) v.forEach(item => params.append(k, String(item)))
        else params.append(k, String(v))
      }
      setOutput(params.toString())
    } catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste a query string (a=1&b=2) or JSON object..." className="w-full h-28 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="flex gap-2">
        <button onClick={toJson} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Query → JSON</button>
        <button onClick={toQuery} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600">JSON → Query</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm break-all">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
