'use client'

import { useState } from 'react'

export default function Diff3Way() {
  const [base, setBase] = useState('')
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  const bl = base.split('\n'), al = a.split('\n'), bbl = b.split('\n')
  const max = Math.max(bl.length, al.length, bbl.length)
  const rows = Array.from({ length: max }, (_, i) => {
    const base_ = bl[i] ?? '', a_ = al[i] ?? '', b_ = bbl[i] ?? ''
    let status = 'same'
    if (a_ !== base_ && b_ !== base_ && a_ !== b_) status = 'conflict'
    else if (a_ !== base_ && b_ === base_) status = 'a'
    else if (b_ !== base_ && a_ === base_) status = 'b'
    else if (a_ !== base_ && b_ !== base_ && a_ === b_) status = 'both'
    return { i: i + 1, base_, a_, b_, status }
  })

  const color: Record<string, string> = {
    same: '', a: 'bg-blue-50 dark:bg-blue-900/10', b: 'bg-green-50 dark:bg-green-900/10',
    both: 'bg-purple-50 dark:bg-purple-900/10', conflict: 'bg-red-50 dark:bg-red-900/10',
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <textarea value={base} onChange={e => setBase(e.target.value)} placeholder="Base (original)..." className="h-32 p-3 font-mono text-xs border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea value={a} onChange={e => setA(e.target.value)} placeholder="Version A..." className="h-32 p-3 font-mono text-xs border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea value={b} onChange={e => setB(e.target.value)} placeholder="Version B..." className="h-32 p-3 font-mono text-xs border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      {(base || a || b) && (
        <div className="overflow-auto max-h-96 border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="w-full text-xs font-mono">
            <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 text-left">
              <tr><th className="px-2 py-1.5">#</th><th className="px-2 py-1.5">Base</th><th className="px-2 py-1.5">A</th><th className="px-2 py-1.5">B</th></tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.i} className={`border-t border-gray-100 dark:border-gray-800 ${color[r.status]}`}>
                  <td className="px-2 py-1 text-gray-400">{r.i}</td>
                  <td className="px-2 py-1 whitespace-pre-wrap">{r.base_}</td>
                  <td className="px-2 py-1 whitespace-pre-wrap">{r.a_}</td>
                  <td className="px-2 py-1 whitespace-pre-wrap">{r.b_}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Compares two versions against a common base, line by line. <span className="text-blue-600">A changed</span>, <span className="text-green-600">B changed</span>, <span className="text-purple-600">both same change</span>, <span className="text-red-600">conflict</span>.</p>
    </div>
  )
}
