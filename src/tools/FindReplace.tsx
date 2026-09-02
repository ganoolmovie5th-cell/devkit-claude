'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function FindReplace() {
  const [input, setInput] = useState('')
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [useRegex, setUseRegex] = useState(false)
  const [ci, setCi] = useState(false)

  let output = input
  let count = 0
  if (find) {
    try {
      const flags = 'g' + (ci ? 'i' : '')
      const re = useRegex ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags)
      count = (input.match(re) || []).length
      output = input.replace(re, replace)
    } catch { /* invalid regex — show original */ }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input type="text" value={find} onChange={e => setFind(e.target.value)} placeholder="Find" className="px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
        <input type="text" value={replace} onChange={e => setReplace(e.target.value)} placeholder="Replace with" className="px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={useRegex} onChange={e => setUseRegex(e.target.checked)} /> Regex</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={ci} onChange={e => setCi(e.target.checked)} /> Case-insensitive</label>
        {find && <span className="text-gray-500 dark:text-gray-400">{count} match{count !== 1 ? 'es' : ''}</span>}
      </div>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
