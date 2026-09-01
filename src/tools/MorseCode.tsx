'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const MAP: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.',
  '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
  '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '@': '.--.-.',
}
const REV: Record<string, string> = Object.fromEntries(Object.entries(MAP).map(([k, v]) => [v, k]))

function toMorse(text: string): string {
  return text.toUpperCase().split('').map(c => c === ' ' ? '/' : (MAP[c] ?? '')).filter(Boolean).join(' ')
}
function fromMorse(code: string): string {
  return code.trim().split(' ').map(t => t === '/' ? ' ' : (REV[t] ?? '')).join('')
}

export default function MorseCode() {
  const [input, setInput] = useState('')
  const looksMorse = /^[.\-/\s]+$/.test(input.trim()) && input.trim().length > 0
  const output = looksMorse ? fromMorse(input) : toMorse(input)

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text or Morse code (. - /)..." className="w-full h-28 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <p className="text-xs text-gray-500 dark:text-gray-400">Auto-detects direction: {looksMorse ? 'Morse → Text' : 'Text → Morse'}. Word gap = <code>/</code>.</p>
      {output && (
        <div className="relative">
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
          <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
        </div>
      )}
    </div>
  )
}
