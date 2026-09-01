'use client'

import { useState } from 'react'
import { tools } from '@/tools/registry'

// Chain tools: take this tool's output and open another tool with it
// pre-filled via the shared ?q= param (same mechanism as ShareButton).
// Only lists tools that read ?q= (text-input tools).
const CHAIN_TARGETS = [
  'json-formatter', 'json-diff', 'json-query', 'base64-encode-decode',
  'url-encode-decode', 'html-entity-encode-decode', 'hash-generator',
  'sql-formatter', 'xml-formatter', 'regex-tester', 'word-counter',
  'text-case-converter', 'dedupe-lines', 'text-toolbox',
]

export default function SendToButton({ getOutput, exclude }: { getOutput: () => string; exclude?: string }) {
  const [open, setOpen] = useState(false)

  const targets = tools.filter(t => CHAIN_TARGETS.includes(t.slug) && t.slug !== exclude)

  const send = (slug: string) => {
    const out = getOutput()
    if (!out) return
    window.open(`/tools/${slug}/?q=${encodeURIComponent(out)}`, '_blank')
    setOpen(false)
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(o => !o)}
        className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        Send to →
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-1 w-56 max-h-64 overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1">
            {targets.map(t => (
              <button
                key={t.slug}
                onClick={() => send(t.slug)}
                className="block w-full text-left px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                {t.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
