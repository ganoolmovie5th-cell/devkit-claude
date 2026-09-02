'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function LineSortNumber() {
  const [input, setInput] = useState('')
  const [op, setOp] = useState<'sort-asc' | 'sort-desc' | 'sort-natural' | 'number' | 'reverse' | 'shuffle'>('sort-asc')

  const process = (): string => {
    let lines = input.split('\n')
    switch (op) {
      case 'sort-asc': lines = [...lines].sort((a, b) => a.localeCompare(b)); break
      case 'sort-desc': lines = [...lines].sort((a, b) => b.localeCompare(a)); break
      case 'sort-natural': lines = [...lines].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })); break
      case 'reverse': lines = [...lines].reverse(); break
      case 'shuffle': lines = [...lines].sort(() => Math.random() - 0.5); break
      case 'number': {
        const width = String(lines.length).length
        lines = lines.map((l, i) => `${String(i + 1).padStart(width, ' ')}. ${l}`)
        break
      }
    }
    return lines.join('\n')
  }

  const output = process()

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste lines..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <select value={op} onChange={e => setOp(e.target.value as typeof op)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg text-sm">
        <option value="sort-asc">Sort A → Z</option>
        <option value="sort-desc">Sort Z → A</option>
        <option value="sort-natural">Sort natural (numeric-aware)</option>
        <option value="number">Number lines</option>
        <option value="reverse">Reverse order</option>
        <option value="shuffle">Shuffle</option>
      </select>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
