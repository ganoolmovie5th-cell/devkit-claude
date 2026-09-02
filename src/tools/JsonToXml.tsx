'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function toXml(obj: unknown, key = 'root', indent = ''): string {
  if (obj === null || obj === undefined) return `${indent}<${key}/>`
  if (Array.isArray(obj)) {
    return obj.map(item => toXml(item, key, indent)).join('\n')
  }
  if (typeof obj === 'object') {
    const inner = Object.entries(obj as Record<string, unknown>)
      .map(([k, v]) => toXml(v, k, indent + '  '))
      .join('\n')
    return `${indent}<${key}>\n${inner}\n${indent}</${key}>`
  }
  const esc = String(obj).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return `${indent}<${key}>${esc}</${key}>`
}

export default function JsonToXml() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    try {
      const data = JSON.parse(input)
      setOutput('<?xml version="1.0" encoding="UTF-8"?>\n' + toXml(data))
    } catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JSON..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert to XML</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
