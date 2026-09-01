import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Regex for Developers: From Zero to Pattern Matching Hero | DevKit Blog',
  description: 'A practical regex guide covering character classes, quantifiers, groups, lookaheads, and real-world patterns every developer should know.',
  alternates: { canonical: '/blog/regex-guide-for-developers/' },
  keywords: 'regex tutorial, regular expressions guide, regex for beginners, regex patterns',
}

export default function RegexBlogPost() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">← Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Regex for Developers: From Zero to Pattern Matching Hero</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>August 18, 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <p>Regular expressions are one of those tools that feel impossible until they click — then they become indispensable. This guide takes you from zero regex knowledge to confidently writing patterns for validation, extraction, and text manipulation.</p>

      <h2>Why Regex Matters</h2>

      <p>Every developer eventually needs to:</p>
      <ul>
        <li>Validate email addresses, phone numbers, or URLs</li>
        <li>Extract data from logs, HTML, or unstructured text</li>
        <li>Find-and-replace with patterns in your IDE</li>
        <li>Parse routing parameters or file paths</li>
        <li>Build input masks for forms</li>
      </ul>

      <p>You could write 50 lines of string manipulation code, or one regex. The regex is also usually faster at runtime because engines are heavily optimized.</p>

      <h2>The Building Blocks</h2>

      <h3>Literal Characters</h3>
      <p>The simplest regex is just text. <code>/hello/</code> matches the string "hello" inside any larger text. Most characters match themselves literally.</p>

      <h3>Character Classes</h3>
      <p>Square brackets define a set of characters to match at one position:</p>
      <ul>
        <li><code>[abc]</code> — matches a, b, or c</li>
        <li><code>[a-z]</code> — matches any lowercase letter</li>
        <li><code>[0-9]</code> — matches any digit</li>
        <li><code>[^abc]</code> — matches anything EXCEPT a, b, or c</li>
      </ul>

      <p>Shorthand classes save typing:</p>
      <ul>
        <li><code>\d</code> = <code>[0-9]</code> (digit)</li>
        <li><code>\w</code> = <code>[a-zA-Z0-9_]</code> (word character)</li>
        <li><code>\s</code> = whitespace (space, tab, newline)</li>
        <li><code>.</code> = any character except newline</li>
      </ul>

      <h3>Quantifiers</h3>
      <p>Quantifiers control how many times a pattern repeats:</p>
      <ul>
        <li><code>*</code> — zero or more times</li>
        <li><code>+</code> — one or more times</li>
        <li><code>?</code> — zero or one time (optional)</li>
        <li><code>{`{3}`}</code> — exactly 3 times</li>
        <li><code>{`{2,5}`}</code> — between 2 and 5 times</li>
      </ul>

      <p>By default quantifiers are greedy — they match as much as possible. Add <code>?</code> after them for lazy matching (as little as possible): <code>.*?</code></p>

      <h3>Anchors</h3>
      <p>Anchors match positions, not characters:</p>
      <ul>
        <li><code>^</code> — start of string (or line with multiline flag)</li>
        <li><code>$</code> — end of string</li>
        <li><code>\b</code> — word boundary (between \w and \W)</li>
      </ul>

      <h2>Groups and Capturing</h2>

      <p>Parentheses create groups that serve two purposes: grouping for quantifiers and capturing matched text.</p>

      <pre><code>{`// Capturing group — extracts the match
const match = "2026-08-18".match(/(\\d{4})-(\\d{2})-(\\d{2})/)
// match[1] = "2026", match[2] = "08", match[3] = "18"

// Named group — more readable
const match2 = "2026-08-18".match(/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/)
// match2.groups.year = "2026"`}</code></pre>

      <p>Non-capturing groups <code>(?:...)</code> group without capturing — useful when you need grouping but do not need the extracted value.</p>

      <h2>Lookahead and Lookbehind</h2>

      <p>These match a position based on what comes before or after, without consuming characters:</p>
      <ul>
        <li><code>(?=abc)</code> — positive lookahead: position followed by "abc"</li>
        <li><code>(?!abc)</code> — negative lookahead: position NOT followed by "abc"</li>
        <li><code>{'(?<=abc)'}</code> — positive lookbehind: position preceded by "abc"</li>
        <li><code>{'(?<!abc)'}</code> — negative lookbehind: position NOT preceded by "abc"</li>
      </ul>

      <p>Example: match a number only if followed by "px": <code>\d+(?=px)</code> matches "16" in "16px" but not in "16em".</p>

      <h2>Real-World Patterns</h2>

      <h3>Email Validation (Simple)</h3>
      <pre><code>{`/^[\\w.-]+@[\\w.-]+\\.\\w{2,}$/`}</code></pre>
      <p>Matches most valid emails. For production, use a library — email spec is surprisingly complex.</p>

      <h3>URL Extraction</h3>
      <pre><code>{'/https?:\\/\\/[^\\\\s<>"{}|\\\\\\\\^`]+/g'}</code></pre>

      <h3>Phone Number (International)</h3>
      <pre><code>{`/^\\+?\\d{1,4}[\\s.-]?\\(?\\d{1,3}\\)?[\\s.-]?\\d{3,4}[\\s.-]?\\d{3,4}$/`}</code></pre>

      <h3>Strong Password Check</h3>
      <pre><code>{`/^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&]).{8,}$/`}</code></pre>
      <p>Requires: uppercase, lowercase, digit, special char, minimum 8 characters.</p>

      <h3>HTML Tag Extraction</h3>
      <pre><code>{`/<(\\w+)[^>]*>(.*?)<\\/\\1>/gs`}</code></pre>
      <p>Captures tag name and content. Note: for complex HTML, use a proper parser — regex cannot handle nested tags reliably.</p>

      <h2>Performance Tips</h2>

      <ul>
        <li><strong>Avoid catastrophic backtracking</strong> — patterns like <code>(a+)+</code> can freeze your program on non-matching input. Use atomic groups or possessive quantifiers when available.</li>
        <li><strong>Be specific over generic</strong> — <code>[a-z]+</code> is faster than <code>.+</code> because the engine has fewer choices to try.</li>
        <li><strong>Anchor when possible</strong> — <code>^pattern$</code> fails fast on non-matches instead of scanning the entire string.</li>
        <li><strong>Compile once, use many</strong> — in loops, create the regex outside the loop body.</li>
      </ul>

      <h2>Testing Your Patterns</h2>

      <p>Never write regex blindly. Always test with:</p>
      <ol>
        <li>Known matching inputs (should all match)</li>
        <li>Known non-matching inputs (should all fail)</li>
        <li>Edge cases (empty string, very long input, special characters)</li>
      </ol>

      <p>Use our <Link href="/tools/regex-tester">Regex Tester</Link> to validate patterns in real-time with match highlighting. For escaping literal strings before inserting them into patterns, use our <Link href="/tools/regex-escape">Regex Escape</Link> tool. And keep our <Link href="/cheatsheets/regex">Regex Cheat Sheet</Link> bookmarked for quick reference.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/regex-tester" className="text-sm text-blue-600 hover:underline">Regex Tester</Link>
          <Link href="/tools/regex-escape" className="text-sm text-blue-600 hover:underline">Regex Escape</Link>
          <Link href="/cheatsheets/regex" className="text-sm text-blue-600 hover:underline">Regex Cheat Sheet</Link>
        </div>
      </div>
    </article>
  )
}
