'use client'

import { useState, useEffect } from 'react'

export default function WebauthnTester() {
  const [support, setSupport] = useState<Record<string, boolean> | null>(null)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const pk = typeof window !== 'undefined' && !!window.PublicKeyCredential
    setSupport({
      'PublicKeyCredential API': pk,
      'Platform authenticator': pk,
      'Conditional mediation': pk && 'isConditionalMediationAvailable' in PublicKeyCredential,
    })
    if (pk && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(v =>
        setSupport(s => ({ ...s!, 'Platform authenticator': v }))
      )
    }
  }, [])

  const test = async () => {
    setError(''); setResult('')
    try {
      const cred = await navigator.credentials.create({
        publicKey: {
          challenge: crypto.getRandomValues(new Uint8Array(32)),
          rp: { name: 'DevKit WebAuthn Test' },
          user: { id: crypto.getRandomValues(new Uint8Array(16)), name: 'test@devkit', displayName: 'Test User' },
          pubKeyCredParams: [{ type: 'public-key', alg: -7 }, { type: 'public-key', alg: -257 }],
          timeout: 60000,
          authenticatorSelection: { userVerification: 'preferred' },
        },
      }) as PublicKeyCredential | null
      if (cred) setResult(`Success. Credential ID: ${cred.id}\nType: ${cred.type}`)
    } catch (e) { setError((e as Error).message) }
  }

  return (
    <div className="space-y-4">
      {support && (
        <ul className="space-y-1.5 text-sm">
          {Object.entries(support).map(([k, v]) => (
            <li key={k} className={v ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>{v ? '✓' : '✗'} {k}</li>
          ))}
        </ul>
      )}
      <button onClick={test} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Run registration test</button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {result && <pre className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 rounded-lg text-sm whitespace-pre-wrap font-mono break-all">{result}</pre>}
      <p className="text-xs text-gray-500 dark:text-gray-400">Checks WebAuthn support and runs a real credential-creation ceremony against your device authenticator (Touch ID, security key). Nothing is stored or sent.</p>
    </div>
  )
}
