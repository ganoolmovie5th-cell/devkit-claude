import type { ToolArticle } from './index'

export const batch1: Record<string, ToolArticle> = {
  'json-formatter': {
    body: (
      <>
        <h2>What a JSON formatter actually does</h2>
        <p>
          A JSON formatter takes a string of JSON and rewrites it with
          consistent indentation, line breaks, and key spacing so a human can
          read it. Minified JSON that arrives from an API is usually a single
          line with no whitespace, which saves bandwidth but is painful to scan.
          Formatting (also called beautifying or pretty-printing) does not
          change the data, only its layout. A good formatter also validates:
          if the input is not valid JSON it reports the position of the error
          instead of silently producing garbage.
        </p>
        <h3>When you reach for it</h3>
        <p>
          The common cases are reading a response copied from browser dev tools,
          inspecting a config file that was saved minified, diffing two payloads
          to see what changed, or cleaning up JSON before pasting it into a bug
          report. Formatting also surfaces structural mistakes fast: a missing
          comma, a trailing comma (which standard JSON forbids), or single
          quotes used instead of double quotes.
        </p>
        <h3>Example</h3>
        <p>Minified input:</p>
        <pre><code>{`{"id":42,"tags":["a","b"],"active":true}`}</code></pre>
        <p>Formatted output with two-space indentation:</p>
        <pre><code>{`{
  "id": 42,
  "tags": ["a", "b"],
  "active": true
}`}</code></pre>
        <h3>Common pitfalls</h3>
        <p>
          JSON is stricter than JavaScript object literals. Keys must be
          double-quoted strings, strings cannot use single quotes, comments are
          not allowed, and <code>NaN</code> or <code>Infinity</code> are not
          valid values. Numbers do not keep leading zeros, and very large
          integers can lose precision once parsed into a floating point number.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does formatting change my numbers?</strong> The visible digits
          stay the same, but if you re-serialize after parsing, an integer like
          9007199254740993 may come back rounded because it exceeds the safe
          integer range for doubles.
        </p>
        <p>
          <strong>Why does my input with // comments fail?</strong> Those are
          JSONC or JSON5 features, not standard JSON. Strip comments first, or
          use a parser that explicitly supports them.
        </p>
        <p>
          <strong>Can it sort keys?</strong> Formatting preserves key order by
          default. Sorting is a separate step and will reorder your object,
          which matters if order carries meaning in your system.
        </p>
      </>
    ),
  },

  'base64-encode-decode': {
    body: (
      <>
        <h2>What Base64 is for</h2>
        <p>
          Base64 is an encoding that represents binary data using 64 printable
          ASCII characters (A-Z, a-z, 0-9, plus <code>+</code> and{' '}
          <code>/</code>). It exists so binary bytes can travel through channels
          that only reliably handle text: email bodies, JSON string fields, URL
          parameters, HTML data attributes, and HTTP headers. It is an encoding,
          not encryption. Anyone can decode it, so it provides no secrecy at all.
        </p>
        <h3>The size cost</h3>
        <p>
          Base64 turns every 3 bytes into 4 characters, so encoded output is
          about 33 percent larger than the original. A 300 KB image becomes
          roughly 400 KB once inlined as a data URI. That tradeoff is worth it
          for small assets that avoid an extra network request, but it is wasteful
          for large files.
        </p>
        <h3>Example</h3>
        <pre><code>{`"Man" -> "TWFu"
"Ma"  -> "TWE="
"M"   -> "TQ=="`}</code></pre>
        <p>
          The <code>=</code> characters are padding. They fill out the final
          group when the input length is not a multiple of 3, which is why you
          often see one or two equals signs at the end.
        </p>
        <h3>Standard vs URL-safe</h3>
        <p>
          Plain Base64 uses <code>+</code> and <code>/</code>, which have special
          meaning in URLs. The URL-safe variant substitutes <code>-</code> and{' '}
          <code>_</code> and often drops padding. If you are putting a token in a
          query string, decoding with the wrong variant is a frequent source of
          corruption. Related: see the{' '}
          <a href="/tools/url-encode-decode">URL encoder</a> for the other half
          of safely moving data through URLs.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Is Base64 safe to store passwords in?</strong> No. It is
          trivially reversible. For secrets you need hashing with a{' '}
          <a href="/tools/hash-generator">hash function</a> or real encryption.
        </p>
        <p>
          <strong>Why does my decoded text look like gibberish?</strong> The
          bytes were probably not UTF-8 text to begin with, or the string was
          actually URL-safe Base64 and needs the alternate alphabet before
          decoding.
        </p>
        <p>
          <strong>Can I Base64 a whole image?</strong> Yes, that produces a data
          URI you can embed in CSS or HTML, but remember the 33 percent size
          penalty and that the browser cannot cache it separately.
        </p>
      </>
    ),
  },

  'url-encode-decode': {
    body: (
      <>
        <h2>Why URLs need encoding</h2>
        <p>
          A URL can only contain a limited set of characters. Spaces, slashes,
          question marks, ampersands, and most non-ASCII characters either have
          reserved meaning or are simply not allowed. Percent-encoding solves
          this by replacing an unsafe byte with a percent sign followed by its
          two-digit hexadecimal value. A space becomes <code>%20</code>, and a
          slash becomes <code>%2F</code>.
        </p>
        <h3>Where it bites you</h3>
        <p>
          The classic bug is a query parameter that contains an ampersand or an
          equals sign. If a user searches for <code>q=rock &amp; roll</code> and
          you do not encode it, the server sees a stray parameter boundary and
          loses part of the value. Encoding the value first keeps it intact.
        </p>
        <h3>Example</h3>
        <pre><code>{`Input:  https://ex.com/search?q=cats & dogs
Output: https://ex.com/search?q=cats%20%26%20dogs`}</code></pre>
        <p>
          Notice the space became <code>%20</code> and the ampersand became{' '}
          <code>%26</code>. In some contexts a space is instead encoded as a
          plus sign; that convention applies to form bodies, not to the path.
        </p>
        <h3>Encode the component, not the whole URL</h3>
        <p>
          A frequent mistake is encoding an entire URL at once, which escapes the
          slashes and colon you actually want to keep. The right approach is to
          encode each piece (a single query value, one path segment) before you
          assemble it. In JavaScript that is{' '}
          <code>encodeURIComponent</code> for parts and{' '}
          <code>encodeURI</code> only for a full address.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Space becomes %20 or a plus sign, which is right?</strong>{' '}
          Both appear in the wild. Use <code>%20</code> in path and query values;
          the plus sign is a legacy form-encoding rule for{' '}
          <code>application/x-www-form-urlencoded</code> bodies.
        </p>
        <p>
          <strong>Do I need to encode letters and digits?</strong> No.
          Unreserved characters (A-Z, a-z, 0-9, and <code>- _ . ~</code>) pass
          through untouched.
        </p>
        <p>
          <strong>How do non-English characters work?</strong> They are first
          converted to UTF-8 bytes, then each byte is percent-encoded, so a
          single accented letter can expand into several percent groups.
        </p>
      </>
    ),
  },

  'jwt-decoder': {
    body: (
      <>
        <h2>Reading a JSON Web Token</h2>
        <p>
          A JWT is three Base64url strings joined by dots:{' '}
          <code>header.payload.signature</code>. The header says which signing
          algorithm was used, the payload carries claims such as the user id and
          expiry, and the signature proves the token was not tampered with. A
          decoder splits the token and Base64url-decodes the first two parts so
          you can read them.
        </p>
        <h3>Decoding is not verifying</h3>
        <p>
          This is the single most important thing to understand. The header and
          payload are only encoded, never encrypted. Anyone who holds the token
          can read every claim in it. Decoding tells you what the token claims;
          it does not tell you whether the claims are trustworthy. Trust comes
          only from checking the signature against the issuer secret or public
          key, which a client-side decoder cannot and should not do with your
          server key.
        </p>
        <h3>Example</h3>
        <p>A decoded payload typically looks like:</p>
        <pre><code>{`{
  "sub": "1234567890",
  "name": "Ada",
  "iat": 1700000000,
  "exp": 1700003600
}`}</code></pre>
        <p>
          Here <code>iat</code> is issued-at and <code>exp</code> is expiry, both
          Unix timestamps. To turn those into a readable date, use the{' '}
          <a href="/tools/unix-timestamp-converter">timestamp converter</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Can I see the password or secret inside?</strong> No. The
          secret never travels in the token. The signature is derived from it but
          cannot be reversed back into the key.
        </p>
        <p>
          <strong>Why is my token rejected even though it decodes fine?</strong>{' '}
          Decoding only reads the data. The server may reject it because the
          signature does not match, the <code>exp</code> time has passed, or the{' '}
          <code>alg</code> is not one the server accepts.
        </p>
        <p>
          <strong>Is it safe to paste a token into a decoder?</strong> Treat a
          live token like a password. If it still grants access, pasting it
          anywhere it could be logged is a real risk. Prefer decoding expired or
          test tokens.
        </p>
      </>
    ),
  },

  'uuid-generator': {
    body: (
      <>
        <h2>What a UUID gives you</h2>
        <p>
          A UUID is a 128-bit identifier written as 32 hexadecimal digits in
          five dash-separated groups, like{' '}
          <code>550e8400-e29b-41d4-a716-446655440000</code>. The point of a UUID
          is that you can generate one anywhere, on any machine, without a central
          coordinator, and still be confident it will not clash with a UUID
          generated somewhere else.
        </p>
        <h3>How version 4 works</h3>
        <p>
          Version 4 UUIDs are almost entirely random. Of the 128 bits, 6 are
          fixed to mark the version and variant, leaving 122 random bits. That is
          an enormous space: you would need to generate billions of UUIDs before
          the chance of a single collision becomes meaningful. You can tell a v4
          UUID because the 13th hex digit is always <code>4</code> and the 17th
          is one of <code>8</code>, <code>9</code>, <code>a</code>, or{' '}
          <code>b</code>.
        </p>
        <h3>When to use one</h3>
        <p>
          UUIDs shine as primary keys you want to assign before a row reaches the
          database, as idempotency keys for API requests, as filenames that must
          not collide, and as correlation ids threaded through logs. The usual
          downside is that random v4 values make poor clustered-index keys because
          inserts land in random spots; if write ordering matters, a
          time-sortable scheme may suit you better.
        </p>
        <h3>Example</h3>
        <pre><code>{`550e8400-e29b-41d4-a716-446655440000
                ^            ^
            version 4   variant (8/9/a/b)`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Can two v4 UUIDs ever be the same?</strong> In theory yes, in
          practice the odds are so small they are ignored for normal workloads.
          The risk only grows if your random source is weak.
        </p>
        <p>
          <strong>Are UUIDs secret or hard to guess?</strong> A v4 is hard to
          guess, but do not treat it as a security token on its own. Use it for
          uniqueness, not for authorization.
        </p>
        <p>
          <strong>Why does mine always start with the same digits?</strong> The
          version and variant nibbles are fixed by the spec, so patterns at those
          positions are expected, not a bug.
        </p>
      </>
    ),
  },

  'hash-generator': {
    body: (
      <>
        <h2>What a hash function produces</h2>
        <p>
          A cryptographic hash maps any input, from a word to a gigabyte file, to
          a fixed-length fingerprint. The same input always yields the same
          digest, a tiny change flips roughly half the output bits, and you cannot
          work backward from a digest to the original. MD5 produces 128 bits,
          SHA-1 produces 160, and SHA-256 produces 256 bits, usually shown as
          hexadecimal.
        </p>
        <h3>Example</h3>
        <pre><code>{`SHA-256("hello")
= 2cf24dba5fb0a30e26e83b2ac5b9e29e
  1b161e5c1fa7425e73043362938b9824`}</code></pre>
        <p>
          Change a single letter and the entire digest is unrecognizable, which
          is exactly what makes hashes useful for detecting whether a file or
          message was altered.
        </p>
        <h3>Pick the right algorithm</h3>
        <p>
          MD5 and SHA-1 are broken for security purposes: researchers can craft
          two different inputs with the same digest (a collision). That makes them
          unsafe for signatures or certificates. They are still fine as fast
          non-security checksums, for example a cache key or a quick integrity
          check against accidental corruption. For anything security-related use
          SHA-256 or stronger.
        </p>
        <h3>Hashing is not for passwords directly</h3>
        <p>
          A raw SHA-256 of a password is still weak, because attackers can test
          billions of guesses per second. Password storage needs a deliberately
          slow, salted algorithm such as bcrypt, scrypt, or Argon2. A plain hash
          tool is the wrong instrument for that job.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Can I get the original text back from a hash?</strong> No.
          Hashing is one-way. Any site that claims to reverse a hash is really
          just looking the input up in a precomputed table of common values.
        </p>
        <p>
          <strong>Why do two files give the same MD5?</strong> That is a
          collision, and it is why MD5 should not be trusted where an attacker
          controls the input.
        </p>
        <p>
          <strong>Does uppercase vs lowercase hex matter?</strong> No, they
          represent the same bytes. Just stay consistent when comparing digests
          as strings.
        </p>
      </>
    ),
  },

  'regex-tester': {
    body: (
      <>
        <h2>Testing patterns without guesswork</h2>
        <p>
          A regular expression is a compact language for describing text
          patterns. A tester lets you paste a pattern and sample text, then
          highlights every match and shows the captured groups, so you can see
          exactly what your expression does instead of running your whole program
          to find out.
        </p>
        <h3>Example</h3>
        <p>Pattern to pull the area code from a phone number:</p>
        <pre><code>{`Pattern:  \\((\\d{3})\\) \\d{3}-\\d{4}
Input:    (415) 555-0199
Group 1:  415`}</code></pre>
        <p>
          The parentheses in <code>(\d&#123;3&#125;)</code> create a capture
          group, while the literal parentheses around the area code are escaped
          with backslashes so they match real brackets in the text.
        </p>
        <h3>Flags change everything</h3>
        <p>
          The same pattern behaves differently depending on flags. The global
          flag finds all matches instead of just the first, the case-insensitive
          flag ignores letter case, and the multiline flag makes{' '}
          <code>^</code> and <code>$</code> match at every line boundary rather
          than only the start and end of the whole string. Forgetting the global
          flag is the most common reason a replace only touches the first match.
        </p>
        <h3>Watch for catastrophic backtracking</h3>
        <p>
          Patterns with nested quantifiers such as{' '}
          <code>(a+)+</code> can take exponential time on certain inputs and hang
          the engine. If a tester locks up on a specific string, that is usually
          the cause, and the fix is to make the quantifiers more specific or
          atomic.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does my dot not match a newline?</strong> By default{' '}
          <code>.</code> matches any character except a line break. Enable the
          dotall flag if you need it to cross lines.
        </p>
        <p>
          <strong>Are regex dialects the same everywhere?</strong> No. JavaScript,
          PCRE, Python, and others differ on lookbehind, named groups, and escape
          rules, so a pattern copied from one language may need tweaks in another.
        </p>
        <p>
          <strong>Should I parse HTML with regex?</strong> For simple one-off
          extraction, sometimes. For real nested markup, use a proper parser;
          regex cannot reliably handle arbitrary nesting.
        </p>
      </>
    ),
  },

  'unix-timestamp-converter': {
    body: (
      <>
        <h2>Epoch time, explained</h2>
        <p>
          A Unix timestamp counts the number of seconds since midnight UTC on
          1 January 1970, a moment called the epoch. It is a single number with
          no timezone attached, which makes it ideal for storing and comparing
          moments across systems. Converting goes both ways: a timestamp into a
          human date, and a date back into the number.
        </p>
        <h3>Seconds or milliseconds?</h3>
        <p>
          This trips people up constantly. Classic Unix time is in seconds, but
          JavaScript <code>Date.now()</code> and many APIs use milliseconds. If a
          date lands in 1970, you probably treated a seconds value as
          milliseconds or vice versa. The quick tell: a current seconds timestamp
          is 10 digits, a milliseconds one is 13.
        </p>
        <h3>Example</h3>
        <pre><code>{`1700000000  (seconds)
= Tue, 14 Nov 2023 22:13:20 UTC

1700000000000  (milliseconds)
= same instant, 13 digits`}</code></pre>
        <h3>Where you meet timestamps</h3>
        <p>
          They show up in log files, database columns, JWT <code>iat</code> and{' '}
          <code>exp</code> claims (see the{' '}
          <a href="/tools/jwt-decoder">JWT decoder</a>), cookie expiries, and
          cache headers. Storing in UTC and formatting to the user timezone only
          at display time avoids a whole category of off-by-an-hour bugs around
          daylight saving changes.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>What is the year 2038 problem?</strong> A signed 32-bit second
          counter overflows in January 2038. Modern systems use 64-bit values,
          which pushes the limit billions of years out.
        </p>
        <p>
          <strong>Does a timestamp include a timezone?</strong> No. It is always
          UTC-based. The timezone is applied only when you format it into a
          readable date.
        </p>
        <p>
          <strong>Why is my converted time off by seconds?</strong> Unix time
          ignores leap seconds, so it can differ slightly from strict
          astronomical time, though for everyday use this is irrelevant.
        </p>
      </>
    ),
  },

  'color-converter': {
    body: (
      <>
        <h2>One color, three notations</h2>
        <p>
          HEX, RGB, and HSL all describe the same screen colors, just in
          different formats. HEX packs red, green, and blue into a six-digit
          hexadecimal string. RGB spells out the same three channels as numbers
          from 0 to 255. HSL instead uses hue, saturation, and lightness, which
          maps more closely to how people think about adjusting a color.
        </p>
        <h3>Example</h3>
        <pre><code>{`#3498db
= rgb(52, 152, 219)
= hsl(204, 70%, 53%)`}</code></pre>
        <p>
          Each pair of hex digits is one channel: <code>34</code> is 52 in
          decimal (red), <code>98</code> is 152 (green), <code>db</code> is 219
          (blue). HSL describes the same color as a hue of 204 degrees on the
          color wheel, 70 percent saturation, and 53 percent lightness.
        </p>
        <h3>Why HSL is handy</h3>
        <p>
          To build a lighter or darker shade of a brand color, HSL lets you keep
          the hue and saturation and only nudge the lightness, which keeps the
          colors feeling related. Doing the same in RGB means recalculating all
          three channels and often drifting off-hue. That is why many design
          systems define palettes in HSL.
        </p>
        <h3>Shorthand and alpha</h3>
        <p>
          A three-digit hex like <code>#39d</code> expands by doubling each digit
          to <code>#3399dd</code>. Eight-digit hex and the <code>rgba</code> or{' '}
          <code>hsla</code> forms add an alpha channel for transparency, where 0
          is fully transparent and 1 (or <code>ff</code>) is fully opaque.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why do HEX and HSL round-trips drift slightly?</strong> HSL
          values are often rounded to whole numbers, so converting back and forth
          can shift a channel by one. It is a rounding artifact, not a conversion
          error.
        </p>
        <p>
          <strong>Is #FFF the same as #FFFFFF?</strong> Yes. The three-digit form
          is pure shorthand that expands to the six-digit value.
        </p>
        <p>
          <strong>Which format should I store?</strong> HEX is compact and great
          for static values; HSL is better when you plan to compute variations
          programmatically.
        </p>
      </>
    ),
  },

  'password-generator': {
    body: (
      <>
        <h2>What makes a password strong</h2>
        <p>
          Strength comes from entropy, a measure of how many guesses an attacker
          would need. Entropy grows with both length and the size of the
          character set. Length matters more than complexity: a long passphrase
          of plain words can beat a short string of symbols because each extra
          character multiplies the search space.
        </p>
        <h3>The math, briefly</h3>
        <p>
          Each character drawn from a pool of N options adds log2(N) bits of
          entropy. A 12-character password from the 94 printable ASCII symbols
          carries roughly 78 bits, which is far beyond what offline cracking can
          brute-force today. Add characters before you add exotic symbols; the
          length lever is stronger.
        </p>
        <h3>Example</h3>
        <pre><code>{`Weak:   Summer2024!      (predictable pattern)
Better: 7xQ$pL2#vR9mZ    (random, mixed set)
Also strong: correct-horse-battery-staple`}</code></pre>
        <p>
          The passphrase works because four random common words already produce
          a huge number of combinations, and it is far easier to type and
          remember than a wall of symbols.
        </p>
        <h3>Randomness is the whole point</h3>
        <p>
          A generator is only as good as its random source. A secure one uses a
          cryptographically strong random number generator, not a predictable
          pseudo-random sequence seeded from the clock. Patterns a human would
          pick, like substituting <code>@</code> for <code>a</code>, add almost
          no real strength because attackers already model those tricks.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Do I still need symbols if the password is long?</strong> A
          long random password is strong on its own, but many sites force a mix,
          so including them keeps you compatible with those rules.
        </p>
        <p>
          <strong>Should I reuse one strong password everywhere?</strong> No. One
          breach then exposes every account. Use a unique password per site,
          which in practice means a password manager.
        </p>
        <p>
          <strong>Are generated passwords stored anywhere?</strong> A client-side
          generator creates them in your browser and should never transmit them.
          Still, copy it straight into your manager rather than leaving it on
          screen or in clipboard history longer than needed.
        </p>
      </>
    ),
  },
}
