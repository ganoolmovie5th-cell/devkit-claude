'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

type Diff = { path: string; type: 'added' | 'removed' | 'changed'; left?: unknown; right?: unknown }

function walk(a: unknown, b: unknown, path: string, out: Diff[]) {
  if (a === b) return
  const aObj = a && typeof a === 'object'
  const bObj = b && typeof b === 'object'
  if (!aObj || !bObj) {
    if (a === undefined) out.push({ path, type: 'added', right: b })
    else if (b === undefined) out.push({ path, type: 'removed', left: a })
    else out.push({ path, type: 'changed', left: a, right: b })
    return
  }
  const keys = new Set([...Object.keys(a as object), ...Object.keys(b as object)])
  for (const k of keys) {
    const av = (a as Record<string, unknown>)[k]
    const bv = (b as Record<string, unknown>)[k]
    const p = path ? `${path}.${k}` : k
    if (!(k in (a as object))) out.push({ path: p, type: 'added', right: bv })
    else if (!(k in (b as object))) out.push({ path: p, type: 'removed', left: av })
    else walk(av, bv, p, out)
  }
}

export default function JsonDiff() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [diffs, setDiffs] = useState<Diff[] | null>(null)
  const [error, setError] = useState('')

  const compare = () => {
    setError('')
    try {
      const a = JSON.parse(left)
      const b = JSON.parse(right)
      const out: Diff[] = []
      walk(a, b, '', out)
      setDiffs(out)
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message)
      setDiffs(null)
    }
  }

  const label = { added: '+ added', removed: '- removed', changed: '~ changed' }
  const color = {
    added: 'text-green-700 dark:text-green-400',
    removed: 'text-red-700 dark:text-red-400',
    changed: 'text-yellow-700 dark:text-yellow-400',
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <textarea value={left} onChange={e => setLeft(e.target.value)} placeholder="First JSON..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea value={right} onChange={e => setRight(e.target.value)} placeholder="Second JSON..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button onClick={compare} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Compare</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {diffs && diffs.length === 0 && <p className="text-sm text-green-600">No differences — the two JSON values are equal.</p>}
      {diffs && diffs.length > 0 && (
        <div className="relative">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 font-mono text-sm space-y-1">
            {diffs.map((d, i) => (
              <div key={i} className={color[d.type]}>
                <span className="font-semibold">{label[d.type]}</span> <span className="text-gray-500 dark:text-gray-400">{d.path}</span>
                {d.type === 'changed' && <span> : {JSON.stringify(d.left)} → {JSON.stringify(d.right)}</span>}
                {d.type === 'added' && <span> : {JSON.stringify(d.right)}</span>}
                {d.type === 'removed' && <span> : {JSON.stringify(d.left)}</span>}
              </div>
            ))}
          </div>
          <div className="absolute top-2 right-2"><CopyButton text={diffs.map(d => `${label[d.type]} ${d.path}`).join('\n')} /></div>
        </div>
      )}
    </div>
  )
}
