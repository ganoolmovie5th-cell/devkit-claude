'use client'

import { useState, useRef } from 'react'

export default function ExifStripper() {
  const [origSize, setOrigSize] = useState('')
  const [outUrl, setOutUrl] = useState('')
  const [outSize, setOutSize] = useState('')
  const [name, setName] = useState('cleaned.jpg')
  const imgRef = useRef<HTMLImageElement | null>(null)

  const onFile = (f: File) => {
    setOrigSize((f.size / 1024).toFixed(1) + ' KB')
    setName('cleaned-' + f.name.replace(/\.[^.]+$/, '') + '.jpg')
    const url = URL.createObjectURL(f)
    const img = new Image()
    img.onload = () => {
      imgRef.current = img
      // Re-encoding through canvas discards all EXIF/metadata.
      const canvas = document.createElement('canvas')
      canvas.width = img.width; canvas.height = img.height
      canvas.getContext('2d')!.drawImage(img, 0, 0)
      canvas.toBlob(blob => {
        if (!blob) return
        setOutUrl(URL.createObjectURL(blob))
        setOutSize((blob.size / 1024).toFixed(1) + ' KB')
      }, 'image/jpeg', 0.92)
    }
    img.src = url
  }

  return (
    <div className="space-y-4">
      <input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
      <p className="text-xs text-gray-500 dark:text-gray-400">Re-encodes the image locally, which strips all EXIF metadata — including GPS location, camera model, and timestamps.</p>
      {outUrl && (
        <div className="space-y-2">
          <p className="text-sm text-green-700 dark:text-green-400">Metadata removed. {origSize} → {outSize}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={outUrl} alt="cleaned output" className="max-w-full border border-gray-200 dark:border-gray-700 rounded-lg" />
          <a href={outUrl} download={name} className="inline-block px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">Download clean image</a>
        </div>
      )}
    </div>
  )
}
