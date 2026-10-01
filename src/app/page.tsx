'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { tools } from '@/tools/registry'
import ToolCard from '@/components/ToolCard'
import FavoritesBar from '@/components/FavoritesBar'
import { fuzzyFilter } from '@/lib/fuzzy'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => {
    const cats = Array.from(new Set(tools.map(t => t.category)))
    return ['All', ...cats.sort()]
  }, [])

  const filtered = useMemo(() => {
    const byCat = category === 'All' ? tools : tools.filter(t => t.category === category)
    return fuzzyFilter(search, byCat, t => `${t.name}|${t.category}|${t.keywords.join(' ')}`)
  }, [search, category])

  return (
    <div>
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Free Online Developer Tools</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{tools.length}+ tools that run entirely in your browser. No data sent to any server.</p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-[10px]">Ctrl+K</kbd> to search
        </p>
      </section>

      <FavoritesBar />

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              category === cat
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(tool => (
          <ToolCard key={tool.slug} {...tool} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-8">No tools found.</p>
      )}

      <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Browse by category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.filter(c => c !== 'All').map(cat => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 max-w-3xl text-gray-600 dark:text-gray-400 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Developer tools that run in your browser</h2>
        <p className="mt-3">
          DevKit is a set of {tools.length}+ utilities for the small, repetitive jobs that fill a
          developer&apos;s day: formatting a minified JSON response, decoding a JWT to inspect its
          claims, generating UUIDs or a secure password, converting a timestamp, testing a regular
          expression, or diffing two blocks of text. Each tool does one thing and does it without a
          server round-trip.
        </p>
        <p className="mt-3">
          Everything runs client-side. When you paste data into a formatter or a decoder, that data
          is processed by JavaScript in your own browser and never uploaded. That makes DevKit safe
          to use with sensitive material — API keys, access tokens, internal payloads — that you
          would not want to send to an unknown backend. It also means the tools keep working offline
          once the page has loaded.
        </p>

        <h3 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">Common questions</h3>
        <div className="mt-3 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Is DevKit free?</h4>
            <p className="mt-1">Yes. Every tool is free to use with no signup, no account, and no usage limits.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Is my data sent anywhere?</h4>
            <p className="mt-1">No. All processing happens locally in your browser. Nothing you type or paste is transmitted to a server.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Do I need to install anything?</h4>
            <p className="mt-1">No. DevKit works directly in the browser. You can optionally install it as a PWA for one-click access and offline use.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Which tools are available?</h4>
            <p className="mt-1">
              Formatters, encoders and decoders, generators, converters, calculators, and testers
              across {categories.length - 1} categories. Use the search box above or press Ctrl+K to
              jump to any tool.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
