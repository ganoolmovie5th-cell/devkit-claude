import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Web Security Encoding: Base64, URL, HTML Entities Explained | DevKit Blog',
  description: 'Understand when and why to encode data for the web — preventing XSS, handling URLs safely, and embedding binary content in text formats.',
  alternates: { canonical: '/blog/web-security-encoding-guide/' },
  keywords: 'web encoding, base64 explained, url encoding, html entities, xss prevention',
}

export default function EncodingBlogPost() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">← Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Web Security Encoding: Base64, URL, HTML Entities Explained</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>August 18, 2026</time>
          <span>7 min read</span>
        </div>
      </header>

      <p>Encoding is one of the most misunderstood concepts in web development. Developers often confuse encoding with encryption, use the wrong encoding for a given context, or skip it entirely — creating security vulnerabilities like XSS (Cross-Site Scripting) in the process.</p>

      <p>This guide clarifies what encoding is, when each type applies, and how it prevents common security issues.</p>

      <h2>Encoding is Not Encryption</h2>

      <p>This distinction is critical:</p>
      <ul>
        <li><strong>Encoding</strong> transforms data into a different format for safe transport. It is reversible and has no secret key. Anyone can decode it.</li>
        <li><strong>Encryption</strong> transforms data so only someone with the key can read it. It is designed to be secret.</li>
      </ul>

      <p>Base64 is encoding, not encryption. Never use Base64 to "hide" passwords or sensitive data — it provides zero security.</p>

      <h2>URL Encoding (Percent Encoding)</h2>

      <h3>Why it exists</h3>
      <p>URLs have reserved characters with special meaning: <code>?</code> starts query strings, <code>&</code> separates parameters, <code>#</code> marks fragments, <code>/</code> separates path segments. If your data contains these characters, the URL breaks.</p>

      <h3>How it works</h3>
      <p>Each unsafe character is replaced with <code>%XX</code> where XX is the hexadecimal ASCII value. Space becomes <code>%20</code>, <code>&</code> becomes <code>%26</code>, <code>=</code> becomes <code>%3D</code>.</p>

      <h3>When to use</h3>
      <ul>
        <li>Query parameter values: <code>?search={`encodeURIComponent(userInput)`}</code></li>
        <li>Path segments containing user data</li>
        <li>Cookie values with special characters</li>
        <li>Form data in application/x-www-form-urlencoded</li>
      </ul>

      <h3>Security implication</h3>
      <p>Without URL encoding, attackers can inject additional parameters. If <code>redirect=http://evil.com&admin=true</code> is not encoded, the <code>&admin=true</code> becomes a separate parameter. URL encoding prevents parameter injection.</p>

      <h2>HTML Entity Encoding</h2>

      <h3>Why it exists</h3>
      <p>HTML uses <code>&lt;</code> and <code>&gt;</code> to define tags. If user-supplied text contains these characters and is rendered without encoding, the browser interprets them as HTML — enabling XSS attacks.</p>

      <h3>How it works</h3>
      <p>Special HTML characters are replaced with named or numeric entities:</p>
      <ul>
        <li><code>&lt;</code> becomes <code>&amp;lt;</code></li>
        <li><code>&gt;</code> becomes <code>&amp;gt;</code></li>
        <li><code>&amp;</code> becomes <code>&amp;amp;</code></li>
        <li><code>&quot;</code> becomes <code>&amp;quot;</code></li>
        <li><code>&apos;</code> becomes <code>&amp;#39;</code></li>
      </ul>

      <h3>When to use</h3>
      <ul>
        <li>Any time you render user-provided text in HTML</li>
        <li>Inserting dynamic values into HTML attributes</li>
        <li>Displaying code snippets on web pages</li>
      </ul>

      <h3>Security implication</h3>
      <p>This is your primary defense against XSS (Cross-Site Scripting). If a user submits <code>{`<script>alert('xss')</script>`}</code> and you render it without encoding, their script executes in every visitor's browser. With encoding, it displays as harmless text.</p>

      <p>Modern frameworks (React, Vue, Angular) auto-encode by default. The danger is when you bypass this with <code>dangerouslySetInnerHTML</code> or <code>v-html</code>.</p>

      <h2>Base64 Encoding</h2>

      <h3>Why it exists</h3>
      <p>Some transport channels (email, JSON, URLs) only support text characters. Binary data (images, files, encrypted blobs) cannot travel through these channels directly. Base64 converts binary to a text representation using 64 safe ASCII characters.</p>

      <h3>How it works</h3>
      <p>Every 3 bytes of binary data become 4 Base64 characters. The 64-character alphabet is A-Z, a-z, 0-9, +, /. Padding (=) fills the final group if needed. This produces ~33% size overhead.</p>

      <h3>When to use</h3>
      <ul>
        <li>Embedding images in CSS/HTML as data URIs: <code>{`background: url(data:image/png;base64,...)`}</code></li>
        <li>Sending binary data in JSON API payloads</li>
        <li>Email attachments (MIME encoding)</li>
        <li>Storing binary in text-only databases or configs</li>
        <li>Basic HTTP authentication header: <code>Authorization: Basic base64(user:pass)</code></li>
      </ul>

      <h3>Security implication</h3>
      <p>Base64 is NOT security. It is trivially reversible. Never use it to hide sensitive data. The HTTP Basic auth example above sends credentials in plain text (Base64 decoded) — only use it over HTTPS.</p>

      <h2>Choosing the Right Encoding</h2>

      <table>
        <thead><tr><th>Context</th><th>Correct Encoding</th></tr></thead>
        <tbody>
          <tr><td>URL query parameter</td><td>URL encoding (encodeURIComponent)</td></tr>
          <tr><td>HTML page content</td><td>HTML entity encoding</td></tr>
          <tr><td>HTML attribute value</td><td>HTML entity + attribute-safe encoding</td></tr>
          <tr><td>JavaScript string literal</td><td>JavaScript escape (\\x, \\u)</td></tr>
          <tr><td>CSS value</td><td>CSS escape (\\HH)</td></tr>
          <tr><td>Binary in JSON</td><td>Base64</td></tr>
          <tr><td>Binary in email</td><td>Base64 (MIME)</td></tr>
        </tbody>
      </table>

      <h2>Common Mistakes</h2>

      <ol>
        <li><strong>Double encoding</strong> — encoding an already-encoded value. Results in <code>%2520</code> instead of <code>%20</code>. Encode once, at the boundary.</li>
        <li><strong>Wrong context encoding</strong> — URL encoding inside HTML, or HTML encoding inside URLs. Each context needs its own encoding.</li>
        <li><strong>Encoding on input instead of output</strong> — store raw data, encode when rendering. This lets you use the same data in different contexts with appropriate encoding each time.</li>
        <li><strong>Trusting client-side encoding alone</strong> — always validate and encode on the server too. Client-side can be bypassed.</li>
      </ol>

      <h2>Summary</h2>

      <p>Encoding is context-dependent data transformation for safe transport. Use URL encoding for URLs, HTML entities for HTML output, and Base64 for binary-to-text conversion. Never confuse encoding with encryption or security. Apply encoding at the output boundary, not the input boundary.</p>

      <p>Practice with our encoding tools:</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/base64-encode-decode" className="text-sm text-blue-600 hover:underline">Base64 Encode/Decode</Link>
          <Link href="/tools/url-encode-decode" className="text-sm text-blue-600 hover:underline">URL Encode/Decode</Link>
          <Link href="/tools/html-entity-encode-decode" className="text-sm text-blue-600 hover:underline">HTML Entity Encode/Decode</Link>
          <Link href="/compare/base64-vs-url-encoding" className="text-sm text-blue-600 hover:underline">Base64 vs URL Encoding</Link>
        </div>
      </div>
    </article>
  )
}
