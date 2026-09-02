'use client'

import { useState } from 'react'

function lum(hex: string): number {
  const m = hex.replace('#', '').match(/.{2}/g)
  if (!m || m.length < 3) return 0
  const [r, g, b] = m.map(h => {
    const v = parseInt(h, 16) / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export default function ContrastChecker() {
  const [fg, setFg] = useState('#1a1a1a')
  const [bg, setBg] = useState('#ffffff')

  const l1 = lum(fg), l2 = lum(bg)
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  const r = Math.round(ratio * 100) / 100

  const checks = [
    { label: 'Normal text (AA)', pass: r >= 4.5 },
    { label: 'Normal text (AAA)', pass: r >= 7 },
    { label: 'Large text (AA)', pass: r >= 3 },
    { label: 'Large text (AAA)', pass: r >= 4.5 },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">Text
          <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-10 h-8 rounded cursor-pointer" />
          <input type="text" value={fg} onChange={e => setFg(e.target.value)} className="flex-1 px-2 py-1 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">Background
          <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-10 h-8 rounded cursor-pointer" />
          <input type="text" value={bg} onChange={e => setBg(e.target.value)} className="flex-1 px-2 py-1 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" />
        </label>
      </div>
      <div className="p-6 rounded-lg text-center" style={{ background: bg, color: fg }}>
        <p className="text-2xl font-bold">Sample text</p>
        <p className="text-sm">The quick brown fox jumps over the lazy dog.</p>
      </div>
      <p className="text-center text-3xl font-bold text-blue-600">{r}:1</p>
      <div className="grid grid-cols-2 gap-2">
        {checks.map(c => (
          <div key={c.label} className={`p-2 rounded-lg text-sm flex items-center justify-between ${c.pass ? 'bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400'}`}>
            <span>{c.label}</span><span className="font-semibold">{c.pass ? 'Pass' : 'Fail'}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">WCAG 2.1 contrast ratios. Large text = 18pt+ or 14pt+ bold.</p>
    </div>
  )
}
