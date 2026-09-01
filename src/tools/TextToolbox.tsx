'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function TextToolbox() {
  const [input, setInput] = useState('')
  const [repeat, setRepeat] = useState(3)
  const [find, setFind] = useState('')

  const reversed = [...input].reverse().join('')
  const reversedWords = input.split(/\s+/).reverse().join(' ')
  const reversedLines = input.split('\n').reverse().join('\n')
  const repeated = Array(Math.max(0, repeat)).fill(input).join('\n')
  const occurrences = find ? input.split(find).length - 1 : 0

  const Block = ({ title, text }: { title: string; text: string }) => (
    <div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-40 whitespace-pre-wrap font-mono text-sm">{text || '—'}</pre>
        {text && <div className="absolute top-2 right-2"><CopyButton text={text} /></div>}
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
        <label className="flex items-center gap-1.5">Repeat
          <input type="number" min={1} max={1000} value={repeat} onChange={e => setRepeat(parseInt(e.target.value) || 0)} className="w-16 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded px-1 py-0.5" />× times
        </label>
        <label className="flex items-center gap-1.5">Count occurrences of
          <input type="text" value={find} onChange={e => setFind(e.target.value)} placeholder="substring" className="w-32 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded px-2 py-0.5" />
          {find && <span className="font-semibold">{occurrences}×</span>}
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Block title="Reversed characters" text={reversed} />
        <Block title="Reversed word order" text={reversedWords} />
        <Block title="Reversed line order" text={reversedLines} />
        <Block title={`Repeated ${repeat}×`} text={repeated} />
      </div>
    </div>
  )
}
