'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function FileToBase64() {
  const [dataUri, setDataUri] = useState('')
  const [raw, setRaw] = useState('')
  const [info, setInfo] = useState('')

  const onFile = (f: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const uri = reader.result as string
      setDataUri(uri)
      setRaw(uri.split(',')[1] ?? '')
      setInfo(`${f.name} · ${f.type || 'unknown'} · ${(f.size / 1024).toFixed(1)} KB`)
    }
    reader.readAsDataURL(f)
  }

  return (
    <div className="space-y-4">
      <input type="file" onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700" />
      {info && <p className="text-xs text-gray-500 dark:text-gray-400">{info}</p>}
      {dataUri && (
        <>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Data URI</p>
            <div className="relative">
              <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-40 whitespace-pre-wrap font-mono text-xs break-all">{dataUri}</pre>
              <div className="absolute top-2 right-2"><CopyButton text={dataUri} /></div>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Base64 (raw)</p>
            <div className="relative">
              <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-40 whitespace-pre-wrap font-mono text-xs break-all">{raw}</pre>
              <div className="absolute top-2 right-2"><CopyButton text={raw} /></div>
            </div>
          </div>
        </>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Works with any file type. Encoding happens locally — the file is never uploaded.</p>
    </div>
  )
}
