'use client'

import { useState, useMemo } from 'react'

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '')
  if (!word) return 0
  const m = word.match(/[aeiouy]+/g)
  let n = m ? m.length : 0
  if (word.endsWith('e')) n = Math.max(1, n - 1)
  return Math.max(1, n)
}

export default function TextStats() {
  const [input, setInput] = useState('')

  const stats = useMemo(() => {
    const words = input.trim() ? input.trim().split(/\s+/) : []
    const sentences = input.split(/[.!?]+/).filter(s => s.trim()).length || 1
    const syllables = words.reduce((s, w) => s + countSyllables(w), 0)
    const wc = words.length || 1
    // Flesch Reading Ease
    const flesch = 206.835 - 1.015 * (wc / sentences) - 84.6 * (syllables / wc)
    // Flesch-Kincaid grade
    const grade = 0.39 * (wc / sentences) + 11.8 * (syllables / wc) - 15.59
    // keyword density (top 5, words >3 chars)
    const freq: Record<string, number> = {}
    for (const w of words.map(w => w.toLowerCase().replace(/[^a-z0-9]/g, '')).filter(w => w.length > 3)) {
      freq[w] = (freq[w] || 0) + 1
    }
    const top = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5)
    return {
      words: words.length,
      chars: input.length,
      charsNoSpace: input.replace(/\s/g, '').length,
      sentences,
      paragraphs: input.split(/\n\s*\n/).filter(p => p.trim()).length,
      readingTime: Math.ceil(words.length / 200),
      flesch: Math.round(flesch),
      grade: Math.max(0, Math.round(grade)),
      top,
    }
  }, [input])

  const ease = stats.flesch >= 60 ? 'Easy' : stats.flesch >= 30 ? 'Moderate' : 'Difficult'

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste text to analyze..." className="w-full h-40 p-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {[
          ['Words', stats.words], ['Characters', stats.chars], ['Sentences', stats.sentences], ['Paragraphs', stats.paragraphs],
          ['Reading time', stats.readingTime + ' min'], ['Reading ease', `${stats.flesch} (${ease})`], ['Grade level', stats.grade], ['No spaces', stats.charsNoSpace],
        ].map(([label, val]) => (
          <div key={label} className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-lg font-bold text-blue-600">{val}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
          </div>
        ))}
      </div>
      {stats.top.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Top keywords</p>
          <div className="flex flex-wrap gap-2">
            {stats.top.map(([w, n]) => (
              <span key={w} className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full">{w} · {n}</span>
            ))}
          </div>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Reading ease uses the Flesch formula (higher = easier). Grade level is Flesch-Kincaid.</p>
    </div>
  )
}
