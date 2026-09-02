'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const TAGS: Record<number, string> = {
  0x02: 'INTEGER', 0x03: 'BIT STRING', 0x04: 'OCTET STRING', 0x05: 'NULL',
  0x06: 'OBJECT IDENTIFIER', 0x0c: 'UTF8String', 0x13: 'PrintableString',
  0x14: 'T61String', 0x16: 'IA5String', 0x17: 'UTCTime', 0x18: 'GeneralizedTime',
  0x30: 'SEQUENCE', 0x31: 'SET', 0x01: 'BOOLEAN',
}

function parse(bytes: Uint8Array, offset: number, end: number, depth: number, out: string[]) {
  let i = offset
  while (i < end) {
    const tag = bytes[i++]
    let len = bytes[i++]
    if (len & 0x80) {
      const n = len & 0x7f
      len = 0
      for (let j = 0; j < n; j++) len = (len << 8) | bytes[i++]
    }
    const name = TAGS[tag] ?? `[tag 0x${tag.toString(16)}]`
    const constructed = (tag & 0x20) !== 0
    const pad = '  '.repeat(depth)
    if (constructed) {
      out.push(`${pad}${name} (${len} bytes)`)
      parse(bytes, i, i + len, depth + 1, out)
    } else {
      const val = bytes.slice(i, i + len)
      let repr = '0x' + [...val].map(x => x.toString(16).padStart(2, '0')).join('')
      if (tag === 0x0c || tag === 0x13 || tag === 0x16) repr = JSON.stringify(new TextDecoder().decode(val))
      out.push(`${pad}${name}: ${repr.length > 80 ? repr.slice(0, 80) + '…' : repr}`)
    }
    i += len
  }
}

export default function Asn1Parser() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const run = () => {
    setError('')
    try {
      let clean = input.trim().replace(/-----[^-]+-----/g, '').replace(/\s/g, '')
      let bytes: Uint8Array
      if (/^[0-9a-fA-F]+$/.test(clean) && clean.length % 2 === 0) bytes = new Uint8Array(clean.match(/.{2}/g)!.map(h => parseInt(h, 16)))
      else bytes = Uint8Array.from(atob(clean), c => c.charCodeAt(0))
      const out: string[] = []
      parse(bytes, 0, bytes.length, 0, out)
      setOutput(out.join('\n'))
    } catch (e) { setError('Could not parse: ' + (e as Error).message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste DER as hex, base64, or PEM..." className="w-full h-28 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={run} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Parse ASN.1</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Parses DER-encoded ASN.1 (certificates, keys) into a tag/length/value tree. Accepts hex, base64, or PEM.</p>
    </div>
  )
}
