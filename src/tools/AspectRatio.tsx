'use client'

import { useState } from 'react'

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b) }

export default function AspectRatio() {
  const [w, setW] = useState(1920)
  const [h, setH] = useState(1080)
  const [newW, setNewW] = useState('')

  const g = w && h ? gcd(w, h) : 1
  const ratio = w && h ? `${w / g}:${h / g}` : '—'
  const decimal = w && h ? (w / h).toFixed(4) : '—'
  const scaledH = newW && w ? Math.round(Number(newW) * h / w) : ''

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end text-sm text-gray-700 dark:text-gray-300">
        <label className="flex flex-col gap-1">Width<input type="number" value={w} onChange={e => setW(Number(e.target.value))} className="w-28 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
        <span className="pb-1">×</span>
        <label className="flex flex-col gap-1">Height<input type="number" value={h} onChange={e => setH(Number(e.target.value))} className="w-28 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400">Aspect ratio</p>
          <p className="text-2xl font-bold font-mono text-blue-600">{ratio}</p>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400">Decimal (w ÷ h)</p>
          <p className="text-2xl font-bold font-mono text-blue-600">{decimal}</p>
        </div>
      </div>
      <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300">
        <p className="mb-2 font-medium">Scale keeping ratio</p>
        <label className="flex items-center gap-2">New width
          <input type="number" value={newW} onChange={e => setNewW(e.target.value)} placeholder="e.g. 1280" className="w-28 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" />
          {scaledH !== '' && <span>→ height <span className="font-mono font-semibold">{scaledH}px</span></span>}
        </label>
      </div>
    </div>
  )
}
