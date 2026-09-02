'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function CssClamp() {
  const [minSize, setMinSize] = useState(16)
  const [maxSize, setMaxSize] = useState(32)
  const [minVw, setMinVw] = useState(320)
  const [maxVw, setMaxVw] = useState(1280)
  const [root, setRoot] = useState(16)

  // linear interpolation: size = slope*vw + intercept
  const slope = (maxSize - minSize) / (maxVw - minVw)
  const yIntercept = minSize - slope * minVw
  const preferredVw = (slope * 100).toFixed(4)
  const preferredRem = (yIntercept / root).toFixed(4)
  const clamp = `clamp(${(minSize / root).toFixed(3)}rem, ${preferredRem}rem + ${preferredVw}vw, ${(maxSize / root).toFixed(3)}rem)`

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300">
        <label className="flex flex-col gap-1">Min size (px)<input type="number" value={minSize} onChange={e => setMinSize(Number(e.target.value))} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
        <label className="flex flex-col gap-1">Max size (px)<input type="number" value={maxSize} onChange={e => setMaxSize(Number(e.target.value))} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
        <label className="flex flex-col gap-1">Root (px)<input type="number" value={root} onChange={e => setRoot(Number(e.target.value))} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
        <label className="flex flex-col gap-1">Min viewport (px)<input type="number" value={minVw} onChange={e => setMinVw(Number(e.target.value))} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
        <label className="flex flex-col gap-1">Max viewport (px)<input type="number" value={maxVw} onChange={e => setMaxVw(Number(e.target.value))} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
      </div>
      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto font-mono text-sm">font-size: {clamp};</pre>
        <div className="absolute top-2 right-2"><CopyButton text={`font-size: ${clamp};`} /></div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Fluid sizing that scales between min and max viewport widths, then clamps at both ends.</p>
    </div>
  )
}
