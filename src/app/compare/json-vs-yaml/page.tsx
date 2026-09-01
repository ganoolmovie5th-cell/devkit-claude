import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'JSON vs YAML — Which Data Format to Use? | DevKit',
  description: 'Compare JSON and YAML formats: syntax, readability, use cases, performance, and when to choose each one.',
  alternates: { canonical: '/compare/json-vs-yaml/' },
  keywords: 'json vs yaml, yaml vs json, data format comparison',
}

export default function JsonVsYaml() {
  return (
    <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert max-w-none">
      <h1>JSON vs YAML</h1>
      <p className="lead">Both serialize structured data, but they optimize for different priorities.</p>

      <div className="overflow-x-auto not-prose">
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr><th className="p-3 text-left">Feature</th><th className="p-3 text-left">JSON</th><th className="p-3 text-left">YAML</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="p-3 font-medium">Readability</td><td className="p-3">Good (curly braces, quotes)</td><td className="p-3">Excellent (indentation-based)</td></tr>
            <tr><td className="p-3 font-medium">Comments</td><td className="p-3">Not supported</td><td className="p-3">Supported (#)</td></tr>
            <tr><td className="p-3 font-medium">Data types</td><td className="p-3">string, number, boolean, null, array, object</td><td className="p-3">All JSON types + dates, multi-line strings, anchors</td></tr>
            <tr><td className="p-3 font-medium">Parsing speed</td><td className="p-3">Fast (simple grammar)</td><td className="p-3">Slower (complex grammar)</td></tr>
            <tr><td className="p-3 font-medium">File size</td><td className="p-3">Larger (quotes, brackets)</td><td className="p-3">Smaller (no quotes needed)</td></tr>
            <tr><td className="p-3 font-medium">Whitespace</td><td className="p-3">Insignificant</td><td className="p-3">Significant (indentation matters)</td></tr>
            <tr><td className="p-3 font-medium">Native web support</td><td className="p-3">Yes (JSON.parse built-in)</td><td className="p-3">No (requires library)</td></tr>
            <tr><td className="p-3 font-medium">Multi-document</td><td className="p-3">No</td><td className="p-3">Yes (--- separator)</td></tr>
          </tbody>
        </table>
      </div>

      <h2>When to use JSON</h2>
      <ul>
        <li>APIs and web services (industry standard)</li>
        <li>JavaScript/TypeScript projects (native support)</li>
        <li>Data interchange between services</li>
        <li>When parsing speed matters</li>
        <li>package.json, tsconfig.json, and other tool configs</li>
      </ul>

      <h2>When to use YAML</h2>
      <ul>
        <li>Configuration files humans edit often (Docker Compose, Kubernetes, GitHub Actions)</li>
        <li>When you need comments in config</li>
        <li>CI/CD pipelines</li>
        <li>Ansible playbooks, Helm charts</li>
        <li>When readability trumps parsing speed</li>
      </ul>

      <h2>Quick syntax comparison</h2>
      <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">JSON</p>
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs overflow-auto">{`{
  "name": "DevKit",
  "version": "1.0.0",
  "features": ["tools", "cheatsheets"],
  "config": {
    "port": 3000,
    "debug": false
  }
}`}</pre>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">YAML</p>
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs overflow-auto">{`# Project config
name: DevKit
version: "1.0.0"
features:
  - tools
  - cheatsheets
config:
  port: 3000
  debug: false`}</pre>
        </div>
      </div>

      <h2>Bottom line</h2>
      <p>Use <strong>JSON</strong> for machine-to-machine data exchange. Use <strong>YAML</strong> for human-edited configuration. Convert between them with our <Link href="/tools/yaml-json" className="text-blue-600">YAML ↔ JSON Converter</Link>.</p>
    </div>
  )
}
