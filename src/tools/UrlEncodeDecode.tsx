'use client'

import { useState, useEffect, useRef } from 'react'
import CopyButton from '@/components/CopyButton'
import ShareButton from '@/components/ShareButton'
import { useShareParam } from '@/lib/useShareParam'

export default function UrlEncodeDecode() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const shared = useShareParam()
  const inputRef = useRef(input)
  inputRef.current = input
  useEffect(() => { if (shared) setInput(shared) }, [shared])

  const encode = () => setOutput(encodeURIComponent(input))
  const decode = () => {
    try { setOutput(decodeURIComponent(input)) } catch { setOutput('Invalid URL-encoded string') }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text or URL-encoded string..."
        className="w-full h-36 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button onClick={encode} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Encode</button>
        <button onClick={decode} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Decode</button>
        <ShareButton getInput={() => inputRef.current} />
      </div>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
