'use client'

import { useState, useEffect, useRef } from 'react'
import CopyButton from '@/components/CopyButton'
import ShareButton from '@/components/ShareButton'
import { useShareParam } from '@/lib/useShareParam'

function formatXml(xml: string): string {
  let formatted = ''
  let indent = 0
  const lines = xml.replace(/>\s*</g, '>\n<').split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (trimmed.startsWith('</')) indent--
    formatted += '  '.repeat(Math.max(0, indent)) + trimmed + '\n'
    if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.startsWith('<?') && !trimmed.endsWith('/>') && !trimmed.includes('</')) indent++
  }
  return formatted.trim()
}

function minifyXml(xml: string): string {
  return xml.replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').trim()
}

export default function XmlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const shared = useShareParam()
  const inputRef = useRef(input)
  inputRef.current = input
  useEffect(() => { if (shared) setInput(shared) }, [shared])

  const format = () => setOutput(formatXml(input))
  const minify = () => setOutput(minifyXml(input))

  return (
    <div className="space-y-4">
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='<root><item><name>Test</name><value>123</value></item></root>'
        className="w-full h-48 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <button onClick={format} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Format</button>
        <button onClick={minify} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600">Minify</button>
        <ShareButton getInput={() => inputRef.current} />
      </div>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
