'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

// AES-GCM via Web Crypto. Key derived from passphrase with PBKDF2.
const enc = new TextEncoder()
const dec = new TextDecoder()

function toB64(buf: ArrayBufferLike): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
}
function fromB64(s: string): ArrayBuffer {
  return Uint8Array.from(atob(s), c => c.charCodeAt(0)).buffer
}

async function deriveKey(pass: string, salt: BufferSource): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

export default function AesEncrypt() {
  const [text, setText] = useState('')
  const [pass, setPass] = useState('')
  const [out, setOut] = useState('')
  const [err, setErr] = useState('')

  const encrypt = async () => {
    setErr('')
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16))
      const iv = crypto.getRandomValues(new Uint8Array(12))
      const key = await deriveKey(pass, salt)
      const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv as BufferSource }, key, enc.encode(text))
      // package: salt.iv.ciphertext (base64)
      setOut(`${toB64(salt.buffer)}.${toB64(iv.buffer)}.${toB64(ct)}`)
    } catch (e) { setErr((e as Error).message); setOut('') }
  }

  const decrypt = async () => {
    setErr('')
    try {
      const [s, i, c] = text.split('.')
      const salt = fromB64(s)
      const iv = fromB64(i)
      const key = await deriveKey(pass, salt)
      const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv as BufferSource }, key, fromB64(c) as BufferSource)
      setOut(dec.decode(pt))
    } catch {
      setErr('Decryption failed — wrong passphrase or corrupted input.'); setOut('')
    }
  }

  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Text to encrypt, or salt.iv.ciphertext to decrypt..." className="w-full h-28 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Passphrase" autoComplete="off" className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="flex gap-2">
        <button onClick={encrypt} disabled={!text || !pass} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">Encrypt</button>
        <button onClick={decrypt} disabled={!text || !pass} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">Decrypt</button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">AES-256-GCM, key derived with PBKDF2 (100k iterations). Runs entirely in your browser.</p>
      {err && <p className="text-sm text-red-600">{err}</p>}
      {out && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm break-all">{out}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={out} /></div>
        </div>
      )}
    </div>
  )
}
