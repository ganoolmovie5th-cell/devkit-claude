import type { ToolArticle } from './index'

export const batch3: Record<string, ToolArticle> = {
  'slug-generator': {
    body: (
      <>
        <h2>Turning a headline into a clean URL slug</h2>
        <p>
          A slug is the human-readable part of a URL that identifies a page,
          like the <code>my-first-post</code> in{' '}
          <code>example.com/blog/my-first-post</code>. A slug generator takes a
          messy title and reduces it to something safe for a URL: lowercase
          letters, digits, and hyphens, with everything else stripped or
          replaced. The goal is a slug that stays readable, survives copy-paste
          into chat apps, and does not need percent-encoding.
        </p>
        <h3>What the conversion does step by step</h3>
        <p>
          The title is lowercased, accented characters are folded to their
          plain ASCII form (so <code>Caf&eacute;</code> becomes{' '}
          <code>cafe</code>), spaces and punctuation collapse into single
          hyphens, and leading or trailing hyphens are trimmed. Diacritic
          stripping matters because a raw <code>&eacute;</code> in a URL turns
          into an ugly <code>%C3%A9</code> sequence that breaks readability and
          sometimes breaks link previews.
        </p>
        <h3>Example</h3>
        <p>Input title:</p>
        <pre><code>{`  10 Café Tips & Tricks for 2024!  `}</code></pre>
        <p>Generated slug:</p>
        <pre><code>{`10-cafe-tips-tricks-for-2024`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Should I keep stop words like &quot;and&quot; or
          &quot;the&quot;?</strong> It is a style choice. Shorter slugs read
          better in search results, but removing words can change meaning. Most
          tools keep them unless you ask to drop them.
        </p>
        <p>
          <strong>What about non-Latin scripts?</strong> Pure transliteration of
          Cyrillic or CJK is lossy and often undesirable. Many teams keep the
          original characters and let the browser encode them, since modern URLs
          handle Unicode fine.
        </p>
        <p>
          <strong>How do I avoid duplicate slugs?</strong> Append a short
          numeric suffix like <code>-2</code> on collision, or prefix with a
          stable ID. Never silently overwrite an existing slug that is already
          indexed. See the <a href="/tools/word-counter">word counter</a> if you
          also need to keep titles within a length budget.
        </p>
      </>
    ),
  },

  'word-counter': {
    body: (
      <>
        <h2>Counting words, characters, and reading time</h2>
        <p>
          A word counter tallies the text you paste: total words, characters
          with and without spaces, sentences, and an estimated reading time. It
          sounds trivial, but the definition of a &quot;word&quot; is where
          tools quietly disagree. Most split on runs of whitespace, so{' '}
          <code>state-of-the-art</code> counts as one word while{' '}
          <code>e mail</code> counts as two. Knowing the rule matters when you
          are hitting a hard limit.
        </p>
        <h3>Where the limits bite</h3>
        <p>
          Character limits are everywhere: a meta description wants roughly 155
          characters, a bio field might cap at 160, and an SMS message splits
          after 160 GSM characters. Word counts drive essay requirements,
          abstract limits, and content briefs. Reading time, usually computed at
          200 to 250 words per minute, helps you label an article honestly.
        </p>
        <h3>Example</h3>
        <p>Input:</p>
        <pre><code>{`The quick brown fox jumps.`}</code></pre>
        <p>Output:</p>
        <pre><code>{`Words: 5
Characters: 26
Characters (no spaces): 22
Sentences: 1
Reading time: < 1 min`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Why does my count differ from my word processor?</strong>
          Processors have their own rules for hyphenation, numbers, and symbols.
          A standalone <code>&amp;</code> or a bare number may or may not count
          as a word depending on the tool.
        </p>
        <p>
          <strong>Do emoji count as characters?</strong> A single emoji can be
          several code units under the hood, so naive length checks overcount.
          A counter that works on Unicode code points gives you one per visible
          glyph in most cases.
        </p>
        <p>
          <strong>Is reading time reliable?</strong> It is an estimate. Dense
          technical prose reads slower than a casual blog post, so treat the
          number as a label, not a promise.
        </p>
      </>
    ),
  },

  'text-case-converter': {
    body: (
      <>
        <h2>Switching between camelCase, snake_case, and friends</h2>
        <p>
          A case converter rewrites a phrase into a naming convention without
          you retyping it. The common targets are <code>camelCase</code>,{' '}
          <code>PascalCase</code>, <code>snake_case</code>,{' '}
          <code>kebab-case</code>, <code>CONSTANT_CASE</code>, and{' '}
          <code>Title Case</code>. Each ecosystem has a preferred style:
          JavaScript variables lean camelCase, Python uses snake_case, CSS
          classes and URL slugs use kebab-case, and environment variables shout
          in CONSTANT_CASE.
        </p>
        <h3>Why it is harder than it looks</h3>
        <p>
          The tricky part is detecting word boundaries in the input. The tool
          has to split on spaces, hyphens, underscores, and the hidden
          boundaries inside <code>camelCase</code> itself. Acronyms are the
          classic edge case: should <code>parseJSON</code> become{' '}
          <code>parse_json</code> or <code>parse_j_s_o_n</code>? Good converters
          treat runs of capitals as a single token.
        </p>
        <h3>Example</h3>
        <p>Input phrase:</p>
        <pre><code>{`user profile image URL`}</code></pre>
        <p>Converted outputs:</p>
        <pre><code>{`camelCase:    userProfileImageUrl
PascalCase:   UserProfileImageUrl
snake_case:   user_profile_image_url
kebab-case:   user-profile-image-url
CONSTANT:     USER_PROFILE_IMAGE_URL`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>What happens to numbers?</strong> Digits usually stay attached
          to the preceding word, so <code>address line 2</code> becomes{' '}
          <code>addressLine2</code>, not <code>addressLine_2</code>.
        </p>
        <p>
          <strong>Can I round-trip safely?</strong> Not always. Converting to
          snake_case and back to camelCase works, but information about original
          capitalization of acronyms can be lost along the way.
        </p>
        <p>
          <strong>Which case for a URL?</strong> Use kebab-case. For a title to
          URL, pair this with the{' '}
          <a href="/tools/slug-generator">slug generator</a> instead, since it
          also strips accents and punctuation.
        </p>
      </>
    ),
  },

  'json-to-typescript': {
    body: (
      <>
        <h2>Generating TypeScript interfaces from JSON</h2>
        <p>
          This tool reads a sample JSON object and emits TypeScript type
          definitions that describe its shape. Instead of hand-writing an
          interface for a 40-field API response, you paste one real payload and
          get <code>interface</code> declarations with inferred field types.
          It is a huge time saver when you are integrating against an API that
          has no published types.
        </p>
        <h3>How inference works</h3>
        <p>
          The generator walks the JSON tree. A string becomes{' '}
          <code>string</code>, a number becomes <code>number</code>, nested
          objects become their own named interfaces, and arrays become{' '}
          <code>T[]</code> based on their first element. The output is only as
          good as the sample: a field that is <code>null</code> in your example
          cannot be inferred, and an array that happens to be empty gives the
          tool nothing to work with.
        </p>
        <h3>Example</h3>
        <p>Input JSON:</p>
        <pre><code>{`{ "id": 7, "name": "Ada", "tags": ["x"], "active": true }`}</code></pre>
        <p>Generated interface:</p>
        <pre><code>{`interface Root {
  id: number;
  name: string;
  tags: string[];
  active: boolean;
}`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>What about optional or nullable fields?</strong> One sample
          cannot tell the difference between &quot;always present&quot; and
          &quot;sometimes missing&quot;. Review the output and mark fields with{' '}
          <code>?</code> or union them with <code>null</code> where your API
          actually allows it.
        </p>
        <p>
          <strong>Does it handle mixed-type arrays?</strong> An array like{' '}
          <code>[1, &quot;a&quot;]</code> ideally becomes{' '}
          <code>(number | string)[]</code>, but simpler tools pick only the
          first element, so check the result.
        </p>
        <p>
          <strong>Can I trust this for runtime safety?</strong> No. Generated
          types describe a shape at compile time only. For validated parsing,
          pair the interface with a schema library and your{' '}
          <a href="/tools/json-formatter">JSON formatter</a> for inspecting the
          raw payload.
        </p>
      </>
    ),
  },

  'yaml-json': {
    body: (
      <>
        <h2>Converting between YAML and JSON</h2>
        <p>
          YAML and JSON describe the same kinds of data: maps, lists, strings,
          numbers, and booleans. JSON is strict and brace-heavy, which machines
          love. YAML is indentation-based and comment-friendly, which humans
          prefer for config files like CI pipelines and Kubernetes manifests. A
          converter lets you move a payload from one world to the other without
          retyping. In fact JSON is a subset of YAML, so any valid JSON is
          already valid YAML.
        </p>
        <h3>The whitespace trap</h3>
        <p>
          YAML is whitespace-sensitive. Indentation defines structure, and tabs
          are forbidden for indentation, so a stray tab or an off-by-one space
          silently changes nesting or throws a parse error. JSON does not care
          about whitespace at all. This is the single most common reason a YAML
          to JSON conversion fails, so the converter should point to the exact
          line.
        </p>
        <h3>Example</h3>
        <p>YAML input:</p>
        <pre><code>{`name: api
ports:
  - 8080
  - 8081
debug: false`}</code></pre>
        <p>JSON output:</p>
        <pre><code>{`{
  "name": "api",
  "ports": [8080, 8081],
  "debug": false
}`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Why did my comments disappear?</strong> JSON has no comment
          syntax, so YAML comments are dropped on the way to JSON and cannot be
          recovered on the way back.
        </p>
        <p>
          <strong>What is the Norway problem?</strong> Unquoted{' '}
          <code>no</code>, <code>yes</code>, <code>on</code>, and <code>off</code>{' '}
          are read as booleans in older YAML. The country code <code>NO</code>{' '}
          can become <code>false</code>. Quote strings that could be mistaken
          for booleans.
        </p>
        <p>
          <strong>Does key order survive?</strong> Mapping order is usually
          preserved both ways, but neither spec guarantees it, so do not rely on
          order for correctness. Use the{' '}
          <a href="/tools/json-formatter">JSON formatter</a> to tidy the result.
        </p>
      </>
    ),
  },

  'csv-to-json': {
    body: (
      <>
        <h2>Parsing CSV into structured JSON</h2>
        <p>
          CSV is the lowest common denominator of tabular data: every
          spreadsheet and database can export it. JSON is what your code and
          APIs want to consume. This tool reads comma-separated rows and turns
          each one into an object, using the first row as the set of keys. A
          clean conversion means you can take a report someone emailed you and
          feed it straight into an app.
        </p>
        <h3>Headers and quoting are everything</h3>
        <p>
          Two details decide whether the parse works. First, the header row:
          those column names become the JSON keys, so they must be present and
          unique. Second, quoting. A field that contains a comma, a line break,
          or a double quote must be wrapped in double quotes, and an embedded
          quote is escaped by doubling it (<code>&quot;&quot;</code>). A parser
          that ignores quoting will split{' '}
          <code>&quot;Smith, John&quot;</code> into two broken columns.
        </p>
        <h3>Example</h3>
        <p>CSV input:</p>
        <pre><code>{`name,city
"Smith, John",Jakarta
Ada,Bandung`}</code></pre>
        <p>JSON output:</p>
        <pre><code>{`[
  { "name": "Smith, John", "city": "Jakarta" },
  { "name": "Ada", "city": "Bandung" }
]`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Are all values strings?</strong> By default yes, because CSV
          has no types. A value of <code>42</code> arrives as the string{' '}
          <code>&quot;42&quot;</code> unless the tool offers type coercion,
          which you should use carefully to avoid turning a zip code into a
          number and losing leading zeros.
        </p>
        <p>
          <strong>My delimiter is a semicolon, not a comma.</strong> Many locales
          export with <code>;</code> because the comma is a decimal separator.
          Set the delimiter explicitly rather than hoping for auto-detection.
        </p>
        <p>
          <strong>What about empty cells?</strong> An empty field becomes an
          empty string, not <code>null</code>, unless you ask for that. Decide
          which you want before importing. Clean the output with the{' '}
          <a href="/tools/json-formatter">JSON formatter</a>.
        </p>
      </>
    ),
  },

  'number-base-converter': {
    body: (
      <>
        <h2>Converting numbers between binary, octal, decimal, and hex</h2>
        <p>
          A base converter rewrites the same integer in different radixes:
          binary (base 2), octal (base 8), decimal (base 10), and hexadecimal
          (base 16). The underlying quantity never changes, only the symbols
          used to write it. Developers reach for this constantly: reading a
          color code in hex, inspecting a bitmask in binary, or decoding a file
          permission in octal.
        </p>
        <h3>Why these four bases dominate</h3>
        <p>
          Decimal is how humans count. Binary is how hardware stores everything.
          Hex is a compact way to write binary, since one hex digit maps cleanly
          to exactly four bits, so a byte is always two hex digits. Octal groups
          bits in threes and survives mainly in Unix file permissions. Seeing a
          value in all four at once makes bit patterns obvious.
        </p>
        <h3>Example</h3>
        <p>Convert decimal 255:</p>
        <pre><code>{`Decimal:     255
Binary:      11111111
Octal:       377
Hexadecimal: FF`}</code></pre>
        <p>Convert hex <code>2A</code>:</p>
        <pre><code>{`Hex 2A  ->  Decimal 42  ->  Binary 101010`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>What do the prefixes mean?</strong> In code,{' '}
          <code>0b</code> marks binary, <code>0o</code> marks octal, and{' '}
          <code>0x</code> marks hex. They tell the parser the base; the digits
          after them are the actual number.
        </p>
        <p>
          <strong>Is hex case sensitive?</strong> No. <code>FF</code> and{' '}
          <code>ff</code> are the same value. Teams just pick one style for
          consistency.
        </p>
        <p>
          <strong>How do negative numbers work?</strong> Plain conversion treats
          the magnitude and a sign. Two&apos;s complement, used by hardware for
          signed integers, is a separate representation that depends on the bit
          width. If you are decoding permissions, see the{' '}
          <a href="/tools/chmod-calculator">chmod calculator</a>.
        </p>
      </>
    ),
  },

  'chmod-calculator': {
    body: (
      <>
        <h2>Reading and building Unix file permissions</h2>
        <p>
          On Unix systems every file has permissions for three groups: the owner
          (user), the group, and everyone else (other). Each group can have
          read, write, and execute rights. A chmod calculator converts between
          the symbolic form you see in <code>ls -l</code>, like{' '}
          <code>rwxr-xr-x</code>, and the octal form you pass to{' '}
          <code>chmod</code>, like <code>755</code>. Getting this right is the
          difference between a working script and a &quot;permission
          denied&quot; error.
        </p>
        <h3>The arithmetic behind the digits</h3>
        <p>
          Each permission is a bit with a value: read is 4, write is 2, execute
          is 1. You add them per group. Read plus write plus execute is{' '}
          <code>4 + 2 + 1 = 7</code>. Read plus execute is{' '}
          <code>4 + 1 = 5</code>. So <code>755</code> means the owner gets 7
          (<code>rwx</code>) and group and other each get 5 (<code>r-x</code>),
          which reads as <code>rwxr-xr-x</code>.
        </p>
        <h3>Example</h3>
        <pre><code>{`Symbolic:  rw-r--r--
Owner:  rw-  = 4+2   = 6
Group:  r--  = 4     = 4
Other:  r--  = 4     = 4
Octal:  644`}</code></pre>
        <p>Common values:</p>
        <pre><code>{`644  files you edit, world-readable
755  scripts and directories you run or enter
600  private files, owner only
777  everyone can do anything (avoid)`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Why does a directory need execute?</strong> On a directory the
          execute bit means &quot;you may enter it and access files inside&quot;.
          Without it, read access only lets you list names, not open them.
        </p>
        <p>
          <strong>Is 777 ever fine?</strong> Almost never. It lets any user
          modify the file. Prefer the narrowest permission that works, usually
          <code> 644</code> or <code>755</code>.
        </p>
        <p>
          <strong>What is the leading fourth digit?</strong> A four-digit mode
          like <code>4755</code> adds special bits (setuid, setgid, sticky). The
          octal math is the same idea as the{' '}
          <a href="/tools/number-base-converter">number base converter</a>.
        </p>
      </>
    ),
  },

  'bcrypt-generator': {
    body: (
      <>
        <h2>Hashing passwords with bcrypt</h2>
        <p>
          Bcrypt is a password hashing function built for one job: storing
          passwords so that a database leak does not instantly reveal them. You
          feed it a password and it returns a hash you can save. Later you verify
          a login by hashing the attempt and comparing. Crucially, you never
          store the password itself, only the bcrypt output.
        </p>
        <h3>Slow on purpose, and salted automatically</h3>
        <p>
          Here is what sets bcrypt apart from a fast hash like SHA-256. SHA is
          designed to be fast, which is great for checksums but terrible for
          passwords, because an attacker can test billions of guesses per
          second. Bcrypt is deliberately slow, and its speed is tunable through
          a cost factor (also called work factor or rounds). A cost of 10 means{' '}
          <code>2^10</code> iterations; raising it to 12 makes hashing roughly
          four times slower, which barely affects a real login but massively
          slows brute force. Bcrypt also generates a random salt automatically
          and embeds it in the output, so two users with the same password get
          different hashes.
        </p>
        <h3>Example</h3>
        <p>Hashing <code>hunter2</code> at cost 10 produces something like:</p>
        <pre><code>{`$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`}</code></pre>
        <p>Reading the structure:</p>
        <pre><code>{`$2b$   algorithm version
$10$   cost factor (2^10 rounds)
N9qo...22 chars  the salt
IjZA...the rest  the actual hash`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Why is the hash different every time?</strong> The random salt
          changes each run, so identical passwords never produce identical
          hashes. Verification still works because the salt is stored inside the
          hash.
        </p>
        <p>
          <strong>Which cost factor should I use?</strong> Pick the highest value
          where a single hash still completes in a fraction of a second on your
          server, commonly 10 to 12. Revisit it as hardware gets faster.
        </p>
        <p>
          <strong>Is there a length limit?</strong> Yes. Bcrypt only uses the
          first 72 bytes of the input, so very long passphrases are truncated.
          Pre-hashing with SHA-256 is a common workaround for that specific
          limit.
        </p>
      </>
    ),
  },

  'markdown-preview': {
    body: (
      <>
        <h2>Previewing Markdown as rendered HTML</h2>
        <p>
          Markdown is a plain-text format where lightweight symbols stand in for
          formatting: <code>#</code> for headings, <code>*</code> for emphasis,
          and dashes for lists. A preview tool renders that text into the HTML
          you would actually see, side by side with the source, so you can
          confirm a README or a comment looks right before you publish it.
        </p>
        <h3>Why a live preview helps</h3>
        <p>
          Markdown is forgiving until it is not. A missing blank line before a
          list, an unclosed code fence, or a stray asterisk can quietly break the
          layout. A preview catches these instantly instead of after you push to
          a repository. It also shows how your specific flavor handles things,
          since GitHub Flavored Markdown adds tables, task lists, and
          strikethrough that plain Markdown does not include.
        </p>
        <h3>Example</h3>
        <p>Markdown source:</p>
        <pre><code>{`# Setup

Install with:

- Node 18+
- **npm** or pnpm

Run \`npm start\`.`}</code></pre>
        <p>Rendered result (described):</p>
        <pre><code>{`A large "Setup" heading
A paragraph "Install with:"
A bullet list with two items, "npm" in bold
A line with "npm start" styled as inline code`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Why did my list not render?</strong> Most parsers need a blank
          line between a paragraph and the list that follows it. Without the
          gap, the list items fold into the paragraph.
        </p>
        <p>
          <strong>Is raw HTML allowed?</strong> Markdown lets you drop in HTML,
          but renderers that sanitize input will strip tags like{' '}
          <code>script</code> for safety. Do not rely on inline styles in
          contexts you do not control.
        </p>
        <p>
          <strong>Which flavor should I target?</strong> If your text lives on
          GitHub, write for GitHub Flavored Markdown. For a tidy source file
          before pasting, run it through the{' '}
          <a href="/tools/word-counter">word counter</a> to check length.
        </p>
      </>
    ),
  },
}
