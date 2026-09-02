'use client'

import { useState, useMemo } from 'react'

function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = [], field = '', inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++ }
      else if (c === '"') inQuotes = false
      else field += c
    } else {
      if (c === '"') inQuotes = true
      else if (c === ',') { row.push(field); field = '' }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = '' }
      else if (c !== '\r') field += c
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  return rows.filter(r => r.some(c => c !== ''))
}

export default function CsvViewer() {
  const [input, setInput] = useState('')
  const [sortCol, setSortCol] = useState<number | null>(null)
  const [asc, setAsc] = useState(true)

  const rows = useMemo(() => parseCsv(input), [input])
  const header = rows[0] ?? []
  const body = useMemo(() => {
    const b = rows.slice(1)
    if (sortCol === null) return b
    return [...b].sort((x, y) => {
      const a = x[sortCol] ?? '', c = y[sortCol] ?? ''
      const na = parseFloat(a), nc = parseFloat(c)
      const cmp = !isNaN(na) && !isNaN(nc) ? na - nc : a.localeCompare(c)
      return asc ? cmp : -cmp
    })
  }, [rows, sortCol, asc])

  const sort = (i: number) => {
    if (sortCol === i) setAsc(!asc)
    else { setSortCol(i); setAsc(true) }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste CSV (first row = headers)..." className="w-full h-32 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {header.length > 0 && (
        <div className="overflow-auto max-h-96 border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
              <tr>{header.map((h, i) => (
                <th key={i} onClick={() => sort(i)} className="px-3 py-2 text-left font-semibold cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap">
                  {h} {sortCol === i ? (asc ? '▲' : '▼') : ''}
                </th>
              ))}</tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className="border-t border-gray-100 dark:border-gray-800">
                  {header.map((_, ci) => <td key={ci} className="px-3 py-1.5 whitespace-nowrap">{r[ci] ?? ''}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {header.length > 0 && <p className="text-xs text-gray-500 dark:text-gray-400">{body.length} rows · {header.length} columns · click a header to sort</p>}
    </div>
  )
}
