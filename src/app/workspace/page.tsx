'use client'

import { useState } from 'react'
import { tools } from '@/tools/registry'
import ToolRenderer from '@/tools/ToolRenderer'

interface Tab {
  id: string
  slug: string
  name: string
}

export default function WorkspacePage() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', slug: 'json-formatter', name: 'JSON Formatter & Validator' }
  ])
  const [activeTab, setActiveTab] = useState('1')
  const [showPicker, setShowPicker] = useState(false)
  const [search, setSearch] = useState('')

  const addTab = (slug: string) => {
    const tool = tools.find(t => t.slug === slug)
    if (!tool) return
    const id = Date.now().toString()
    setTabs(prev => [...prev, { id, slug, name: tool.name }])
    setActiveTab(id)
    setShowPicker(false)
    setSearch('')
  }

  const closeTab = (id: string) => {
    if (tabs.length <= 1) return
    const next = tabs.filter(t => t.id !== id)
    setTabs(next)
    if (activeTab === id) setActiveTab(next[next.length - 1].id)
  }

  const filtered = search
    ? tools.filter(t => t.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8)
    : tools.slice(0, 8)

  const currentTab = tabs.find(t => t.id === activeTab)

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Workspace</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Use multiple tools side by side in tabs.</p>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 mb-4 overflow-x-auto">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="max-w-[150px] truncate">{tab.name}</span>
            {tabs.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); closeTab(tab.id) }}
                className="ml-1 text-gray-400 hover:text-red-500 text-xs leading-none"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => setShowPicker(true)}
          className="px-3 py-2 text-sm text-gray-400 hover:text-blue-600 border-b-2 border-transparent"
        >
          + Add Tool
        </button>
      </div>

      {/* Tool picker modal */}
      {showPicker && (
        <div className="fixed inset-0 z-[95] flex items-start justify-center pt-[15vh]" onClick={() => setShowPicker(false)}>
          <div className="fixed inset-0 bg-black/50" />
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden" onClick={e => e.stopPropagation()}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tools to add..."
              autoFocus
              className="w-full px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none"
            />
            <ul className="max-h-64 overflow-y-auto">
              {filtered.map(t => (
                <li
                  key={t.slug}
                  onClick={() => addTab(t.slug)}
                  className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.category}</p>
                  </div>
                  <span className="text-xs text-gray-300">+</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Active tool */}
      {currentTab && (
        <div>
          <ToolRenderer slug={currentTab.slug} />
        </div>
      )}

      <section className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 prose prose-sm prose-gray dark:prose-invert max-w-none">
        <h2>About the DevKit Workspace</h2>
        <p>
          The Workspace lets you open several DevKit tools at once and switch between them with tabs,
          the same way you keep multiple files open in an editor. It is built for tasks that need more
          than one utility — decode a token, reformat the payload, then hash a value without losing
          your place.
        </p>
        <h2>How it works</h2>
        <ol>
          <li>Start with the default tab, or press <strong>+ Add Tool</strong> to open another tool.</li>
          <li>Search for any of the 80+ DevKit tools and add it as a new tab.</li>
          <li>Switch between tabs to move through your workflow; close a tab when you are done.</li>
        </ol>
        <p>
          Every tool in the Workspace runs entirely in your browser. Nothing you type is uploaded, so
          it is safe to work with tokens, keys, and other private data across tabs.
        </p>
      </section>
    </div>
  )
}
