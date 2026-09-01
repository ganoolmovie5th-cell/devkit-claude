'use client'

import { useState, useEffect, useRef } from 'react'
import CopyButton from '@/components/CopyButton'
import ShareButton from '@/components/ShareButton'
import SendToButton from '@/components/SendToButton'
import { useShareParam } from '@/lib/useShareParam'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const shared = useShareParam()
  const inputRef = useRef(input)
  inputRef.current = input
  const outputRef = useRef(output)
  outputRef.current = output

  useEffect(() => { if (shared) setInput(shared) }, [shared])

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='Paste JSON here...'
        className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2 flex-wrap">
        <button onClick={format} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Format</button>
        <button onClick={minify} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600">Minify</button>
        <ShareButton getInput={() => inputRef.current} />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {output && (
        <div className="space-y-2">
          <div className="relative">
            <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96">{output}</pre>
            <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
          </div>
          <SendToButton getOutput={() => outputRef.current} exclude="json-formatter" />
        </div>
      )}
    </div>
  )
}
