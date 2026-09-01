'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function minifySvg(svg: string): string {
  return svg
    .replace(/<!--[\s\S]*?-->/g, '')          // comments
    .replace(/>\s+</g, '><')                    // whitespace between tags
    .replace(/\s{2,}/g, ' ')                    // collapse spaces
    .replace(/\s*([=:;,{}])\s*/g, '$1')         // around punctuation
    .replace(/<\?xml[^>]*\?>/g, '')             // xml prolog
    .replace(/\s+\/>/g, '/>')                   // space before self-close
    .trim()
}

export default function SvgMinifier() {
  const [input, setInput] = useState('')
  const output = input ? minifySvg(input) : ''
  const saved = input ? (100 - (output.length / input.length) * 100).toFixed(1) : '0'

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste SVG markup..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {output && (
        <>
          <p className="text-xs text-gray-500 dark:text-gray-400">{input.length} → {output.length} bytes ({saved}% smaller)</p>
          <div className="relative">
            <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm break-all">{output}</pre>
            <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
          </div>
        </>
      )}
    </div>
  )
}
