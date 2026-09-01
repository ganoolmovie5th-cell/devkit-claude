'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { tools } from '@/tools/registry'

function fuzzyMatch(path: string) {
  const slug = path.split('/').pop()?.replace(/[^a-z0-9-]/g, '') || ''
  if (!slug) return []

  return tools
    .map(t => {
      const score =
        (t.slug.includes(slug) ? 3 : 0) +
        (slug.includes(t.slug) ? 3 : 0) +
        (t.name.toLowerCase().includes(slug) ? 2 : 0) +
        t.keywords.filter(k => k.includes(slug) || slug.includes(k.split(' ')[0])).length
      return { ...t, score }
    })
    .filter(t => t.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
}

export default function NotFound() {
  const pathname = usePathname()
  const suggestions = fuzzyMatch(pathname)

  // AdSense policy: no ads on error/404 screens. Pause auto-ad requests here.
  useEffect(() => {
    try {
      const w = window as unknown as { adsbygoogle?: { pauseAdRequests?: number } }
      w.adsbygoogle = w.adsbygoogle || {}
      w.adsbygoogle.pauseAdRequests = 1
    } catch {}
  }, [])

  const fallback = tools.filter(t =>
    ['json-formatter', 'base64-encode-decode', 'uuid-generator', 'regex-tester', 'password-generator', 'hash-generator'].includes(t.slug)
  )

  const displayed = suggestions.length > 0 ? suggestions : fallback.slice(0, 4)

  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {suggestions.length > 0
          ? 'Did you mean one of these?'
          : "The page you're looking for doesn't exist. Try one of these tools:"}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-left">
        {displayed.map(t => (
          <Link
            key={t.slug}
            href={`/tools/${t.slug}`}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <span className="text-xs text-blue-600 uppercase tracking-wide">{t.category}</span>
            <p className="font-medium text-gray-900 dark:text-white text-sm">{t.name}</p>
          </Link>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Browse All Tools
        </Link>
        <Link href="/cheatsheets" className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          Cheat Sheets
        </Link>
      </div>
    </div>
  )
}
