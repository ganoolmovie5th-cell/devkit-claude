'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

// Formats Postgres/MySQL EXPLAIN text output into an indented tree and
// highlights costly operations (Seq Scan, Nested Loop, etc).
function format(text: string): { line: string; warn: boolean; indent: number }[] {
  return text.split('\n').filter(l => l.trim()).map(raw => {
    const leading = raw.match(/^(\s*(->)?\s*)/)?.[0] ?? ''
    const indent = Math.floor(leading.replace(/->/, '  ').length / 2)
    const line = raw.trim()
    const warn = /seq scan|nested loop|full table scan|using filesort|using temporary/i.test(line)
    return { line, warn, indent }
  })
}

export default function SqlExplainFormatter() {
  const [input, setInput] = useState('')
  const rows = input.trim() ? format(input) : []

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste EXPLAIN / EXPLAIN ANALYZE output..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {rows.length > 0 && (
        <div className="relative">
          <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 font-mono text-sm space-y-0.5">
            {rows.map((r, i) => (
              <div key={i} className={r.warn ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-700 dark:text-gray-300'} style={{ paddingLeft: r.indent * 16 }}>
                {r.warn && '⚠ '}{r.line}
              </div>
            ))}
          </div>
          <div className="absolute top-2 right-2"><CopyButton text={input} /></div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Indents the plan tree and flags potentially expensive operations (sequential scans, nested loops, filesort, temporary tables).</p>
    </div>
  )
}
