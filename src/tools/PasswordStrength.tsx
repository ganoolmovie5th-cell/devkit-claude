'use client'

import { useState } from 'react'

function analyze(pw: string) {
  const len = pw.length
  const hasLower = /[a-z]/.test(pw)
  const hasUpper = /[A-Z]/.test(pw)
  const hasDigit = /\d/.test(pw)
  const hasSymbol = /[^a-zA-Z0-9]/.test(pw)
  let pool = 0
  if (hasLower) pool += 26
  if (hasUpper) pool += 26
  if (hasDigit) pool += 10
  if (hasSymbol) pool += 33
  const entropy = len ? Math.round(len * Math.log2(pool || 1)) : 0
  const score = entropy < 28 ? 0 : entropy < 36 ? 1 : entropy < 60 ? 2 : entropy < 128 ? 3 : 4
  return { len, hasLower, hasUpper, hasDigit, hasSymbol, entropy, score }
}

const LABELS = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong']
const COLORS = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-600']

export default function PasswordStrength() {
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const a = analyze(pw)

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type={show ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)} placeholder="Type a password to test..." autoComplete="off" className="flex-1 px-3 py-2 font-mono border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button onClick={() => setShow(s => !s)} className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400">{show ? 'Hide' : 'Show'}</button>
      </div>
      {pw && (
        <>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i <= a.score ? COLORS[a.score] : 'bg-gray-200 dark:bg-gray-700'}`} />
            ))}
          </div>
          <p className="text-sm font-medium">{LABELS[a.score]} · ~{a.entropy} bits of entropy · {a.len} chars</p>
          <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
            <li>{a.len >= 12 ? '✓' : '✗'} At least 12 characters</li>
            <li>{a.hasLower && a.hasUpper ? '✓' : '✗'} Upper and lower case</li>
            <li>{a.hasDigit ? '✓' : '✗'} Contains a number</li>
            <li>{a.hasSymbol ? '✓' : '✗'} Contains a symbol</li>
          </ul>
        </>
      )}
      <p className="text-xs text-gray-500 dark:text-gray-400">Checked entirely in your browser — the password is never sent anywhere. Entropy is an estimate based on character variety and length.</p>
    </div>
  )
}
