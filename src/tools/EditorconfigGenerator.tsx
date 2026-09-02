'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function EditorconfigGenerator() {
  const [indentStyle, setIndentStyle] = useState<'space' | 'tab'>('space')
  const [indentSize, setIndentSize] = useState(2)
  const [eol, setEol] = useState<'lf' | 'crlf'>('lf')
  const [charset, setCharset] = useState('utf-8')
  const [trimWs, setTrimWs] = useState(true)
  const [finalNl, setFinalNl] = useState(true)

  const out = `root = true

[*]
indent_style = ${indentStyle}
indent_size = ${indentSize}
end_of_line = ${eol}
charset = ${charset}
trim_trailing_whitespace = ${trimWs}
insert_final_newline = ${finalNl}

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab`

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300">
        <label className="flex flex-col gap-1">Indent style
          <select value={indentStyle} onChange={e => setIndentStyle(e.target.value as 'space' | 'tab')} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded"><option value="space">space</option><option value="tab">tab</option></select>
        </label>
        <label className="flex flex-col gap-1">Indent size<input type="number" min={1} max={8} value={indentSize} onChange={e => setIndentSize(Number(e.target.value))} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded" /></label>
        <label className="flex flex-col gap-1">End of line
          <select value={eol} onChange={e => setEol(e.target.value as 'lf' | 'crlf')} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded"><option value="lf">lf</option><option value="crlf">crlf</option></select>
        </label>
        <label className="flex flex-col gap-1">Charset
          <select value={charset} onChange={e => setCharset(e.target.value)} className="px-2 py-1 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded"><option>utf-8</option><option>latin1</option><option>utf-16le</option></select>
        </label>
        <label className="flex items-center gap-1.5 mt-5"><input type="checkbox" checked={trimWs} onChange={e => setTrimWs(e.target.checked)} /> Trim whitespace</label>
        <label className="flex items-center gap-1.5 mt-5"><input type="checkbox" checked={finalNl} onChange={e => setFinalNl(e.target.checked)} /> Final newline</label>
      </div>
      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto font-mono text-sm whitespace-pre-wrap">{out}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={out} /></div>
      </div>
    </div>
  )
}
