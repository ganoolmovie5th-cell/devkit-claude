'use client'

import { useState, useEffect, useRef } from 'react'
import CopyButton from '@/components/CopyButton'
import ShareButton from '@/components/ShareButton'
import { useShareParam } from '@/lib/useShareParam'

const KEYWORDS = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'ON', 'ORDER BY', 'GROUP BY', 'HAVING', 'LIMIT', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'UNION', 'AS']

function formatSql(sql: string): string {
  let formatted = sql.replace(/\s+/g, ' ').trim()
  KEYWORDS.forEach(kw => {
    formatted = formatted.replace(new RegExp(`\\b${kw}\\b`, 'gi'), `\n${kw}`)
  })
  return formatted.trim()
}

export default function SqlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const shared = useShareParam()
  const inputRef = useRef(input)
  inputRef.current = input
  useEffect(() => { if (shared) setInput(shared) }, [shared])

  const format = () => setOutput(formatSql(input))

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste SQL query here..."
        className="w-full h-48 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button onClick={format} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Format SQL</button>
        <ShareButton getInput={() => inputRef.current} />
      </div>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
