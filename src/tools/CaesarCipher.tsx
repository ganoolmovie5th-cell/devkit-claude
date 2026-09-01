'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function shift(text: string, n: number): string {
  const s = ((n % 26) + 26) % 26
  return text.replace(/[a-z]/gi, (c) => {
    const base = c <= 'Z' ? 65 : 97
    return String.fromCharCode(((c.charCodeAt(0) - base + s) % 26) + base)
  })
}

export default function CaesarCipher() {
  const [input, setInput] = useState('')
  const [n, setN] = useState(13)

  const output = shift(input, n)
  const rot13 = shift(input, 13)

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text..." className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
        Shift by
        <input type="range" min={0} max={25} value={n} onChange={e => setN(Number(e.target.value))} className="flex-1" />
        <span className="font-mono w-8 text-right">{n}</span>
      </label>
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Shift {n}</p>
          <div className="relative">
            <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-40 whitespace-pre-wrap font-mono text-sm">{output || '—'}</pre>
            {output && <div className="absolute top-2 right-2"><CopyButton text={output} /></div>}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">ROT13 (shift 13, self-inverse)</p>
          <div className="relative">
            <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-40 whitespace-pre-wrap font-mono text-sm">{rot13 || '—'}</pre>
            {rot13 && <div className="absolute top-2 right-2"><CopyButton text={rot13} /></div>}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">To decode, apply the opposite shift (26 − n). ROT13 decodes itself.</p>
    </div>
  )
}
