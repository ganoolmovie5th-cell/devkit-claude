'use client'

import { useState } from 'react'

// Color-blindness simulation matrices (RGB).
const MATRICES: Record<string, number[]> = {
  Protanopia: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
  Deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  Tritanopia: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
  Achromatopsia: [0.299, 0.587, 0.114, 0.299, 0.587, 0.114, 0.299, 0.587, 0.114],
}

function apply(hex: string, m: number[]): string {
  const c = hex.replace('#', '').match(/.{2}/g)!.map(x => parseInt(x, 16))
  const [r, g, b] = c
  const nr = Math.round(m[0] * r + m[1] * g + m[2] * b)
  const ng = Math.round(m[3] * r + m[4] * g + m[5] * b)
  const nb = Math.round(m[6] * r + m[7] * g + m[8] * b)
  return '#' + [nr, ng, nb].map(v => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('')
}

export default function ColorBlindness() {
  const [color, setColor] = useState('#e11d48')

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">Pick a color
        <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-12 h-9 rounded cursor-pointer" />
        <input type="text" value={color} onChange={e => setColor(e.target.value)} className="px-2 py-1 font-mono border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" />
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="text-center">
          <div className="h-20 rounded-lg border border-gray-200 dark:border-gray-700" style={{ background: color }} />
          <p className="text-xs mt-1 text-gray-700 dark:text-gray-300">Normal</p>
          <p className="text-[10px] font-mono text-gray-400">{color}</p>
        </div>
        {Object.entries(MATRICES).map(([name, m]) => {
          const sim = apply(color, m)
          return (
            <div key={name} className="text-center">
              <div className="h-20 rounded-lg border border-gray-200 dark:border-gray-700" style={{ background: sim }} />
              <p className="text-xs mt-1 text-gray-700 dark:text-gray-300">{name}</p>
              <p className="text-[10px] font-mono text-gray-400">{sim}</p>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Simulates how a color appears under common types of color-vision deficiency. Useful for checking UI accessibility.</p>
    </div>
  )
}
