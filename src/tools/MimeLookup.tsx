'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

const MIME: Record<string, string> = {
  html: 'text/html', htm: 'text/html', css: 'text/css', js: 'text/javascript', mjs: 'text/javascript',
  json: 'application/json', xml: 'application/xml', txt: 'text/plain', csv: 'text/csv', md: 'text/markdown',
  pdf: 'application/pdf', zip: 'application/zip', gz: 'application/gzip', tar: 'application/x-tar',
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp',
  svg: 'image/svg+xml', ico: 'image/x-icon', bmp: 'image/bmp', avif: 'image/avif',
  mp3: 'audio/mpeg', wav: 'audio/wav', ogg: 'audio/ogg', mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime',
  woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf', otf: 'font/otf',
  doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  wasm: 'application/wasm', bin: 'application/octet-stream',
}

export default function MimeLookup() {
  const [q, setQ] = useState('')
  const query = q.trim().toLowerCase().replace(/^\./, '').replace(/^.*\./, '')

  const byExt = MIME[query]
  const matches = Object.entries(MIME).filter(([ext, mime]) =>
    q.trim() !== '' && (ext.includes(query) || mime.includes(q.trim().toLowerCase()))
  ).slice(0, 20)

  return (
    <div className="space-y-4">
      <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Enter a file extension (png) or search a MIME type (image)..." className="w-full px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {byExt && (
        <div className="relative p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-lg">
          <p className="text-sm">Content-Type for <span className="font-mono font-semibold">.{query}</span> → <span className="font-mono font-semibold text-blue-700 dark:text-blue-300">{byExt}</span></p>
          <div className="absolute top-2 right-2"><CopyButton text={byExt} /></div>
        </div>
      )}
      {matches.length > 0 && (
        <table className="w-full text-sm font-mono">
          <thead><tr className="border-b border-gray-200 dark:border-gray-700 text-left text-gray-500 dark:text-gray-400"><th className="py-1.5">Extension</th><th className="py-1.5">MIME type</th></tr></thead>
          <tbody>
            {matches.map(([ext, mime]) => (
              <tr key={ext} className="border-b border-gray-100 dark:border-gray-800"><td className="py-1.5">.{ext}</td><td className="py-1.5">{mime}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
