import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Base64 vs URL Encoding — What\'s the Difference? | DevKit',
  description: 'Compare Base64 encoding and URL encoding: purpose, output format, size overhead, and when to use each.',
  alternates: { canonical: '/compare/base64-vs-url-encoding/' },
  keywords: 'base64 vs url encoding, percent encoding vs base64, encoding comparison',
}

export default function Base64VsUrl() {
  return (
    <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert max-w-none">
      <h1>Base64 vs URL Encoding</h1>
      <p className="lead">Both transform data for safe transport, but they solve different problems.</p>

      <div className="overflow-x-auto not-prose">
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr><th className="p-3 text-left">Aspect</th><th className="p-3 text-left">Base64</th><th className="p-3 text-left">URL Encoding</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="p-3 font-medium">Purpose</td><td className="p-3">Encode binary data as ASCII text</td><td className="p-3">Encode special URL characters as safe sequences</td></tr>
            <tr><td className="p-3 font-medium">Input</td><td className="p-3">Any binary data (images, files, text)</td><td className="p-3">Text with special characters</td></tr>
            <tr><td className="p-3 font-medium">Output characters</td><td className="p-3">A-Z, a-z, 0-9, +, /, = (64 chars)</td><td className="p-3">Original safe chars + %XX hex sequences</td></tr>
            <tr><td className="p-3 font-medium">Size overhead</td><td className="p-3">~33% larger (always)</td><td className="p-3">Varies (only special chars expand 3x)</td></tr>
            <tr><td className="p-3 font-medium">Reversible</td><td className="p-3">Yes (decode to original bytes)</td><td className="p-3">Yes (decode to original string)</td></tr>
            <tr><td className="p-3 font-medium">Space handling</td><td className="p-3">Encoded in output stream</td><td className="p-3">Becomes %20 (or + in form data)</td></tr>
            <tr><td className="p-3 font-medium">Human readable</td><td className="p-3">No</td><td className="p-3">Partially (unencoded chars visible)</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Example</h2>
      <div className="not-prose space-y-2 text-sm">
        <p className="text-gray-600 dark:text-gray-400">Original: <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">Hello World! @2024</code></p>
        <p className="text-gray-600 dark:text-gray-400">Base64: <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">SGVsbG8gV29ybGQhIEAyMDI0</code></p>
        <p className="text-gray-600 dark:text-gray-400">URL encoded: <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">Hello%20World%21%20%402024</code></p>
      </div>

      <h2>When to use Base64</h2>
      <ul>
        <li>Embedding images in HTML/CSS (data URIs)</li>
        <li>Sending binary files in JSON payloads</li>
        <li>Email attachments (MIME encoding)</li>
        <li>Storing binary data in text-only fields</li>
      </ul>

      <h2>When to use URL Encoding</h2>
      <ul>
        <li>Query parameters in URLs</li>
        <li>Form data submission (application/x-www-form-urlencoded)</li>
        <li>Cookie values with special characters</li>
        <li>Any text going into a URL component</li>
      </ul>

      <h2>Bottom line</h2>
      <p><strong>Base64</strong> = binary-to-text for embedding. <strong>URL encoding</strong> = making text URL-safe. Try both: <Link href="/tools/base64-encode-decode" className="text-blue-600">Base64 Tool</Link> | <Link href="/tools/url-encode-decode" className="text-blue-600">URL Encode Tool</Link>.</p>
    </div>
  )
}
