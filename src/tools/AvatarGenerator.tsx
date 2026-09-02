'use client'

import { useState, useRef, useEffect } from 'react'

const PALETTES = [
  ['#2563eb', '#ffffff'], ['#dc2626', '#ffffff'], ['#059669', '#ffffff'],
  ['#7c3aed', '#ffffff'], ['#ea580c', '#ffffff'], ['#0d9488', '#ffffff'],
]

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

export default function AvatarGenerator() {
  const [name, setName] = useState('Jane Doe')
  const [size, setSize] = useState(256)
  const [rounded, setRounded] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const [bg, fg] = PALETTES[hash(name) % PALETTES.length]
    canvas.width = size; canvas.height = size
    ctx.clearRect(0, 0, size, size)
    if (rounded) { ctx.beginPath(); ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); ctx.clip() }
    ctx.fillStyle = bg; ctx.fillRect(0, 0, size, size)
    const initials = name.trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase()
    ctx.fillStyle = fg
    ctx.font = `bold ${size * 0.4}px system-ui, sans-serif`
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(initials, size / 2, size / 2 + size * 0.02)
  }, [name, size, rounded])

  const download = () => {
    const link = document.createElement('a')
    link.download = 'avatar.png'
    link.href = canvasRef.current!.toDataURL()
    link.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-end text-sm text-gray-700 dark:text-gray-300">
        <label className="flex flex-col gap-1 flex-1 min-w-[160px]">Name<input type="text" value={name} onChange={e => setName(e.target.value)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg" /></label>
        <label className="flex flex-col gap-1">Size<input type="number" min={64} max={512} step={32} value={size} onChange={e => setSize(Number(e.target.value))} className="w-24 px-2 py-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg" /></label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={rounded} onChange={e => setRounded(e.target.checked)} /> Circle</label>
      </div>
      <div className="flex flex-col items-center gap-3">
        <canvas ref={canvasRef} className="border border-gray-200 dark:border-gray-700 rounded-lg" style={{ width: 128, height: 128 }} />
        <button onClick={download} className="px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">Download PNG</button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Initials avatar with a color picked deterministically from the name. Generated locally.</p>
    </div>
  )
}
