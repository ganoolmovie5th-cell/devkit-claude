import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — Developer Tutorials & Guides | DevKit',
  description: 'In-depth tutorials on JSON handling, regex patterns, web security, and developer productivity.',
  alternates: { canonical: '/blog/' },
}

const posts = [
  { slug: 'understanding-unix-file-permissions', title: 'Understanding Unix File Permissions: rwx, Octal, and umask', date: '2026-09-10', readTime: '7 min', excerpt: 'Read ls -l output with confidence: rwx for user, group, and other, octal notation, common modes like 644 and 755, umask, and why 777 is a mistake.' },
  { slug: 'bcrypt-vs-sha256-for-passwords', title: 'bcrypt vs SHA-256 for Passwords: Why Fast Hashing Is Wrong', date: '2026-09-10', readTime: '8 min', excerpt: 'Why SHA-256 is the wrong choice for passwords, how bcrypt uses salting and a cost factor to stay slow, the 72-byte limit, and when to reach for argon2.' },
  { slug: 'uuid-vs-auto-increment-ids', title: 'UUID vs Auto-Increment IDs: Choosing a Primary Key', date: '2026-09-09', readTime: '8 min', excerpt: 'Compare UUIDs and auto-increment integers: distributed uniqueness, enumeration security, index performance, storage size, and when each one fits.' },
  { slug: 'regex-cheatsheet-common-patterns', title: 'Regex Cheatsheet: Common Patterns Every Developer Reuses', date: '2026-09-09', readTime: '8 min', excerpt: 'Tested regex patterns for email, URLs, dates, phone numbers, and whitespace, plus the char classes, quantifiers, anchors, and backtracking behind them.' },
  { slug: 'css-flexbox-complete-guide', title: 'CSS Flexbox Complete Guide', date: '2026-09-08', readTime: '8 min', excerpt: 'Flexbox from the ground up: main vs cross axis, justify-content, align-items, flex-grow, shrink, basis, wrapping, and real layout examples.' },
  { slug: 'how-css-gradients-work', title: 'How CSS Gradients Work', date: '2026-09-08', readTime: '8 min', excerpt: 'Linear, radial, and conic gradients explained: color stops, angles, multi-stop blends, transparency, and practical UI backgrounds.' },
  { slug: 'mastering-css-box-shadow', title: 'Mastering CSS Box Shadow', date: '2026-09-07', readTime: '8 min', excerpt: 'Offset, blur, and spread syntax, inset shadows, stacking multiple shadows into realistic depth, elevation systems, and the drop-shadow filter.' },
  { slug: 'favicon-sizes-and-formats-explained', title: 'Favicon Sizes and Formats Explained', date: '2026-09-07', readTime: '8 min', excerpt: 'Why a modern site needs several favicon sizes, how ICO, PNG, and SVG differ, what apple-touch-icon and the web manifest do, plus a practical setup.' },
  { slug: 'yaml-vs-json-for-config', title: 'YAML vs JSON for Config: Which One Should You Use?', date: '2026-09-06', readTime: '7 min', excerpt: 'Syntax, comments, whitespace sensitivity, the Norway problem, and anchors, with a clear rule for when to use each format.' },
  { slug: 'cron-scheduling-explained', title: 'Cron Scheduling Explained: Reading and Writing Cron Expressions', date: '2026-09-06', readTime: '7 min', excerpt: 'The five-field anatomy, step and range syntax, the day-of-month vs day-of-week trap, timezones, and the common expressions you will reuse.' },
  { slug: 'http-status-codes-guide', title: 'HTTP Status Codes Guide: What Each Code Really Means', date: '2026-09-05', readTime: '8 min', excerpt: 'The five classes and the codes that matter, including 301 vs 302, 401 vs 403, and 422, with guidance on which to return when.' },
  { slug: 'common-csv-parsing-pitfalls', title: 'Common CSV Parsing Pitfalls and How to Avoid Them', date: '2026-09-05', readTime: '8 min', excerpt: 'Quoting commas and newlines, CRLF line endings, locale delimiters, encoding and BOM, and the lost-leading-zero problem in spreadsheets.' },
  { slug: 'jwt-tokens-explained', title: 'JWT Tokens Explained: Decode, Validate, and Debug', date: '2026-08-19', readTime: '8 min', excerpt: 'Understand JSON Web Tokens from structure to security. Decode, check expiry, spot mistakes, and debug authentication.' },
  { slug: 'docker-compose-beginners-guide', title: 'Docker Compose for Beginners: From docker run to YAML', date: '2026-08-19', readTime: '7 min', excerpt: 'Convert messy docker run commands into clean, version-controlled docker-compose.yml files.' },
  { slug: 'css-generators-every-developer-needs', title: '5 CSS Generators Every Frontend Developer Needs', date: '2026-08-19', readTime: '5 min', excerpt: 'Stop guessing CSS values. Use visual generators for shadows, gradients, flexbox, and more.' },
  { slug: 'mastering-json-formatting', title: 'Mastering JSON: Format, Validate, and Debug Like a Pro', date: '2026-08-18', readTime: '6 min', excerpt: 'Learn how to work with JSON effectively — from formatting messy API responses to catching subtle validation errors that break your applications.' },
  { slug: 'regex-guide-for-developers', title: 'Regex for Developers: From Zero to Pattern Matching Hero', date: '2026-08-18', readTime: '8 min', excerpt: 'A practical guide to regular expressions covering character classes, quantifiers, lookaheads, and real-world patterns you will actually use.' },
  { slug: 'web-security-encoding-guide', title: 'Web Security Encoding: Base64, URL, HTML Entities Explained', date: '2026-08-18', readTime: '7 min', excerpt: 'Understand when and why to encode data for the web — preventing XSS, handling URLs safely, and embedding binary content in text formats.' },
]

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Blog</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">In-depth tutorials and guides for developers.</p>

      <div className="space-y-6">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
              <time>{post.date}</time>
              <span>{post.readTime} read</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
