'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const PRESETS: Record<string, [number, number, number, number]> = {
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
  linear: [0, 0, 1, 1],
}

export default function CubicBezier() {
  const [p, setP] = useState<[number, number, number, number]>([0.25, 0.1, 0.25, 1])
  const W = 200, H = 200
  // curve path from (0,H) to (W,0) with control points
  const path = `M 0 ${H} C ${p[0] * W} ${H - p[1] * H}, ${p[2] * W} ${H - p[3] * H}, ${W} 0`
  const css = `cubic-bezier(${p.map(n => +n.toFixed(2)).join(', ')})`

  const setVal = (i: number, v: number) => setP(prev => prev.map((x, j) => j === i ? v : x) as typeof prev)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(PRESETS).map(([name, val]) => (
          <button key={name} onClick={() => setP(val)} className="px-3 py-1 text-sm border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800">{name}</button>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <svg width={W} height={H} className="border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 flex-shrink-0">
          <line x1="0" y1={H} x2={p[0] * W} y2={H - p[1] * H} stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
          <line x1={W} y1="0" x2={p[2] * W} y2={H - p[3] * H} stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
          <path d={path} stroke="#2563eb" strokeWidth="2" fill="none" />
          <circle cx={p[0] * W} cy={H - p[1] * H} r="5" fill="#3b82f6" />
          <circle cx={p[2] * W} cy={H - p[3] * H} r="5" fill="#3b82f6" />
        </svg>
        <div className="flex-1 w-full space-y-2 text-sm">
          {['P1 x', 'P1 y', 'P2 x', 'P2 y'].map((label, i) => (
            <label key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="w-10">{label}</span>
              <input type="range" min={i % 2 === 0 ? 0 : -0.5} max={i % 2 === 0 ? 1 : 1.5} step={0.01} value={p[i]} onChange={e => setVal(i, Number(e.target.value))} className="flex-1" />
              <span className="font-mono w-12 text-right">{p[i].toFixed(2)}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm">transition-timing-function: {css};</pre>
        <div className="absolute top-2 right-2"><CopyButton text={css} /></div>
      </div>
    </div>
  )
}
