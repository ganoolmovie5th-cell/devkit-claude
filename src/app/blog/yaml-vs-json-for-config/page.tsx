import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'YAML vs JSON for Config: Which One Should You Use? | DevKit Blog',
  description: 'A practical comparison of YAML and JSON for configuration files. Syntax, comments, whitespace rules, the Norway problem, anchors, and when to pick each.',
  alternates: { canonical: '/blog/yaml-vs-json-for-config/' },
  keywords: 'yaml vs json, yaml config, json config, yaml comments, norway problem, yaml anchors',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">YAML vs JSON for Config: Which One Should You Use?</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>7 min read</span>
        </div>
      </header>

      <p>Pick almost any modern tool and you will hit a configuration file. Kubernetes manifests, GitHub Actions workflows, Docker Compose, ESLint settings — some use YAML, some use JSON, and a few accept both. Choosing between them is less about taste than about who reads the file and how often a human edits it by hand.</p>

      <p>Here is a grounded comparison of the two formats, the traps that bite people, and a simple rule for deciding.</p>

      <h2>The same data in both formats</h2>
      <p>Start with a small server config so the shapes are side by side. First JSON:</p>
      <pre><code>{`{
  "server": {
    "host": "localhost",
    "port": 8080,
    "tls": false
  },
  "features": ["search", "export"]
}`}</code></pre>
      <p>Now the equivalent YAML:</p>
      <pre><code>{`server:
  host: localhost
  port: 8080
  tls: false
features:
  - search
  - export`}</code></pre>
      <p>Same structure, fewer symbols. YAML drops the braces, quotes, and most commas. That reduction is the entire pitch for YAML — and also the root of most of its surprises.</p>

      <h2>Comments</h2>
      <p>This is the biggest everyday difference. JSON has no comments. The spec simply does not include them, so you cannot leave a note next to a tricky setting without a parser that supports a nonstandard extension like JSONC.</p>
      <p>YAML supports comments with a hash:</p>
      <pre><code>{`port: 8080  # fallback port, overridden by PORT env var`}</code></pre>
      <p>For a file a human maintains, comments matter a lot. Being able to explain why a value is set the way it is often saves the next person an hour of guessing.</p>

      <h2>Whitespace sensitivity</h2>
      <p>JSON does not care about indentation. You can minify it to one line and it parses the same. YAML cares deeply. Indentation defines structure, and it must be spaces — tabs are not allowed. Mixing two spaces here and four spaces there, or sneaking in a tab, produces errors that are hard to spot because the file still looks fine to your eye.</p>
      <p>A classic mistake is a misaligned list item:</p>
      <pre><code>{`features:
  - search
   - export   # extra space, now this breaks`}</code></pre>
      <p>In large YAML files, indentation bugs are the number one cause of frustration. JSON trades verbosity for never having to think about this.</p>

      <h2>JSON is a subset of YAML</h2>
      <p>A useful fact: YAML 1.2 is a strict superset of JSON. Any valid JSON document is also valid YAML, which means a YAML parser can read your JSON files directly. This is why many tools accept both without extra code. It also gives you an escape hatch — if a YAML block gets confusing, you can drop into inline JSON-style syntax inside the same file:</p>
      <pre><code>{`features: ["search", "export"]
server: { host: localhost, port: 8080 }`}</code></pre>

      <h2>The Norway problem</h2>
      <p>Here is the trap that catches everyone eventually. YAML tries to be helpful by guessing types. Unquoted words that look like booleans get converted. In YAML 1.1, which many parsers still follow, these all become true or false:</p>
      <pre><code>{`enabled: yes
debug: no
active: on
locked: off`}</code></pre>
      <p>The famous case is country codes. The code for Norway is NO, so this:</p>
      <pre><code>{`countries:
  - NO
  - SE
  - FI`}</code></pre>
      <p>parses the first entry as the boolean false instead of the string NO. The fix is to quote anything you want kept as text:</p>
      <pre><code>{`countries:
  - "NO"
  - "SE"
  - "FI"`}</code></pre>
      <p>Numbers have a related issue. A version string like 1.20 may be read as the number 1.2, dropping the trailing zero. When in doubt, quote. JSON never does this guessing — a string is a string because it has quotes, full stop.</p>

      <h2>Anchors and reuse</h2>
      <p>YAML has a feature JSON lacks: anchors and aliases, which let you define a block once and reference it elsewhere. An anchor is marked with an ampersand, and an alias pulls it back in with an asterisk:</p>
      <pre><code>{`defaults: &defaults
  timeout: 30
  retries: 3

staging:
  <<: *defaults
  host: staging.example.com

production:
  <<: *defaults
  host: example.com`}</code></pre>
      <p>The merge key pulls the shared defaults into each environment. This keeps repeated config DRY, but it also makes files harder to read for newcomers and some parsers disable it for safety. Use it sparingly.</p>

      <h2>When to pick each</h2>
      <p>The deciding question is who touches the file. Choose JSON when a machine produces or consumes it: API request and response bodies, data interchange between services, build artifacts, anything programmatic. Its rigidity is a feature there, and nearly every language parses it natively with no dependency.</p>
      <p>Choose YAML when a human edits it regularly: application config, CI pipeline definitions, infrastructure manifests. Comments and the lighter syntax pay off, and the type-guessing traps are manageable once you know to quote ambiguous values.</p>
      <p>A reasonable default: data on the wire goes in JSON, config a person maintains goes in YAML. When you need to move between them while debugging, convert rather than retype.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/yaml-json" className="text-sm text-blue-600 hover:underline">YAML to JSON</Link>
          <Link href="/tools/json-formatter" className="text-sm text-blue-600 hover:underline">JSON Formatter</Link>
        </div>
      </div>
    </article>
  )
}
