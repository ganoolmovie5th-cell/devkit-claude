'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function decodeJwtPart(part: string): string {
  try {
    const padded = part.replace(/-/g, '+').replace(/_/g, '/') + '=='.slice(0, (4 - part.length % 4) % 4)
    // UTF-8 aware base64 decode so multibyte claims aren't garbled.
    const bytes = Uint8Array.from(atob(padded), c => c.charCodeAt(0))
    const json = new TextDecoder().decode(bytes)
    return JSON.stringify(JSON.parse(json), null, 2)
  } catch {
    return 'Invalid'
  }
}

export default function JwtDecoder() {
  const [input, setInput] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')

  const decode = () => {
    const parts = input.trim().split('.')
    if (parts.length !== 3) {
      setHeader('Invalid JWT format (expected 3 parts)')
      setPayload('')
      return
    }
    setHeader(decodeJwtPart(parts[0]))
    setPayload(decodeJwtPart(parts[1]))
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste JWT token here..."
        className="w-full h-28 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={decode} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Decode</button>
      {header && (
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Header</h3>
            <div className="relative">
              <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto">{header}</pre>
              <div className="absolute top-2 right-2"><CopyButton text={header} /></div>
            </div>
          </div>
          {payload && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Payload</h3>
              <div className="relative">
                <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto">{payload}</pre>
                <div className="absolute top-2 right-2"><CopyButton text={payload} /></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
