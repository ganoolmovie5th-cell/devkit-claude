'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function format(src: string): string {
  let out = '', indent = 0
  const pad = () => '  '.repeat(indent)
  // normalise whitespace, then walk
  const s = src.replace(/\s+/g, ' ').trim()
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === '{') { out += ' {\n'; indent++; out += pad() }
    else if (c === '}') { indent = Math.max(0, indent - 1); out = out.replace(/\s+$/, '') + '\n' + pad() + '}\n' + pad() }
    else if (c === ' ' && (s[i + 1] === '}' || out.endsWith('\n' + pad()))) { /* skip */ }
    else out += c
  }
  return out.split('\n').map(l => l.replace(/\s+$/, '')).filter((l, i, arr) => l.trim() || (i > 0 && arr[i - 1].trim())).join('\n').trim()
}

export default function GraphqlFormatter() {
  const [input, setInput] = useState('')
  const output = input.trim() ? format(input) : ''

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste a GraphQL query or schema..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Indents GraphQL queries, mutations, and schemas by brace nesting.</p>
    </div>
  )
}
