'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { tools } from '@/tools/registry'
import { fuzzyFilter } from '@/lib/fuzzy'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filtered = (query
    ? fuzzyFilter(query, tools, t => `${t.name}|${t.keywords.join(' ')}`)
    : tools
  ).slice(0, 8)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      setQuery('')
      setSelected(0)
    }
  }, [open])

  const go = (slug: string) => {
    router.push(`/tools/${slug}`)
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
    if (e.key === 'Enter' && filtered[selected]) { go(filtered[selected].slug) }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[99] flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
      <div className="fixed inset-0 bg-black/50" />
      <div
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(0) }}
          onKeyDown={handleKeyDown}
          placeholder="Search tools..."
          className="w-full px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none"
        />
        <ul className="max-h-72 overflow-y-auto">
          {filtered.map((t, i) => (
            <li
              key={t.slug}
              onClick={() => go(t.slug)}
              className={`px-4 py-2.5 cursor-pointer flex items-center justify-between ${
                i === selected ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-gray-400">{t.category}</p>
              </div>
              <span className="text-xs text-gray-300 dark:text-gray-600">↵</span>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-gray-400">No tools found</li>
          )}
        </ul>
      </div>
    </div>
  )
}
