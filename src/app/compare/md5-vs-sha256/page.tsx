import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'MD5 vs SHA-256 — Hash Algorithm Comparison | DevKit',
  description: 'Compare MD5 and SHA-256 hashing: security, speed, output length, and when to use each algorithm.',
  alternates: { canonical: '/compare/md5-vs-sha256/' },
  keywords: 'md5 vs sha256, hash comparison, md5 sha256 difference',
}

export default function Md5VsSha256() {
  return (
    <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert max-w-none">
      <h1>MD5 vs SHA-256</h1>
      <p className="lead">Both produce fixed-length digests from arbitrary input, but their security profiles differ dramatically.</p>

      <div className="overflow-x-auto not-prose">
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr><th className="p-3 text-left">Property</th><th className="p-3 text-left">MD5</th><th className="p-3 text-left">SHA-256</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="p-3 font-medium">Output length</td><td className="p-3">128 bits (32 hex chars)</td><td className="p-3">256 bits (64 hex chars)</td></tr>
            <tr><td className="p-3 font-medium">Speed</td><td className="p-3">Very fast</td><td className="p-3">Fast (slightly slower)</td></tr>
            <tr><td className="p-3 font-medium">Collision resistance</td><td className="p-3 text-red-500">Broken (collisions found in 2004)</td><td className="p-3 text-green-600">Secure (no known collisions)</td></tr>
            <tr><td className="p-3 font-medium">Pre-image resistance</td><td className="p-3">Weakened</td><td className="p-3">Strong</td></tr>
            <tr><td className="p-3 font-medium">Year introduced</td><td className="p-3">1992</td><td className="p-3">2001</td></tr>
            <tr><td className="p-3 font-medium">Use for passwords</td><td className="p-3 text-red-500">Never</td><td className="p-3 text-yellow-600">Not ideal (use bcrypt/argon2)</td></tr>
            <tr><td className="p-3 font-medium">Use for integrity</td><td className="p-3 text-yellow-600">Legacy only</td><td className="p-3 text-green-600">Recommended</td></tr>
          </tbody>
        </table>
      </div>

      <h2>When MD5 is still acceptable</h2>
      <ul>
        <li>Non-security checksums (cache busting, deduplication)</li>
        <li>Legacy systems that require it</li>
        <li>Quick file comparison (not adversarial)</li>
      </ul>

      <h2>When to use SHA-256</h2>
      <ul>
        <li>Any security-sensitive hashing</li>
        <li>Digital signatures and certificates</li>
        <li>Blockchain and cryptocurrency</li>
        <li>File integrity verification</li>
        <li>HMAC for API authentication</li>
      </ul>

      <h2>Bottom line</h2>
      <p>Default to <strong>SHA-256</strong> for everything. Only use MD5 when backward compatibility demands it and security is not a concern. Generate both with our <Link href="/tools/hash-generator" className="text-blue-600">Hash Generator</Link>.</p>
    </div>
  )
}
