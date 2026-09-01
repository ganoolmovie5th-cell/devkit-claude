'use client'

import { useState } from 'react'

export default function PxRemConverter() {
  const [base, setBase] = useState(16)
  const [px, setPx] = useState('16')

  const pxNum = parseFloat(px) || 0
  const rem = base ? (pxNum / base) : 0
  const commonPx = [12, 14, 16, 18, 20, 24, 32, 48, 64]

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">Root font size (base)
        <input type="number" value={base} onChange={e => setBase(Number(e.target.value))} className="w-24 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" />px
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">Pixels
          <input type="number" value={px} onChange={e => setPx(e.target.value)} className="px-3 py-2 font-mono border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg" />
        </label>
        <div className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">rem / em
          <div className="px-3 py-2 font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">{rem}rem</div>
        </div>
      </div>
      <table className="w-full text-sm font-mono">
        <thead><tr className="border-b border-gray-200 dark:border-gray-700 text-left text-gray-500 dark:text-gray-400"><th className="py-1.5">px</th><th className="py-1.5">rem (base {base})</th></tr></thead>
        <tbody>
          {commonPx.map(p => (
            <tr key={p} className="border-b border-gray-100 dark:border-gray-800"><td className="py-1.5">{p}px</td><td className="py-1.5">{(p / base)}rem</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
