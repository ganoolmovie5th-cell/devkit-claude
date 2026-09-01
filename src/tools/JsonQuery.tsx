'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

// Minimal JSONPath-style query: dot/bracket paths with [*] wildcard and [n] index.
// e.g. store.book[*].title  or  users[0].name
function query(data: unknown, path: string): unknown[] {
  const tokens = path
    .replace(/\[(\*|\d+)\]/g, '.$1')
    .split('.')
    .filter(Boolean)
  let current: unknown[] = [data]
  for (const tok of tokens) {
    const next: unknown[] = []
    for (const node of current) {
      if (node == null) continue
      if (tok === '*') {
        if (Array.isArray(node)) next.push(...node)
        else if (typeof node === 'object') next.push(...Object.values(node as object))
      } else if (/^\d+$/.test(tok)) {
        if (Array.isArray(node)) next.push(node[Number(tok)])
      } else if (typeof node === 'object') {
        next.push((node as Record<string, unknown>)[tok])
      }
    }
    current = next.filter(v => v !== undefined)
  }
  return current
}

export default function JsonQuery() {
  const [json, setJson] = useState('')
  const [path, setPath] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  const run = () => {
    setError('')
    try {
      const data = JSON.parse(json)
      const out = query(data, path.trim())
      setResult(JSON.stringify(out, null, 2))
    } catch (e) {
      setError((e as Error).message)
      setResult('')
    }
  }

  return (
    <div className="space-y-4">
      <textarea value={json} onChange={e => setJson(e.target.value)} placeholder="Paste JSON..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="flex gap-2">
        <input type="text" value={path} onChange={e => setPath(e.target.value)} placeholder="Query e.g. users[*].name" className="flex-1 px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button onClick={run} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Query</button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Supports dot paths, <code>[n]</code> index, and <code>[*]</code> wildcard. Example: <code>store.book[*].title</code></p>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{result}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={result} /></div>
        </div>
      )}
    </div>
  )
}
