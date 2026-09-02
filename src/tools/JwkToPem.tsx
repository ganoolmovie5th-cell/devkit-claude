'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function toPem(der: ArrayBuffer, label: string): string {
  const b64 = btoa(String.fromCharCode(...new Uint8Array(der)))
  return `-----BEGIN ${label}-----\n${b64.match(/.{1,64}/g)?.join('\n')}\n-----END ${label}-----`
}

export default function JwkToPem() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = async () => {
    setError(''); setOutput('')
    try {
      const jwk = JSON.parse(input)
      const isPrivate = !!jwk.d
      const alg = jwk.kty === 'RSA'
        ? { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }
        : { name: 'ECDSA', namedCurve: jwk.crv }
      const usages: KeyUsage[] = isPrivate ? ['sign'] : ['verify']
      const key = await crypto.subtle.importKey('jwk', jwk, alg, true, usages)
      const fmt = isPrivate ? 'pkcs8' : 'spki'
      const der = await crypto.subtle.exportKey(fmt, key)
      setOutput(toPem(der, isPrivate ? 'PRIVATE KEY' : 'PUBLIC KEY'))
    } catch (e) { setError('Could not convert: ' + (e as Error).message) }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder='Paste a JWK, e.g. {"kty":"RSA","n":"...","e":"AQAB"}' className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert to PEM</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-xs break-all">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Converts RSA and EC JWKs to PEM via Web Crypto, locally. Detects public vs private from the key material.</p>
    </div>
  )
}
