'use client'

import { useState, useRef } from 'react'

export default function ImageResize() {
  const [src, setSrc] = useState('')
  const [w, setW] = useState(0)
  const [h, setH] = useState(0)
  const [origW, setOrigW] = useState(0)
  const [origH, setOrigH] = useState(0)
  const [quality, setQuality] = useState(0.8)
  const [lock, setLock] = useState(true)
  const [outUrl, setOutUrl] = useState('')
  const [outSize, setOutSize] = useState('')
  const imgRef = useRef<HTMLImageElement | null>(null)

  const onFile = (f: File) => {
    const url = URL.createObjectURL(f)
    const img = new Image()
    img.onload = () => {
      setOrigW(img.width); setOrigH(img.height)
      setW(img.width); setH(img.height)
      imgRef.current = img
      setSrc(url)
      setOutUrl('')
    }
    img.src = url
  }

  const setWidth = (nw: number) => { setW(nw); if (lock && origW) setH(Math.round(nw * origH / origW)) }
  const setHeight = (nh: number) => { setH(nh); if (lock && origH) setW(Math.round(nh * origW / origH)) }

  const render = () => {
    const img = imgRef.current
    if (!img) return
    const canvas = document.createElement('canvas')
    canvas.width = w; canvas.height = h
    canvas.getContext('2d')!.drawImage(img, 0, 0, w, h)
    canvas.toBlob(blob => {
      if (!blob) return
      setOutUrl(URL.createObjectURL(blob))
      setOutSize((blob.size / 1024).toFixed(1) + ' KB')
    }, 'image/jpeg', quality)
  }

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
      {src && (
        <>
          <p className="text-xs text-gray-500 dark:text-gray-400">Original: {origW}×{origH}px</p>
          <div className="flex flex-wrap gap-3 items-end text-sm text-gray-700 dark:text-gray-300">
            <label className="flex flex-col gap-1">Width<input type="number" value={w} onChange={e => setWidth(Number(e.target.value))} className="w-24 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
            <label className="flex flex-col gap-1">Height<input type="number" value={h} onChange={e => setHeight(Number(e.target.value))} className="w-24 px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
            <label className="flex items-center gap-1.5"><input type="checkbox" checked={lock} onChange={e => setLock(e.target.checked)} /> Lock ratio</label>
            <label className="flex items-center gap-1.5">Quality<input type="range" min={0.1} max={1} step={0.05} value={quality} onChange={e => setQuality(Number(e.target.value))} /><span className="font-mono w-8">{quality.toFixed(2)}</span></label>
            <button onClick={render} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Resize + Compress</button>
          </div>
        </>
      )}
      {outUrl && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">Output: {w}×{h}px · {outSize}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt="resized output" className="max-w-full border border-gray-200 dark:border-gray-700 rounded-lg" />
          <a href={outUrl} download="resized.jpg" className="inline-block px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">Download JPEG</a>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Runs entirely in your browser — the image is never uploaded.</p>
    </div>
  )
}
