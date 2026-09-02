'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const CHARSETS: Record<string, string> = {
  hex: '0123456789abcdef',
  alnum: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  alpha: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  numeric: '0123456789',
  base64url: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
}

function gen(charset: string, len: number): string {
  const chars = CHARSETS[charset]
  const bytes = crypto.getRandomValues(new Uint8Array(len))
  let out = ''
  for (let i = 0; i < len; i++) out += chars[bytes[i] % chars.length]
  return out
}

export default function RandomToken() {
  const [charset, setCharset] = useState('hex')
  const [len, setLen] = useState(32)
  const [count, setCount] = useState(1)
  const [tokens, setTokens] = useState<string[]>([])

  const generate = () => setTokens(Array.from({ length: count }, () => gen(charset, len)))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end text-sm text-gray-700 dark:text-gray-300">
        <label className="flex flex-col gap-1">Charset
          <select value={charset} onChange={e => setCharset(e.target.value)} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded">
            <option value="hex">Hex</option>
            <option value="alnum">Alphanumeric</option>
            <option value="alpha">Letters</option>
            <option value="numeric">Numbers</option>
            <option value="base64url">Base64URL</option>
          </select>
        </label>
        <label className="flex flex-col gap-1">Length<input type="number" min={1} max={512} value={len} onChange={e => setLen(Number(e.target.value))} className="w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
        <label className="flex flex-col gap-1">Count<input type="number" min={1} max={100} value={count} onChange={e => setCount(Number(e.target.value))} className="w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
        <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate</button>
      </div>
      {tokens.length > 0 && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 font-mono text-sm break-all whitespace-pre-wrap">{tokens.join('\n')}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={tokens.join('\n')} /></div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Uses crypto.getRandomValues — cryptographically secure randomness, generated locally.</p>
    </div>
  )
}
