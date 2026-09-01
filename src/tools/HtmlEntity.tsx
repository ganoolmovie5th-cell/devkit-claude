'use client'

import { useState, useEffect, useRef } from 'react'
import CopyButton from '@/components/CopyButton'
import ShareButton from '@/components/ShareButton'
import SendToButton from '@/components/SendToButton'
import { useShareParam } from '@/lib/useShareParam'

function encodeEntities(str: string): string {
  return str.replace(/[&<>"'\/]/g, (c) => {
    const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;' }
    return map[c] || c
  })
}

function decodeEntities(str: string): string {
  const el = document.createElement('textarea')
  el.innerHTML = str
  return el.value
}

export default function HtmlEntity() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const shared = useShareParam()
  const inputRef = useRef(input)
  inputRef.current = input
  const outputRef = useRef(output)
  outputRef.current = output
  useEffect(() => { if (shared) setInput(shared) }, [shared])

  const encode = () => setOutput(encodeEntities(input))
  const decode = () => setOutput(decodeEntities(input))

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter HTML or text with entities..."
        className="w-full h-36 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button onClick={encode} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Encode</button>
        <button onClick={decode} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Decode</button>
        <ShareButton getInput={() => inputRef.current} />
      </div>
      {output && (
        <div className="space-y-2">
          <div className="relative">
            <pre className="p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
            <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
          </div>
          <SendToButton getOutput={() => outputRef.current} exclude="html-entity-encode-decode" />
        </div>
      )}
    </div>
  )
}
