'use client'

import { useState } from 'react'
import CopyButton from '@/components/CopyButton'

export default function HtaccessGenerator() {
  const [forceHttps, setForceHttps] = useState(true)
  const [wwwMode, setWwwMode] = useState<'none' | 'force-www' | 'force-non-www'>('force-non-www')
  const [gzip, setGzip] = useState(true)
  const [cache, setCache] = useState(true)
  const [blockDotfiles, setBlockDotfiles] = useState(true)
  const [customErr, setCustomErr] = useState(false)

  const build = (): string => {
    const b: string[] = []
    if (forceHttps || wwwMode !== 'none') {
      b.push('RewriteEngine On')
      if (forceHttps) b.push('RewriteCond %{HTTPS} off', 'RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]')
      if (wwwMode === 'force-non-www') b.push('RewriteCond %{HTTP_HOST} ^www\\.(.*)$ [NC]', 'RewriteRule ^(.*)$ https://%1/$1 [L,R=301]')
      if (wwwMode === 'force-www') b.push('RewriteCond %{HTTP_HOST} !^www\\. [NC]', 'RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [L,R=301]')
      b.push('')
    }
    if (gzip) b.push('<IfModule mod_deflate.c>', '  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml', '</IfModule>', '')
    if (cache) b.push('<IfModule mod_expires.c>', '  ExpiresActive On', '  ExpiresByType image/jpg "access plus 1 year"', '  ExpiresByType image/png "access plus 1 year"', '  ExpiresByType text/css "access plus 1 month"', '  ExpiresByType application/javascript "access plus 1 month"', '</IfModule>', '')
    if (blockDotfiles) b.push('<FilesMatch "^\\.">', '  Require all denied', '</FilesMatch>', '')
    if (customErr) b.push('ErrorDocument 404 /404.html', 'ErrorDocument 500 /500.html', '')
    return b.join('\n').trim()
  }

  const output = build()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={forceHttps} onChange={e => setForceHttps(e.target.checked)} /> Force HTTPS</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={gzip} onChange={e => setGzip(e.target.checked)} /> Gzip compression</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={cache} onChange={e => setCache(e.target.checked)} /> Browser caching</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={blockDotfiles} onChange={e => setBlockDotfiles(e.target.checked)} /> Block dotfiles</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={customErr} onChange={e => setCustomErr(e.target.checked)} /> Custom error pages</label>
        <label className="flex items-center gap-1.5">www:
          <select value={wwwMode} onChange={e => setWwwMode(e.target.value as typeof wwwMode)} className="border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded px-1 py-0.5">
            <option value="none">Leave as-is</option>
            <option value="force-non-www">Force non-www</option>
            <option value="force-www">Force www</option>
          </select>
        </label>
      </div>
      <div className="relative">
        <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-auto max-h-96 whitespace-pre-wrap font-mono text-sm">{output}</pre>
        <div className="absolute top-2 right-2"><CopyButton text={output} /></div>
      </div>
    </div>
  )
}
