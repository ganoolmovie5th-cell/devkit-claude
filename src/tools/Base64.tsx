'use client'

import { useState, useEffect, useRef } from 'react'
import CopyButton from '@/components/CopyButton'
import ShareButton from '@/components/ShareButton'
import SendToButton from '@/components/SendToButton'
import { useShareParam } from '@/lib/useShareParam'

export default function Base64() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const shared = useShareParam()
  const inputRef = useRef(input)
  inputRef.current = input
  const outputRef = useRef(output)
  outputRef.current = output

  useEffect(() => { if (shared) setInput(shared) }, [shared])

  const encode = () => {
    try { setOutput(btoa(unescape(encodeURIComponent(input)))) } catch { setOutput('Invalid input') }
  }
  const decode = () => {
    try { setOutput(decodeURIComponent(escape(atob(input)))) } catch { setOutput('Invalid Base64') }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter text or Base64..."
        className="w-full h-36 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2 flex-wrap">
        <button onClick={encode} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Encode</button>
        <button onClick={decode} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600">Decode</button>
        <ShareButton getInput={() => inputRef.current} />
      </div>
      {output && (
        <div className="space-y-2">
          <div className="relative">
            <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
            <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
          </div>
          <SendToButton getOutput={() => outputRef.current} exclude="base64-encode-decode" />
        </div>
      )}
    </div>
  )
}
