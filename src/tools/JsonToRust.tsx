'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }
function rustType(v: unknown, name: string, structs: string[]): string {
  if (v === null) return 'Option<serde_json::Value>'
  if (typeof v === 'boolean') return 'bool'
  if (typeof v === 'number') return Number.isInteger(v) ? 'i64' : 'f64'
  if (typeof v === 'string') return 'String'
  if (Array.isArray(v)) return `Vec<${v.length ? rustType(v[0], name, structs) : 'serde_json::Value'}>`
  if (typeof v === 'object') { build(v as Record<string, unknown>, cap(name), structs); return cap(name) }
  return 'serde_json::Value'
}
function build(obj: Record<string, unknown>, name: string, structs: string[]) {
  const fields = Object.entries(obj).map(([k, v]) => {
    const field = k.replace(/[^a-zA-Z0-9]/g, '_')
    return `    pub ${field}: ${rustType(v, k, structs)},`
  }).join('\n')
  structs.push(`#[derive(Serialize, Deserialize)]\npub struct ${name} {\n${fields}\n}`)
}

export default function JsonToRust() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    try {
      const data = JSON.parse(input)
      const structs: string[] = []
      build(Array.isArray(data) ? (data[0] ?? {}) : data, 'Root', structs)
      setOutput('use serde::{Serialize, Deserialize};\n\n' + structs.reverse().join('\n\n'))
    } catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JSON..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert to Rust struct</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Generates serde-annotated Rust structs. Add the <code>serde</code> crate to your project.</p>
    </div>
  )
}
