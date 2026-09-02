'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function CssGridGenerator() {
  const [cols, setCols] = useState(3)
  const [rows, setRows] = useState(2)
  const [gap, setGap] = useState(16)
  const [colUnit, setColUnit] = useState<'1fr' | 'auto' | 'min-content'>('1fr')

  const css = `display: grid;
grid-template-columns: repeat(${cols}, ${colUnit});
grid-template-rows: repeat(${rows}, auto);
gap: ${gap}px;`

  const cells = Array.from({ length: cols * rows }, (_, i) => i + 1)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end text-sm text-gray-700 dark:text-gray-300">
        <label className="flex flex-col gap-1">Columns<input type="number" min={1} max={12} value={cols} onChange={e => setCols(Number(e.target.value))} className="w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
        <label className="flex flex-col gap-1">Rows<input type="number" min={1} max={12} value={rows} onChange={e => setRows(Number(e.target.value))} className="w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
        <label className="flex flex-col gap-1">Gap (px)<input type="number" min={0} max={64} value={gap} onChange={e => setGap(Number(e.target.value))} className="w-20 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
        <label className="flex flex-col gap-1">Column size
          <select value={colUnit} onChange={e => setColUnit(e.target.value as typeof colUnit)} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded">
            <option value="1fr">1fr (equal)</option>
            <option value="auto">auto</option>
            <option value="min-content">min-content</option>
          </select>
        </label>
      </div>
      <div className="grid p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: `${gap}px` }}>
        {cells.map(i => <div key={i} className="bg-blue-500/20 border border-blue-500/40 rounded p-4 text-center text-xs text-blue-700 dark:text-blue-300">{i}</div>)}
      </div>
      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm whitespace-pre-wrap">{css}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={css} /></div>
      </div>
    </div>
  )
}
