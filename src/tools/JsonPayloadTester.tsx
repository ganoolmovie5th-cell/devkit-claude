'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function JsonPayloadTester() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ ok: boolean; msg: string; formatted?: string; stats?: string } | null>(null)

  const validate = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      const keys = countKeys(parsed)
      const depth = maxDepth(parsed)
      setResult({
        ok: true,
        msg: 'Valid JSON',
        formatted,
        stats: `${new Blob([input]).size} bytes · ${keys} keys · depth ${depth}`,
      })
    } catch (e) {
      setResult({ ok: false, msg: (e as Error).message })
    }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste a JSON payload to validate..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={validate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Validate</button>
      {result && (
        <>
          <div className={`p-3 rounded-lg text-sm ${result.ok ? 'bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400'}`}>
            {result.msg}{result.stats ? ` · ${result.stats}` : ''}
          </div>
          {result.formatted && (
            <div className="relative">
              <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{result.formatted}</pre>
              <div className="absolute top-2 right-2"><CopyButton text={result.formatted} /></div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function countKeys(o: unknown): number {
  if (Array.isArray(o)) return o.reduce((s: number, v) => s + countKeys(v), 0)
  if (o && typeof o === 'object') return Object.keys(o).length + Object.values(o).reduce((s: number, v) => s + countKeys(v), 0)
  return 0
}
function maxDepth(o: unknown, d = 1): number {
  if (o && typeof o === 'object') {
    const vals = Object.values(o)
    return vals.length ? Math.max(...vals.map(v => maxDepth(v, d + 1))) : d
  }
  return d
}
