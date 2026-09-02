'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1) }
function pyType(v: unknown, name: string, classes: string[]): string {
  if (v === null) return 'Optional[Any]'
  if (typeof v === 'boolean') return 'bool'
  if (typeof v === 'number') return Number.isInteger(v) ? 'int' : 'float'
  if (typeof v === 'string') return 'str'
  if (Array.isArray(v)) return `List[${v.length ? pyType(v[0], name, classes) : 'Any'}]`
  if (typeof v === 'object') { build(v as Record<string, unknown>, cap(name), classes); return cap(name) }
  return 'Any'
}
function build(obj: Record<string, unknown>, name: string, classes: string[]) {
  const fields = Object.entries(obj).map(([k, v]) => `    ${k}: ${pyType(v, k, classes)}`).join('\n')
  classes.push(`@dataclass\nclass ${name}:\n${fields || '    pass'}`)
}

export default function JsonToPython() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    try {
      const data = JSON.parse(input)
      const classes: string[] = []
      build(Array.isArray(data) ? (data[0] ?? {}) : data, 'Root', classes)
      const header = 'from dataclasses import dataclass\nfrom typing import List, Optional, Any\n\n'
      setOutput(header + classes.reverse().join('\n\n'))
    } catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JSON..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert to Python dataclass</button>
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
