'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function WhitespaceCleaner() {
  const [input, setInput] = useState('')
  const [trimLines, setTrimLines] = useState(true)
  const [collapseSpaces, setCollapseSpaces] = useState(false)
  const [collapseBlank, setCollapseBlank] = useState(true)
  const [tabsToSpaces, setTabsToSpaces] = useState(false)
  const [tabWidth, setTabWidth] = useState(2)

  const process = (): string => {
    let text = input
    if (tabsToSpaces) text = text.replace(/\t/g, ' '.repeat(tabWidth))
    let lines = text.split('\n')
    if (trimLines) lines = lines.map(l => l.replace(/\s+$/, ''))
    if (collapseSpaces) lines = lines.map(l => l.replace(/ {2,}/g, ' '))
    text = lines.join('\n')
    if (collapseBlank) text = text.replace(/\n{3,}/g, '\n\n')
    return text
  }

  const output = process()

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste text..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={trimLines} onChange={e => setTrimLines(e.target.checked)} /> Trim trailing space</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={collapseSpaces} onChange={e => setCollapseSpaces(e.target.checked)} /> Collapse spaces</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={collapseBlank} onChange={e => setCollapseBlank(e.target.checked)} /> Collapse blank lines</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={tabsToSpaces} onChange={e => setTabsToSpaces(e.target.checked)} /> Tabs → spaces
          <input type="number" min={1} max={8} value={tabWidth} onChange={e => setTabWidth(Number(e.target.value))} className="w-12 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded px-1" />
        </label>
      </div>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
