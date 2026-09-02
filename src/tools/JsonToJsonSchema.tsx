'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function schema(v: unknown): Record<string, unknown> {
  if (v === null) return { type: 'null' }
  if (typeof v === 'boolean') return { type: 'boolean' }
  if (typeof v === 'number') return { type: Number.isInteger(v) ? 'integer' : 'number' }
  if (typeof v === 'string') return { type: 'string' }
  if (Array.isArray(v)) return { type: 'array', items: v.length ? schema(v[0]) : {} }
  if (typeof v === 'object') {
    const props: Record<string, unknown> = {}
    const required: string[] = []
    for (const [k, val] of Object.entries(v as object)) { props[k] = schema(val); required.push(k) }
    return { type: 'object', properties: props, required }
  }
  return {}
}

export default function JsonToJsonSchema() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    try {
      const s = schema(JSON.parse(input))
      setOutput(JSON.stringify({ $schema: 'http://json-schema.org/draft-07/schema#', ...s }, null, 2))
    } catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JSON..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate JSON Schema</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Infers a Draft-07 JSON Schema from a sample. All keys are marked required — adjust as needed.</p>
    </div>
  )
}
