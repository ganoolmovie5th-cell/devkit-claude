'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const WIRE = ['varint', '64-bit', 'length-delimited', 'start-group', 'end-group', '32-bit']

function decode(bytes: Uint8Array): string[] {
  const out: string[] = []
  let i = 0
  const varint = (): number => {
    let shift = 0, val = 0
    while (i < bytes.length) {
      const b = bytes[i++]
      val |= (b & 0x7f) << shift
      if (!(b & 0x80)) break
      shift += 7
    }
    return val >>> 0
  }
  while (i < bytes.length) {
    const tag = varint()
    const field = tag >> 3
    const wire = tag & 7
    if (wire === 0) out.push(`field ${field} (varint): ${varint()}`)
    else if (wire === 1) { const v = bytes.slice(i, i + 8); i += 8; out.push(`field ${field} (64-bit): 0x${[...v].map(x => x.toString(16).padStart(2, '0')).join('')}`) }
    else if (wire === 2) {
      const len = varint()
      const data = bytes.slice(i, i + len); i += len
      const txt = new TextDecoder().decode(data)
      const printable = /^[\x20-\x7e]*$/.test(txt)
      out.push(`field ${field} (length-delimited, ${len}b): ${printable ? JSON.stringify(txt) : '0x' + [...data].map(x => x.toString(16).padStart(2, '0')).join('')}`)
    }
    else if (wire === 5) { const v = bytes.slice(i, i + 4); i += 4; out.push(`field ${field} (32-bit): 0x${[...v].map(x => x.toString(16).padStart(2, '0')).join('')}`) }
    else { out.push(`field ${field} (${WIRE[wire] ?? wire})`); break }
  }
  return out
}

export default function ProtobufDecoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const run = () => {
    setError('')
    try {
      const clean = input.trim().replace(/\s/g, '')
      let bytes: Uint8Array
      if (/^[0-9a-fA-F]+$/.test(clean) && clean.length % 2 === 0) {
        bytes = new Uint8Array(clean.match(/.{2}/g)!.map(h => parseInt(h, 16)))
      } else {
        bytes = Uint8Array.from(atob(clean), c => c.charCodeAt(0))
      }
      setOutput(decode(bytes).join('\n'))
    } catch (e) { setError('Could not decode: ' + (e as Error).message); setOutput('') }
  }

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste protobuf wire data as hex or base64..." className="w-full h-28 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button onClick={run} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Decode</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Decodes raw protobuf wire format without a .proto schema — shows field numbers, wire types, and values.</p>
    </div>
  )
}
