'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

function encode(input: string): string {
  const bytes = new TextEncoder().encode(input)
  let bits = 0, value = 0, out = ''
  for (const b of bytes) {
    value = (value << 8) | b
    bits += 8
    while (bits >= 5) { out += ALPHABET[(value >>> (bits - 5)) & 31]; bits -= 5 }
  }
  if (bits > 0) out += ALPHABET[(value << (5 - bits)) & 31]
  while (out.length % 8) out += '='
  return out
}

function decode(input: string): string {
  input = input.replace(/=+$/, '').toUpperCase().replace(/\s/g, '')
  let bits = 0, value = 0
  const bytes: number[] = []
  for (const c of input) {
    const idx = ALPHABET.indexOf(c)
    if (idx < 0) throw new Error('Invalid Base32 character: ' + c)
    value = (value << 5) | idx
    bits += 5
    if (bits >= 8) { bytes.push((value >>> (bits - 8)) & 0xff); bits -= 8 }
  }
  return new TextDecoder().decode(new Uint8Array(bytes))
}

export default function Base32() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const run = (fn: (s: string) => string) => {
    setError('')
    try { setOutput(fn(input)) } catch (e) { setError((e as Error).message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text or Base32..." className="w-full h-28 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="flex gap-2">
        <button onClick={() => run(encode)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Encode</button>
        <button onClick={() => run(decode)} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600">Decode</button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm break-all">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">RFC 4648 Base32 (A–Z, 2–7). Common for TOTP secrets and case-insensitive encoding.</p>
    </div>
  )
}
