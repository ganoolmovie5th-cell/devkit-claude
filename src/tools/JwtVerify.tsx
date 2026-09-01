'use client'

import { useState } from 'react'

const enc = new TextEncoder()

function b64urlToBytes(s: string): Uint8Array {
  s = s.replace(/-/g, '+').replace(/_/g, '/')
  while (s.length % 4) s += '='
  return Uint8Array.from(atob(s), c => c.charCodeAt(0))
}
function b64urlToBuf(s: string): ArrayBuffer {
  return b64urlToBytes(s).buffer as ArrayBuffer
}

const HASH: Record<string, string> = { HS256: 'SHA-256', HS384: 'SHA-384', HS512: 'SHA-512' }

export default function JwtVerify() {
  const [token, setToken] = useState('')
  const [secret, setSecret] = useState('')
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const verify = async () => {
    setStatus('idle'); setMsg('')
    try {
      const [h, p, sig] = token.trim().split('.')
      if (!h || !p || !sig) throw new Error('Not a valid JWT (need header.payload.signature)')
      const header = JSON.parse(new TextDecoder().decode(b64urlToBytes(h)))
      const alg = header.alg as string
      if (!HASH[alg]) throw new Error(`Only HS256/384/512 supported here. Token uses ${alg}.`)
      const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: HASH[alg] }, false, ['verify'])
      const ok = await crypto.subtle.verify('HMAC', key, b64urlToBuf(sig), enc.encode(`${h}.${p}`))
      setStatus(ok ? 'valid' : 'invalid')
      setMsg(ok ? 'Signature is valid — the secret matches.' : 'Signature does NOT match the secret.')
    } catch (e) {
      setStatus('error'); setMsg((e as Error).message)
    }
  }

  const color = status === 'valid' ? 'text-green-700 dark:text-green-400' : status === 'invalid' || status === 'error' ? 'text-red-700 dark:text-red-400' : ''

  return (
    <div className="space-y-4">
      <textarea value={token} onChange={e => setToken(e.target.value)} placeholder="Paste JWT (header.payload.signature)..." className="w-full h-28 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="flex gap-2">
        <input type="text" value={secret} onChange={e => setSecret(e.target.value)} placeholder="HMAC secret" autoComplete="off" className="flex-1 px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button onClick={verify} disabled={!token || !secret} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">Verify</button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Verifies HS256/HS384/HS512 signatures locally via Web Crypto. RS/ES algorithms are not supported here.</p>
      {msg && <p className={`text-sm font-medium ${color}`}>{msg}</p>}
    </div>
  )
}
