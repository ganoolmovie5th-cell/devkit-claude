'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function nodeToObj(node: Element): unknown {
  const children = Array.from(node.children)
  if (children.length === 0) return node.textContent
  const obj: Record<string, unknown> = {}
  for (const child of children) {
    const val = nodeToObj(child)
    if (child.tagName in obj) {
      const existing = obj[child.tagName]
      if (Array.isArray(existing)) existing.push(val)
      else obj[child.tagName] = [existing, val]
    } else {
      obj[child.tagName] = val
    }
  }
  return obj
}

export default function XmlToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    try {
      const doc = new DOMParser().parseFromString(input, 'application/xml')
      const err = doc.querySelector('parsererror')
      if (err) throw new Error('Invalid XML')
      const root = doc.documentElement
      setOutput(JSON.stringify({ [root.tagName]: nodeToObj(root) }, null, 2))
    } catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste XML..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert to JSON</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Attributes are ignored; element text and nesting are preserved.</p>
    </div>
  )
}
