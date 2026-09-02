'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const FIRST = ['Alex', 'Jordan', 'Sam', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Jamie']
const LAST = ['Smith', 'Lee', 'Patel', 'Garcia', 'Chen', 'Kim', 'Nguyen', 'Brown']
const rand = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]
const uuid = () => crypto.randomUUID()

function mockValue(key: string): unknown {
  const k = key.toLowerCase()
  if (k === 'id' || k.endsWith('id')) return uuid()
  if (k.includes('email')) return `${rand(FIRST).toLowerCase()}@example.com`
  if (k.includes('name')) return `${rand(FIRST)} ${rand(LAST)}`
  if (k.includes('age')) return 18 + Math.floor(Math.random() * 50)
  if (k.includes('price') || k.includes('amount')) return Math.floor(Math.random() * 10000) / 100
  if (k.includes('active') || k.includes('enabled') || k.startsWith('is')) return Math.random() > 0.5
  if (k.includes('date') || k.includes('created') || k.includes('updated')) return new Date().toISOString()
  if (k.includes('url') || k.includes('link')) return 'https://example.com/' + Math.random().toString(36).slice(2, 8)
  if (k.includes('phone')) return '+1' + Math.floor(1000000000 + Math.random() * 9000000000)
  return 'sample_' + Math.random().toString(36).slice(2, 8)
}

export default function ApiMockGenerator() {
  const [fields, setFields] = useState('id, name, email, age, active, createdAt')
  const [count, setCount] = useState(3)
  const [output, setOutput] = useState('')

  const generate = () => {
    const keys = fields.split(',').map(f => f.trim()).filter(Boolean)
    const arr = Array.from({ length: count }, () => {
      const obj: Record<string, unknown> = {}
      for (const k of keys) obj[k] = mockValue(k)
      return obj
    })
    setOutput(JSON.stringify(count === 1 ? arr[0] : arr, null, 2))
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm text-gray-700 dark:text-gray-300">Fields (comma-separated)
        <input type="text" value={fields} onChange={e => setFields(e.target.value)} className="mt-1 w-full px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
      </label>
      <div className="flex gap-2 items-center">
        <label className="text-sm text-gray-700 dark:text-gray-300">Count
          <input type="number" min={1} max={100} value={count} onChange={e => setCount(Number(e.target.value))} className="ml-2 w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" />
        </label>
        <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate</button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Field names are matched to types: id → UUID, email, name, age, price, date, url, phone, is* → boolean.</p>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
