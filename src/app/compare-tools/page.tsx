'use client'

import { useState } from 'react'
import { tools } from '@/tools/registry'
import ToolRenderer from '@/tools/ToolRenderer'

export default function CompareToolsPage() {
  const [leftSlug, setLeftSlug] = useState('')
  const [rightSlug, setRightSlug] = useState('')

  const leftTool = tools.find(t => t.slug === leftSlug)
  const rightTool = tools.find(t => t.slug === rightSlug)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Compare Tools</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Use two tools side by side to compare outputs or workflows.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          value={leftSlug}
          onChange={e => setLeftSlug(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select first tool...</option>
          {tools.map(t => <option key={t.slug} value={t.slug}>{t.name}</option>)}
        </select>
        <select
          value={rightSlug}
          onChange={e => setRightSlug(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select second tool...</option>
          {tools.map(t => <option key={t.slug} value={t.slug}>{t.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {leftTool && (
            <>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{leftTool.name}</h2>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <ToolRenderer slug={leftTool.slug} />
              </div>
            </>
          )}
          {!leftTool && <div className="h-48 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-sm">Select a tool above</div>}
        </div>
        <div>
          {rightTool && (
            <>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{rightTool.name}</h2>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <ToolRenderer slug={rightTool.slug} />
              </div>
            </>
          )}
          {!rightTool && <div className="h-48 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-sm">Select a tool above</div>}
        </div>
      </div>

      <section className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 prose prose-sm prose-gray dark:prose-invert max-w-none">
        <h2>Compare two developer tools side by side</h2>
        <p>
          This view opens any two DevKit tools next to each other so you can feed them the same input
          and see how the results differ. It is useful when you are deciding which format to adopt, or
          when one step of a task hands its output to the next.
        </p>
        <h2>Common comparisons</h2>
        <ul>
          <li>Run a JSON formatter beside a YAML converter to see the same data in both formats.</li>
          <li>Place Base64 encoding next to URL encoding to compare their output on identical text.</li>
          <li>Check an MD5 hash against a SHA-256 hash of the same string.</li>
        </ul>
        <p>
          Pick a tool from each dropdown to begin. Both tools run entirely in your browser, so your
          input stays on your device and never touches a server.
        </p>
      </section>
    </div>
  )
}
