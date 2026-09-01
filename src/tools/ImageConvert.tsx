'use client'

import { useState, useRef } from 'react'

const FORMATS = [
  { label: 'PNG', mime: 'image/png', ext: 'png' },
  { label: 'JPEG', mime: 'image/jpeg', ext: 'jpg' },
  { label: 'WebP', mime: 'image/webp', ext: 'webp' },
]

export default function ImageConvert() {
  const [src, setSrc] = useState('')
  const [fmt, setFmt] = useState(FORMATS[2])
  const [outUrl, setOutUrl] = useState('')
  const [outSize, setOutSize] = useState('')
  const imgRef = useRef<HTMLImageElement | null>(null)

  const onFile = (f: File) => {
    const url = URL.createObjectURL(f)
    const img = new Image()
    img.onload = () => { imgRef.current = img; setSrc(url); setOutUrl('') }
    img.src = url
  }

  const convert = () => {
    const img = imgRef.current
    if (!img) return
    const canvas = document.createElement('canvas')
    canvas.width = img.width; canvas.height = img.height
    const ctx = canvas.getContext('2d')!
    if (fmt.mime === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height) }
    ctx.drawImage(img, 0, 0)
    canvas.toBlob(blob => {
      if (!blob) return
      setOutUrl(URL.createObjectURL(blob))
      setOutSize((blob.size / 1024).toFixed(1) + ' KB')
    }, fmt.mime, 0.92)
  }

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
      {src && (
        <div className="flex flex-wrap gap-3 items-center text-sm text-gray-700 dark:text-gray-300">
          Convert to:
          {FORMATS.map(f => (
            <label key={f.ext} className="flex items-center gap-1.5"><input type="radio" name="fmt" checked={fmt.ext === f.ext} onChange={() => setFmt(f)} /> {f.label}</label>
          ))}
          <button onClick={convert} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Convert</button>
        </div>
      )}
      {outUrl && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">Output: {fmt.label} · {outSize}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt="converted output" className="max-w-full border border-gray-200 dark:border-gray-700 rounded-lg" />
          <a href={outUrl} download={`converted.${fmt.ext}`} className="inline-block px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">Download {fmt.label}</a>
        </div>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">JPEG has no transparency — a white background is added. All processing is local.</p>
    </div>
  )
}
