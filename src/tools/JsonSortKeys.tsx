'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function sortKeys(obj: unknown, desc: boolean): unknown {
  if (Array.isArray(obj)) return obj.map(v => sortKeys(v, desc))
  if (obj && typeof obj === 'object') {
    const keys = Object.keys(obj as object).sort((a, b) => desc ? b.localeCompare(a) : a.localeCompare(b))
    const out: Record<string, unknown> = {}
    for (const k of keys) out[k] = sortKeys((obj as Record<string, unknown>)[k], desc)
    return out
  }
  return obj
}

export default function JsonSortKeys() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [desc, setDesc] = useState(false)

  const run = (d: boolean) => {
    setError(''); setDesc(d)
    try { setOutput(JSON.stringify(sortKeys(JSON.parse(input), d), null, 2)) }
    catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JSON..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="flex gap-2">
        <button onClick={() => run(false)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sort A → Z</button>
        <button onClick={() => run(true)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600">Sort Z → A</button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Recursively sorts object keys alphabetically. Array order is preserved.</p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
