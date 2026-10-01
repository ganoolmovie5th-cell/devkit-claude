import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Regex Cheatsheet: Common Patterns Every Developer Reuses | DevKit Blog',
  description: 'A practical regex cheatsheet with tested patterns for email, URLs, dates, phone numbers, and whitespace, plus char classes, quantifiers, anchors, and backtracking.',
  alternates: { canonical: '/blog/regex-cheatsheet-common-patterns/' },
  keywords: 'regex cheatsheet, common regex patterns, email regex, url regex, regex quantifiers, catastrophic backtracking',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Regex Cheatsheet: Common Patterns Every Developer Reuses</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <p>Most developers do not write regular expressions from scratch every day. They reach for the same handful of patterns, tweak them, and move on. The trouble is that half-remembered patterns tend to be subtly wrong, and a wrong pattern that mostly works is worse than no pattern at all.</p>

      <p>This cheatsheet collects the patterns people actually reuse, explains the building blocks underneath them, and points out the places where regex quietly bites back.</p>

      <h2>The building blocks</h2>

      <h3>Character classes</h3>
      <p>A character class matches one character from a set. The square brackets define the set:</p>
      <pre><code>{`[abc]      one of a, b, or c
[a-z]      any lowercase letter
[0-9]      any digit
[^0-9]     any character that is NOT a digit`}</code></pre>
      <p>Shorthand classes save typing: <code>\d</code> matches a digit, <code>\w</code> matches a word character (letters, digits, underscore), and <code>\s</code> matches whitespace. Their uppercase versions negate: <code>\D</code>, <code>\W</code>, and <code>\S</code>.</p>

      <h3>Quantifiers</h3>
      <p>Quantifiers say how many times the preceding token repeats:</p>
      <pre><code>{`*       zero or more
+       one or more
?       zero or one (optional)
{3}     exactly 3
{2,5}   between 2 and 5
{2,}    2 or more`}</code></pre>
      <p>By default quantifiers are greedy, meaning they grab as much as possible. Adding <code>?</code> makes them lazy, so <code>.*?</code> matches as little as it can. That difference matters a lot when parsing tags or quoted strings.</p>

      <h3>Anchors</h3>
      <p>Anchors match a position, not a character. <code>^</code> matches the start of the input, <code>$</code> matches the end, and <code>\b</code> matches a word boundary. Without anchors, a pattern can match in the middle of a longer string, which is a frequent source of validation bugs.</p>

      <h3>Groups</h3>
      <p>Parentheses create a capturing group you can reference later. If you only need grouping without capture, use <code>(?:...)</code>. Named groups like <code>(?P&lt;year&gt;\d{`{4}`})</code> make extracted values readable.</p>

      <h2>Patterns you will reuse</h2>

      <h3>Email (practical, not perfect)</h3>
      <pre><code>{`^[\\w.+-]+@[\\w-]+\\.[\\w.-]+$`}</code></pre>
      <p>Fully RFC-compliant email validation is almost impossible with a single regex, and you gain little by chasing it. A loose pattern plus a confirmation email is the realistic approach. This pattern accepts the vast majority of real addresses and rejects obvious garbage.</p>

      <h3>URL</h3>
      <pre><code>{`^https?://[\\w.-]+(?:\\.[a-z]{2,})(?:/[^\\s]*)?$`}</code></pre>
      <p>This matches an http or https address with a hostname, a top-level domain of at least two letters, and an optional path. For anything beyond basic validation, use your language URL parser instead.</p>

      <h3>ISO date (YYYY-MM-DD)</h3>
      <pre><code>{`^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$`}</code></pre>
      <p>Note that regex can constrain the shape of a date but not its real validity. This pattern happily accepts 2026-02-31. Range and calendar checks belong in code.</p>

      <h3>Phone number (loose, international-friendly)</h3>
      <pre><code>{`^\\+?[\\d\\s().-]{7,}$`}</code></pre>
      <p>Phone formats vary wildly across countries, so strict patterns reject real numbers. A loose pattern that checks for a plausible length and allowed characters is usually the right call, with normalization handled afterward.</p>

      <h3>Collapsing whitespace</h3>
      <pre><code>{`\\s+`}</code></pre>
      <p>Replace every match with a single space to collapse runs of spaces, tabs, and newlines. Combine it with a trim to tidy up messy user input.</p>

      <h2>Dialects differ</h2>
      <p>Regex is not one language. JavaScript, PCRE (PHP and many tools), Python, and the POSIX engines each support slightly different features. Lookbehind, named groups, and Unicode property escapes are not available everywhere. A pattern that works in Python may fail in an older JavaScript engine, so test in the environment that will actually run it.</p>

      <h2>Catastrophic backtracking</h2>
      <p>Some patterns are a performance trap. When a regex contains nested quantifiers that can match the same text in many ways, the engine may try an exponential number of combinations before giving up. A classic example is a pattern like <code>(a+)+$</code> run against a long string of a characters followed by one that fails. On a short input it is instant; on a longer one it can hang for seconds or minutes.</p>
      <p>The fix is to avoid overlapping quantifiers, prefer specific character classes over <code>.*</code>, and anchor patterns so the engine has fewer paths to explore. If a pattern feels slow on real data, that slowness is a warning, not noise.</p>

      <h2>A sane workflow</h2>
      <p>Build regex incrementally. Start with the smallest piece, confirm it matches, then add the next part. Test against both strings that should match and strings that should not, because false positives are the silent failures. Escape any literal characters that carry special meaning, since a stray dot or question mark changes behavior.</p>
      <p>You can draft and verify patterns against sample input with the <Link href="/tools/regex-tester">Regex Tester</Link>, and when you need to treat user input as literal text rather than a pattern, the <Link href="/tools/regex-escape">Regex Escape</Link> tool handles the escaping for you.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/regex-tester" className="text-sm text-blue-600 hover:underline">Regex Tester</Link>
          <Link href="/tools/regex-escape" className="text-sm text-blue-600 hover:underline">Regex Escape</Link>
        </div>
      </div>
    </article>
  )
}
