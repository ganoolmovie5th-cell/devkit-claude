'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }
function goType(v: unknown, name: string, structs: string[]): string {
  if (v === null) return 'interface{}'
  if (typeof v === 'boolean') return 'bool'
  if (typeof v === 'number') return Number.isInteger(v) ? 'int' : 'float64'
  if (typeof v === 'string') return 'string'
  if (Array.isArray(v)) return '[]' + (v.length ? goType(v[0], name, structs) : 'interface{}')
  if (typeof v === 'object') { buildStruct(v as Record<string, unknown>, cap(name), structs); return cap(name) }
  return 'interface{}'
}
function buildStruct(obj: Record<string, unknown>, name: string, structs: string[]) {
  const fields = Object.entries(obj).map(([k, v]) => {
    const field = cap(k.replace(/[^a-zA-Z0-9]/g, ' ').split(' ').map(cap).join(''))
    return `\t${field} ${goType(v, k, structs)} \`json:"${k}"\``
  }).join('\n')
  structs.push(`type ${name} struct {\n${fields}\n}`)
}

export default function JsonToGo() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    try {
      const data = JSON.parse(input)
      const structs: string[] = []
      buildStruct(Array.isArray(data) ? (data[0] ?? {}) : data, 'Root', structs)
      setOutput(structs.reverse().join('\n\n'))
    } catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JSON..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert to Go struct</button>
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
