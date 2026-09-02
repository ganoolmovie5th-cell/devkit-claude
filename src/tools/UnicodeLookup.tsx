'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function UnicodeLookup() {
  const [input, setInput] = useState('')

  const chars = [...input].map(ch => {
    const cp = ch.codePointAt(0)!
    return {
      char: ch,
      cp,
      hex: 'U+' + cp.toString(16).toUpperCase().padStart(4, '0'),
      dec: cp,
      htmlEntity: `&#${cp};`,
      jsEscape: cp > 0xffff ? `\\u{${cp.toString(16)}}` : `\\u${cp.toString(16).padStart(4, '0')}`,
    }
  })

  return (
    <div className="space-y-4">
      <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type or paste characters / emoji..." className="w-full px-3 py-2 text-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {chars.length > 0 && (
        <div className="overflow-auto max-h-96 border border-gray-200 dark:border-gray-700 rounded-lg">
          <table className="w-full text-sm font-mono">
            <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 text-left">
              <tr><th className="px-3 py-2">Char</th><th className="px-3 py-2">Code point</th><th className="px-3 py-2">Decimal</th><th className="px-3 py-2">HTML</th><th className="px-3 py-2">JS escape</th></tr>
            </thead>
            <tbody>
              {chars.map((c, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-800">
                  <td className="px-3 py-1.5 text-lg">{c.char}</td>
                  <td className="px-3 py-1.5">{c.hex}</td>
                  <td className="px-3 py-1.5">{c.dec}</td>
                  <td className="px-3 py-1.5">{c.htmlEntity}</td>
                  <td className="px-3 py-1.5">{c.jsEscape}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {chars.length > 0 && <CopyButton text={chars.map(c => `${c.char}\t${c.hex}\t${c.dec}\t${c.htmlEntity}\t${c.jsEscape}`).join('\n')} />}
    </div>
  )
}
