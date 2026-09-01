'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function DedupeLines() {
  const [input, setInput] = useState('')
  const [trim, setTrim] = useState(true)
  const [ci, setCi] = useState(false)
  const [sort, setSort] = useState<'none' | 'asc' | 'desc'>('none')
  const [keepEmpty, setKeepEmpty] = useState(false)

  const process = (): string => {
    let lines = input.split('\n')
    if (trim) lines = lines.map(l => l.trim())
    if (!keepEmpty) lines = lines.filter(l => l !== '')
    const seen = new Set<string>()
    const out: string[] = []
    for (const l of lines) {
      const key = ci ? l.toLowerCase() : l
      if (seen.has(key)) continue
      seen.add(key)
      out.push(l)
    }
    if (sort === 'asc') out.sort((a, b) => a.localeCompare(b))
    if (sort === 'desc') out.sort((a, b) => b.localeCompare(a))
    return out.join('\n')
  }

  const output = process()
  const inCount = input.split('\n').filter(l => l !== '').length
  const outCount = output === '' ? 0 : output.split('\n').length

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste lines here..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={trim} onChange={e => setTrim(e.target.checked)} /> Trim whitespace</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={ci} onChange={e => setCi(e.target.checked)} /> Case-insensitive</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={keepEmpty} onChange={e => setKeepEmpty(e.target.checked)} /> Keep empty lines</label>
        <label className="flex items-center gap-1.5">Sort:
          <select value={sort} onChange={e => setSort(e.target.value as 'none' | 'asc' | 'desc')} className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded px-1 py-0.5">
            <option value="none">Original</option>
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
        </label>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{inCount} lines in → {outCount} unique lines out ({inCount - outCount} removed)</p>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
