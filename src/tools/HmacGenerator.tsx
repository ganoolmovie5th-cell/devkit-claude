'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const enc = new TextEncoder()
const ALGOS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function HmacGenerator() {
  const [message, setMessage] = useState('')
  const [secret, setSecret] = useState('')
  const [algo, setAlgo] = useState<typeof ALGOS[number]>('SHA-256')
  const [out, setOut] = useState('')
  const [err, setErr] = useState('')

  const generate = async () => {
    setErr('')
    try {
      const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: algo }, false, ['sign'])
      const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message))
      setOut(toHex(sig))
    } catch (e) { setErr((e as Error).message); setOut('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message..." className="w-full h-28 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="flex gap-2">
        <input type="text" value={secret} onChange={e => setSecret(e.target.value)} placeholder="Secret key" autoComplete="off" className="flex-1 px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <select value={algo} onChange={e => setAlgo(e.target.value as typeof ALGOS[number])} className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg">
          {ALGOS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <button onClick={generate} disabled={!message || !secret} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">Generate</button>
      </div>
      {err && <p className="text-sm text-red-600">{err}</p>}
      {out && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto whitespace-pre-wrap font-mono text-sm break-all">{out}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={out} /></div>
        </div>
      )}
    </div>
  )
}
