'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

function hexToRgb(hex: string): [number, number, number] | null {
  let h = hex.replace('#', '')
  // Expand 3-digit shorthand (#abc -> #aabbcc).
  if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map(c => c + c).join('')
  const m = h.match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) h = ((b - r) / d + 2) / 6
    else h = ((r - g) / d + 4) / 6
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#3b82f6')
  const [rgb, setRgb] = useState('')
  const [hsl, setHsl] = useState('')

  const convert = () => {
    const c = hexToRgb(hex)
    if (!c) { setRgb('Invalid hex'); setHsl(''); return }
    setRgb(`rgb(${c[0]}, ${c[1]}, ${c[2]})`)
    const [h, s, l] = rgbToHsl(c[0], c[1], c[2])
    setHsl(`hsl(${h}, ${s}%, ${l}%)`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={hex}
          onChange={e => setHex(e.target.value)}
          className="w-12 h-12 rounded cursor-pointer"
        />
        <input
          type="text"
          value={hex}
          onChange={e => setHex(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert</button>
      </div>
      {rgb && (
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <span className="font-mono text-sm">{rgb}</span>
            <CopyButton text={rgb} />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <span className="font-mono text-sm">{hsl}</span>
            <CopyButton text={hsl} />
          </div>
          <div className="h-20 rounded-lg border border-gray-200" style={{ backgroundColor: hex }} />
        </div>
      )}
    </div>
  )
}
