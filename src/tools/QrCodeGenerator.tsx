'use client'

import { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'

export default function QrCodeGenerator() {
  const [input, setInput] = useState('https://example.com')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generate = () => {
    if (canvasRef.current && input) {
      QRCode.toCanvas(canvasRef.current, input, { width: 256, margin: 2 })
    }
  }

  useEffect(() => { generate() }, [])

  const download = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = canvasRef.current.toDataURL()
    link.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          id="qr-input"
          name="qr-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter text or URL..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-wide"
        />
        <button onClick={generate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate</button>
      </div>
      <div className="flex flex-col items-center gap-3">
        <canvas ref={canvasRef} className="border border-gray-200 rounded-lg" />
        <button onClick={download} className="px-4 py-2 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">Download PNG</button>
      </div>
    </div>
  )
}
