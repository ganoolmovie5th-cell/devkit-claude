'use client'

import { useState } from 'react'

function parse(v: string): [number, number, number, string] | null {
  const m = v.trim().replace(/^v/, '').match(/^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?/)
  if (!m) return null
  return [+m[1], +m[2], +m[3], m[4] ?? '']
}

function cmp(a: string, b: string): number {
  const pa = parse(a), pb = parse(b)
  if (!pa || !pb) return NaN
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return (pa[i] as number) - (pb[i] as number)
  if (pa[3] && !pb[3]) return -1
  if (!pa[3] && pb[3]) return 1
  return pa[3].localeCompare(pb[3])
}

export default function SemverCalculator() {
  const [version, setVersion] = useState('1.2.3')
  const [a, setA] = useState('1.2.3')
  const [b, setB] = useState('1.3.0')

  const p = parse(version)
  const bump = (kind: 'major' | 'minor' | 'patch') => {
    if (!p) return '—'
    const [maj, min, pat] = p
    if (kind === 'major') return `${maj + 1}.0.0`
    if (kind === 'minor') return `${maj}.${min + 1}.0`
    return `${maj}.${min}.${pat + 1}`
  }

  const c = cmp(a, b)
  const cmpText = isNaN(c) ? 'invalid version' : c < 0 ? `${a} is older than ${b}` : c > 0 ? `${a} is newer than ${b}` : 'equal'

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Bump version</label>
        <input type="text" value={version} onChange={e => setVersion(e.target.value)} className="w-full px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
        <div className="grid grid-cols-3 gap-2 mt-2">
          {(['major', 'minor', 'patch'] as const).map(k => (
            <div key={k} className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{k}</p>
              <p className="font-mono font-semibold text-blue-600">{bump(k)}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Compare versions</label>
        <div className="flex gap-2 items-center">
          <input type="text" value={a} onChange={e => setA(e.target.value)} className="flex-1 px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
          <span className="text-gray-400">vs</span>
          <input type="text" value={b} onChange={e => setB(e.target.value)} className="flex-1 px-3 py-2 font-mono text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg" />
        </div>
        <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{cmpText}</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Follows semantic versioning (major.minor.patch). Pre-release versions sort before their release.</p>
    </div>
  )
}
