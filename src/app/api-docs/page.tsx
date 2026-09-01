import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'API Documentation — DevKit Pro API',
  description: 'REST API documentation for DevKit Pro. Access all 99 tools programmatically with batch processing and automation.',
  alternates: { canonical: '/api-docs/' },
}

const endpoints = [
  { method: 'POST', path: '/v1/json/format', desc: 'Format and validate JSON', params: '{ "input": "..." }', response: '{ "output": "...", "valid": true }' },
  { method: 'POST', path: '/v1/json/minify', desc: 'Minify JSON', params: '{ "input": "..." }', response: '{ "output": "..." }' },
  { method: 'POST', path: '/v1/encode/base64', desc: 'Base64 encode/decode', params: '{ "input": "...", "action": "encode|decode" }', response: '{ "output": "..." }' },
  { method: 'POST', path: '/v1/encode/url', desc: 'URL encode/decode', params: '{ "input": "...", "action": "encode|decode" }', response: '{ "output": "..." }' },
  { method: 'POST', path: '/v1/hash', desc: 'Generate hashes', params: '{ "input": "...", "algorithms": ["sha256"] }', response: '{ "sha256": "..." }' },
  { method: 'POST', path: '/v1/generate/uuid', desc: 'Generate UUIDs', params: '{ "count": 5 }', response: '{ "uuids": ["..."] }' },
  { method: 'POST', path: '/v1/generate/password', desc: 'Generate passwords', params: '{ "length": 16, "symbols": true }', response: '{ "password": "..." }' },
  { method: 'POST', path: '/v1/convert/yaml-to-json', desc: 'YAML to JSON', params: '{ "input": "..." }', response: '{ "output": "..." }' },
  { method: 'POST', path: '/v1/convert/csv-to-json', desc: 'CSV to JSON', params: '{ "input": "..." }', response: '{ "output": [...] }' },
  { method: 'POST', path: '/v1/minify/css', desc: 'Minify CSS', params: '{ "input": "..." }', response: '{ "output": "...", "savings": "32%" }' },
]

export default function ApiDocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <span className="px-3 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full">Coming with Pro</span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">API Documentation</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Access all DevKit tools programmatically. Automate workflows, batch process data, and integrate into CI/CD pipelines.</p>
      </div>

      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-300"><strong>Base URL:</strong> <code>https://api.devkit.web.id/v1</code></p>
        <p className="text-sm text-blue-700 dark:text-blue-400 mt-1"><strong>Auth:</strong> Bearer token (included with Pro subscription)</p>
        <p className="text-sm text-blue-700 dark:text-blue-400 mt-1"><strong>Rate limit:</strong> 10,000 requests/month (Pro), 100 requests/day (Free trial)</p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Authentication</h2>
        <pre className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm overflow-auto">
{`curl -X POST https://api.devkit.web.id/v1/json/format \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"input": "{\\"name\\":\\"test\\"}"}'`}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Endpoints</h2>
        <div className="space-y-3">
          {endpoints.map((ep, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800">
                <span className="px-2 py-0.5 text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">{ep.method}</span>
                <code className="text-sm font-mono text-gray-900 dark:text-white">{ep.path}</code>
                <span className="text-xs text-gray-400 ml-auto">{ep.desc}</span>
              </div>
              <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Request body:</p>
                  <code className="text-gray-700 dark:text-gray-300">{ep.params}</code>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 mb-1">Response:</p>
                  <code className="text-gray-700 dark:text-gray-300">{ep.response}</code>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Error Responses</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-gray-200 dark:border-gray-700"><th className="py-2 pr-3 text-left text-gray-600 dark:text-gray-400">Code</th><th className="py-2 pr-3 text-left text-gray-600 dark:text-gray-400">Meaning</th></tr></thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="py-2 pr-3 font-mono">400</td><td className="py-2">Invalid input or missing required fields</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="py-2 pr-3 font-mono">401</td><td className="py-2">Missing or invalid API key</td></tr>
              <tr className="border-b border-gray-100 dark:border-gray-800"><td className="py-2 pr-3 font-mono">429</td><td className="py-2">Rate limit exceeded</td></tr>
              <tr><td className="py-2 pr-3 font-mono">500</td><td className="py-2">Internal server error</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <p className="text-gray-600 dark:text-gray-400">API access is included with <Link href="/pro" className="text-blue-600 hover:underline">DevKit Pro</Link>.</p>
        <p className="text-sm text-gray-400 mt-1">Join the waitlist to get notified when the API launches.</p>
      </div>
    </div>
  )
}
