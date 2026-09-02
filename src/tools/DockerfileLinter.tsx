'use client'

import { useState } from 'react'

interface Issue { line: number; level: 'warn' | 'info'; msg: string }

function lint(text: string): Issue[] {
  const lines = text.split('\n')
  const issues: Issue[] = []
  let hasUser = false, hasHealthcheck = false, fromLatest = false
  lines.forEach((raw, i) => {
    const line = raw.trim()
    const n = i + 1
    const up = line.toUpperCase()
    if (up.startsWith('FROM') && /:latest\b/.test(line)) fromLatest = true
    if (up.startsWith('FROM') && !line.includes(':')) issues.push({ line: n, level: 'warn', msg: 'FROM without a tag defaults to :latest — pin a version.' })
    if (up.startsWith('USER')) hasUser = true
    if (up.startsWith('HEALTHCHECK')) hasHealthcheck = true
    if (up.startsWith('RUN') && /\bapt-get install\b/.test(line) && !/--no-install-recommends/.test(line)) issues.push({ line: n, level: 'info', msg: 'apt-get install without --no-install-recommends bloats the image.' })
    if (up.startsWith('RUN') && /\bapt-get update\b/.test(line) && !/&&/.test(line)) issues.push({ line: n, level: 'warn', msg: 'Combine apt-get update with install in one RUN to avoid stale cache layers.' })
    if (up.startsWith('ADD') && !/^ADD\s+https?:/i.test(line)) issues.push({ line: n, level: 'info', msg: 'Prefer COPY over ADD unless you need URL/tar extraction.' })
    if (/\bsudo\b/.test(line)) issues.push({ line: n, level: 'warn', msg: 'Avoid sudo inside a Dockerfile.' })
  })
  if (fromLatest) issues.push({ line: 0, level: 'warn', msg: 'Using :latest tag — pin an explicit version for reproducible builds.' })
  if (!hasUser && text.trim()) issues.push({ line: 0, level: 'warn', msg: 'No USER instruction — container runs as root. Add a non-root USER.' })
  if (!hasHealthcheck && text.trim()) issues.push({ line: 0, level: 'info', msg: 'No HEALTHCHECK defined.' })
  return issues
}

export default function DockerfileLinter() {
  const [input, setInput] = useState('')
  const issues = input.trim() ? lint(input) : []

  return (
    <div className="space-y-4">
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your Dockerfile..." className="w-full h-40 p-3 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      {input.trim() && issues.length === 0 && <p className="text-sm text-green-600">No issues found.</p>}
      {issues.length > 0 && (
        <ul className="space-y-1.5">
          {issues.map((iss, i) => (
            <li key={i} className={`text-sm flex gap-2 ${iss.level === 'warn' ? 'text-amber-700 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'}`}>
              <span>{iss.level === 'warn' ? '⚠' : 'ℹ'}</span>
              <span>{iss.line > 0 && <span className="font-mono">L{iss.line}: </span>}{iss.msg}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Checks common Dockerfile best practices (pinned tags, non-root user, layer hygiene). Not a substitute for hadolint in CI.</p>
    </div>
  )
}
