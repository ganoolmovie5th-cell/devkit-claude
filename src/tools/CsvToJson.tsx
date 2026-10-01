'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

// RFC 4180-style parser: handles quoted fields with commas, newlines, and
// escaped quotes (""), plus CRLF line endings.
function parseCsv(csv: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i]
    if (inQuotes) {
      if (c === '"') {
        if (csv[i + 1] === '"') { field += '"'; i++ }
        else inQuotes = false
      } else field += c
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      row.push(field); field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && csv[i + 1] === '\n') i++
      row.push(field); field = ''
      rows.push(row); row = []
    } else field += c
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row) }
  // Drop trailing empty row from a final newline.
  return rows.filter(r => !(r.length === 1 && r[0] === ''))
}

function csvToJson(csv: string): string {
  const rows = parseCsv(csv.trim())
  if (rows.length < 2) throw new Error('Need at least a header row and one data row')
  const headers = rows[0]
  const result = rows.slice(1).map(values => {
    const obj: Record<string, string> = {}
    headers.forEach((h, i) => { obj[h] = values[i] ?? '' })
    return obj
  })
  return JSON.stringify(result, null, 2)
}

export default function CsvToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    try { setOutput(csvToJson(input)); setError('') }
    catch (e: any) { setError(e.message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="name,age,city&#10;Alice,30,NYC&#10;Bob,25,London"
        className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert to JSON</button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
