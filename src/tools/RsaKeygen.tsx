'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function toPem(der: ArrayBuffer, label: string): string {
  const b64 = btoa(String.fromCharCode(...new Uint8Array(der)))
  const lines = b64.match(/.{1,64}/g)?.join('\n') ?? b64
  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----`
}

export default function RsaKeygen() {
  const [bits, setBits] = useState(2048)
  const [pub, setPub] = useState('')
  const [priv, setPriv] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true); setPub(''); setPriv('')
    try {
      const pair = await crypto.subtle.generateKey(
        { name: 'RSASSA-PKCS1-v1_5', modulusLength: bits, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
        true,
        ['sign', 'verify']
      )
      const pk = await crypto.subtle.exportKey('spki', pair.publicKey)
      const sk = await crypto.subtle.exportKey('pkcs8', pair.privateKey)
      setPub(toPem(pk, 'PUBLIC KEY'))
      setPriv(toPem(sk, 'PRIVATE KEY'))
    } finally { setLoading(false) }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <label className="text-sm text-gray-700 dark:text-gray-300">Key size
          <select value={bits} onChange={e => setBits(Number(e.target.value))} className="ml-2 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded">
            <option value={2048}>2048</option>
            <option value={3072}>3072</option>
            <option value={4096}>4096</option>
          </select>
        </label>
        <button onClick={generate} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">{loading ? 'Generating…' : 'Generate keypair'}</button>
      </div>
      {pub && (
        <>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Public key (PEM)</p>
            <div className="relative">
              <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-52 font-mono text-xs break-all whitespace-pre-wrap">{pub}</pre>
              <div className="absolute top-2 right-2"><CopyButton text={pub} /></div>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Private key (PEM)</p>
            <div className="relative">
              <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-52 font-mono text-xs break-all whitespace-pre-wrap">{priv}</pre>
              <div className="absolute top-2 right-2"><CopyButton text={priv} /></div>
            </div>
          </div>
        </>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">RSA keys are generated locally via Web Crypto and never leave your browser. For real production keys, generate them in a trusted environment.</p>
    </div>
  )
}
