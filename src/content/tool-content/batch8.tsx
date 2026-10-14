import type { ToolArticle } from './index'

export const batch8: Record<string, ToolArticle> = {
  'dedupe-lines': {
    body: (
      <>
        <h2>Removing duplicate lines cleanly</h2>
        <p>
          Deduplicating a list means keeping one copy of each distinct line and
          dropping the rest. It sounds trivial until you hit the edge cases: are
          two lines that differ only by a trailing space duplicates? Does
          leading indentation count? Is <code>Apple</code> the same as{' '}
          <code>apple</code>? A good dedupe step lets you decide, usually with
          options to trim whitespace and fold case before comparing.
        </p>
        <h3>When it earns its keep</h3>
        <p>
          Typical uses are cleaning an email export before an import, collapsing a
          log of repeated error lines, merging two keyword lists, or tidying a
          list of IDs pasted from a spreadsheet. It pairs well with sorting,
          since a sorted-then-deduped list reads predictably, but order-preserving
          dedupe matters when the first occurrence should win.
        </p>
        <h3>Example</h3>
        <pre><code>{`Input          Order-preserving   Sorted + unique
banana         banana             apple
apple          apple              banana
banana         cherry             cherry
cherry`}</code></pre>
        <p>
          Order-preserving keeps the first time each value appeared. Sorting
          first groups equal lines together, which is how command-line{' '}
          <code>sort | uniq</code> works and why <code>uniq</code> alone only
          removes adjacent repeats.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          Invisible differences cause the most confusion. A line ending in{' '}
          <code>CRLF</code> is not equal to the same text ending in <code>LF</code>,
          so Windows and Unix line endings can leave apparent duplicates behind.
          Trailing spaces and a stray tab do the same. Decide up front whether
          comparison is exact or normalized.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does it keep the first or last occurrence?</strong>{' '}
          Order-preserving dedupe keeps the first by convention, so later
          repeats are the ones discarded.
        </p>
        <p>
          <strong>Why do two lines that look identical survive?</strong> One
          almost certainly carries hidden whitespace or a different line ending.
          Clean the text with a{' '}
          <a href="/tools/whitespace-cleaner">whitespace cleaner</a> first, then
          dedupe.
        </p>
        <p>
          <strong>Can I sort at the same time?</strong> Yes, though sorting is a
          separate decision. If order does not matter, sorting makes the result
          easier to scan.
        </p>
      </>
    ),
  },

  'text-toolbox': {
    body: (
      <>
        <h2>Reversing and repeating text</h2>
        <p>
          This set of small operations covers the everyday string chores:
          reverse the characters, reverse the word order, reverse the line order,
          repeat a block a fixed number of times, and count how often a substring
          appears. None of them are hard individually, but doing them by hand is
          error-prone, especially the counting.
        </p>
        <h3>Three kinds of reverse</h3>
        <p>
          Reversing characters turns <code>hello</code> into <code>olleh</code>.
          Reversing words keeps each word intact but flips their order, so{' '}
          <code>the quick fox</code> becomes <code>fox quick the</code>.
          Reversing lines flips a list top to bottom without touching the text on
          each line. People often ask for one and get another, so being explicit
          about the unit matters.
        </p>
        <h3>Example</h3>
        <pre><code>{`"abc def" reversed by char: "fed cba"
"abc def" reversed by word: "def abc"

repeat "ab" x3  -> "ababab"
count "an" in "banana" -> 2`}</code></pre>
        <h3>Character reverse and Unicode</h3>
        <p>
          Naive character reversal can mangle text with emoji or combining marks.
          A flag emoji is a pair of code points, and a letter with an accent may
          be a base letter plus a combining mark. Reverse those blindly and you
          split a glyph in half. Reversing by grapheme cluster, not by raw code
          unit, keeps multi-code-point characters whole.
        </p>
        <h3>Counting overlaps</h3>
        <p>
          Counting <code>aa</code> in <code>aaaa</code> gives 2 if matches cannot
          overlap and 3 if they can. Most tools count non-overlapping matches by
          default, which is what you usually want for things like counting
          delimiters.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why did my emoji break when reversed?</strong> It was reversed
          by code unit, splitting a multi-code-point glyph. Grapheme-aware
          reversal avoids that.
        </p>
        <p>
          <strong>Does repeat add a separator between copies?</strong> By default
          no, copies are joined directly. Add a newline or space yourself if you
          need one between repetitions.
        </p>
        <p>
          <strong>Is the occurrence count case-sensitive?</strong> Usually yes
          unless you fold case first, so <code>The</code> and <code>the</code>{' '}
          count separately.
        </p>
      </>
    ),
  },

  'find-replace': {
    body: (
      <>
        <h2>Find and replace, with and without regex</h2>
        <p>
          Find and replace swaps every occurrence of a search term for a
          replacement. In plain mode the search is a literal string. Switch on
          regular expressions and the search becomes a pattern, which unlocks
          wildcards, anchors, and capture groups you can reference in the
          replacement. The case-insensitive toggle decides whether{' '}
          <code>Error</code> matches <code>error</code>.
        </p>
        <h3>When regex is worth it</h3>
        <p>
          Literal replace is right for a simple rename. Regex earns its keep when
          the target varies: strip all trailing whitespace, reformat a batch of
          dates, or wrap every number in quotes. Capture groups let you rearrange
          text, for example turning <code>Last, First</code> into{' '}
          <code>First Last</code>.
        </p>
        <h3>Example</h3>
        <pre><code>{`Pattern:     (\\w+), (\\w+)
Replacement: $2 $1
Input:       Lovelace, Ada
Output:      Ada Lovelace`}</code></pre>
        <p>
          Here <code>$1</code> and <code>$2</code> refer to the first and second
          captured groups. Some engines write them as <code>\\1</code> and{' '}
          <code>\\2</code> instead, which is a common portability snag.
        </p>
        <h3>Pitfalls that bite</h3>
        <p>
          Forgetting the global flag replaces only the first match. Special
          characters in a literal search, like a dot or a plus, are treated as
          regex metacharacters once regex mode is on, so <code>3.14</code> would
          match <code>3x14</code> unless you escape the dot. And a greedy
          quantifier can swallow more than you expect, matching from the first
          opening tag to the last closing one across the whole document.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why did only the first match change?</strong> The global flag
          was off. Replace runs once without it.
        </p>
        <p>
          <strong>My replacement text shows $1 literally, why?</strong> Group
          references only work in regex mode. In literal mode the dollar sign is
          just a character. For building and testing patterns in isolation, use
          the <a href="/tools/regex-tester">regex tester</a>.
        </p>
        <p>
          <strong>How do I replace a literal dollar sign in regex mode?</strong>{' '}
          Escape it in the replacement, usually by writing <code>$$</code>.
        </p>
      </>
    ),
  },

  'line-sort-number': {
    body: (
      <>
        <h2>Sorting, numbering, and shuffling lines</h2>
        <p>
          This handles the structural moves on a list of lines: sort them,
          prefix each with a line number, reverse the order, or shuffle into a
          random order. Each is a distinct operation, and sorting in particular
          has more depth than it first appears.
        </p>
        <h3>Lexicographic vs natural sort</h3>
        <p>
          Plain sorting compares character codes, so <code>item10</code> lands
          before <code>item2</code> because <code>1</code> sorts before{' '}
          <code>2</code>. Natural sort reads embedded numbers as numbers, giving
          the order a human expects. If your list has filenames or versions with
          numbers in them, the difference is glaring.
        </p>
        <h3>Example</h3>
        <pre><code>{`Lexicographic   Natural
file1           file1
file10          file2
file2           file10`}</code></pre>
        <p>
          Case matters too. ASCII sorting puts all uppercase letters before
          lowercase, so <code>Zebra</code> comes before <code>apple</code> unless
          you sort case-insensitively.
        </p>
        <h3>Numbering and shuffling</h3>
        <p>
          Numbering is useful for referencing lines in a review or generating a
          quick ordered list. A fair shuffle should use the Fisher-Yates
          algorithm; naive approaches like sorting by a random key are subtly
          biased and skew the distribution. Shuffling is handy for randomizing
          quiz questions or sampling.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is item10 before item2 after sorting?</strong> That is
          lexicographic order comparing digit by digit. Switch to natural sort to
          treat the numbers as values.
        </p>
        <p>
          <strong>Does sorting remove duplicates?</strong> No, sorting only
          reorders. To drop repeats, run a{' '}
          <a href="/tools/dedupe-lines">duplicate line remover</a> afterward.
        </p>
        <p>
          <strong>Will a blank line sort to the top?</strong> Usually yes, an
          empty string sorts before any text, so trailing blank lines can jump to
          the front unexpectedly.
        </p>
      </>
    ),
  },

  'whitespace-cleaner': {
    body: (
      <>
        <h2>Taming invisible whitespace</h2>
        <p>
          Whitespace is the text you cannot see: trailing spaces at line ends,
          runs of blank lines, tabs mixed with spaces, and non-breaking spaces
          that masquerade as regular ones. A cleaner trims trailing spaces,
          collapses consecutive blank lines, and converts tabs to a chosen number
          of spaces so a file is consistent.
        </p>
        <h3>Why it matters</h3>
        <p>
          Trailing whitespace creates noisy diffs where a line appears changed
          but is not. Mixed tabs and spaces break indentation-sensitive languages
          like Python and YAML. A sneaky non-breaking space (<code>U+00A0</code>)
          looks like a space but fails string comparisons and breaks parsing,
          which is a classic cause of a config value that looks correct but is
          rejected.
        </p>
        <h3>Example</h3>
        <pre><code>{`Before (· = space, --> = tab):
"hello···\\n\\n\\n-->world···"

After trim, collapse blanks, tab->2 spaces:
"hello\\n\\nworld"`}</code></pre>
        <h3>Tabs to spaces, and the width question</h3>
        <p>
          Converting a tab is not always one tab to a fixed count. Elastic tab
          stops align to the next column boundary, so a tab at column 3 with a
          width of 4 only adds one space to reach column 4. Simple conversion
          replaces each tab with a flat N spaces, which is fine for most code but
          can misalign tables.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does my value still fail after I removed spaces?</strong>{' '}
          A non-breaking space or zero-width character may remain. Those are
          whitespace to the eye but distinct code points to the parser.
        </p>
        <p>
          <strong>Does it touch spaces inside my text?</strong> Trailing-space
          removal only affects the ends of lines; interior spacing is left alone
          unless you also collapse internal runs.
        </p>
        <p>
          <strong>Can it fix line endings too?</strong> Collapsing blank lines
          and normalizing endings often go together, since a stray{' '}
          <code>CRLF</code> can leave what looks like an empty line.
        </p>
      </>
    ),
  },

  'text-stats': {
    body: (
      <>
        <h2>What text statistics reveal</h2>
        <p>
          Beyond a raw word count, text analysis estimates reading time, scores
          readability, approximates a grade level, and ranks keyword density.
          Together they tell you whether a passage is scannable, who can follow
          it, and what it is really about.
        </p>
        <h3>Reading time and word count</h3>
        <p>
          Reading time is just word count divided by a reading speed, commonly
          200 to 250 words per minute for silent reading of general prose.
          Technical material reads slower. The number is an estimate, useful for
          setting expectations on an article, not a precise measurement.
        </p>
        <h3>Readability scores</h3>
        <p>
          The Flesch Reading Ease score runs from 0 to 100, where higher is
          easier. Roughly 90 to 100 is very easy (around a 5th-grade level), 60
          to 70 is plain English, and 0 to 30 is very difficult, the territory of
          academic and legal writing. It is driven by sentence length and
          syllables per word, so trimming long sentences lifts the score fast.
          The Flesch-Kincaid grade level maps the same inputs onto US school
          grades.
        </p>
        <h3>Example</h3>
        <pre><code>{`Words: 312
Reading time: ~1.4 min @ 220 wpm
Flesch Reading Ease: 64 (plain English)
Grade level: 8.1
Top keyword: "cache" (3.5% density)`}</code></pre>
        <h3>Keyword density, with a caveat</h3>
        <p>
          Density is the share of total words a term occupies. It helps spot what
          a page emphasizes, but chasing a target percentage is outdated SEO
          advice; modern ranking cares about meaning, not repetition. Densities
          above a few percent often read as stuffed and awkward.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does my technical post score as hard to read?</strong>{' '}
          Long sentences and multi-syllable jargon drive the Flesch score down.
          Short sentences raise it even when the vocabulary stays specialized.
        </p>
        <p>
          <strong>Are syllable counts exact?</strong> No, they are estimated
          heuristically, so unusual words and names can throw the grade level off
          by a bit.
        </p>
        <p>
          <strong>Does it count code or markup as words?</strong> It depends on
          input; paste plain prose for an accurate reading estimate, since
          symbols and tags skew both counts.
        </p>
      </>
    ),
  },

  'text-diff-word': {
    body: (
      <>
        <h2>Diffing at the word level</h2>
        <p>
          A word-level diff compares two texts and marks exactly which words were
          added, removed, or changed. Line-based diffs flag a whole line as
          changed even if a single word moved, which buries the real edit.
          Word-level granularity is far easier to read for prose, where a
          sentence rarely changes entirely.
        </p>
        <h3>When to pick it</h3>
        <p>
          It shines on edited paragraphs, translated copy, revised documentation,
          and anywhere a human rewrote text rather than restructured a file. For
          source code, line diffs usually read better because code changes tend
          to be line-shaped. For reconciling two edits against an original, reach
          for a <a href="/tools/diff-3way">3-way diff</a> instead.
        </p>
        <h3>Example</h3>
        <pre><code>{`Old: the quick brown fox jumps
New: the slow brown fox leaps

the [-quick-]{+slow+} brown fox [-jumps-]{+leaps+}`}</code></pre>
        <p>
          The unchanged words anchor the comparison, while the bracketed segments
          show one word swapped and one changed. Shared context is what makes the
          edit legible.
        </p>
        <h3>How the matching works</h3>
        <p>
          Under the hood a diff finds the longest common subsequence of tokens,
          then treats the gaps as insertions and deletions. Tokenizing on word
          boundaries, including or excluding punctuation, changes the result. If
          punctuation is its own token, changing <code>end.</code> to{' '}
          <code>end!</code> shows just the mark changing rather than the whole
          word.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is a moved paragraph shown as delete plus add?</strong>{' '}
          Standard diffs do not detect moves; relocated text reads as removed in
          one place and inserted in another.
        </p>
        <p>
          <strong>Does it ignore whitespace changes?</strong> That is usually an
          option. Collapsing whitespace first avoids noise from reflowed lines.
        </p>
        <p>
          <strong>Is case treated as a difference?</strong> By default yes,{' '}
          <code>The</code> and <code>the</code> differ unless you enable
          case-insensitive comparison.
        </p>
      </>
    ),
  },

  'diff-3way': {
    body: (
      <>
        <h2>Comparing against a common base</h2>
        <p>
          A 3-way diff compares two versions, yours and theirs, against the
          common ancestor they both started from. That third anchor is what makes
          merging possible: it tells you not just that the two versions differ,
          but who changed what relative to the original. This is the model Git
          uses when it merges branches.
        </p>
        <h3>Why the base changes everything</h3>
        <p>
          With only two files you cannot tell whether a line is new on the left or
          deleted on the right. The base resolves that. If a region changed on
          only one side, the merge takes that side automatically. A conflict
          arises only when both sides changed the same region in different ways.
        </p>
        <h3>Example</h3>
        <pre><code>{`Base:  color = red
Mine:  color = blue
Yours: color = green

Conflict: both changed the same line
{'<'}{'<'}{'<'}{'<'}{'<'}{'<'}{'<'} mine
color = blue
=======
color = green
{'>'}{'>'}{'>'}{'>'}{'>'}{'>'}{'>'} yours`}</code></pre>
        <p>
          Those conflict markers are exactly what Git writes into a file when it
          cannot merge automatically. The <code>=======</code> separates the two
          competing versions.
        </p>
        <h3>Reading the outcome</h3>
        <p>
          Non-conflicting changes from both sides combine cleanly. The job is to
          resolve the overlapping regions by hand, choosing one side, the other,
          or a hand-written blend, then removing the markers. A clean merge has no
          markers left.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does a change show as conflict when the result is the
          same?</strong> If both sides edited the same lines, even to identical
          text, a strict 3-way merge can still flag it because the regions
          overlap.
        </p>
        <p>
          <strong>Can it merge automatically?</strong> It merges the
          non-overlapping parts and leaves overlapping ones for you. There is no
          safe way to auto-pick between two conflicting human edits.
        </p>
        <p>
          <strong>What if I do not have the base?</strong> Then you are limited to
          a two-way comparison like a{' '}
          <a href="/tools/text-diff-word">word diff</a>, which shows differences
          but cannot attribute them.
        </p>
      </>
    ),
  },

  'morse-code': {
    body: (
      <>
        <h2>Translating to and from Morse</h2>
        <p>
          Morse code represents letters, digits, and a few punctuation marks as
          sequences of short signals (dots) and long signals (dashes). It was
          built for telegraph and radio, where you can only send on or off, and it
          is still used in aviation beacons and as an accessibility input method.
          Translation maps each character to its dot-dash pattern and back.
        </p>
        <h3>The timing is the hard part</h3>
        <p>
          Morse is defined by relative durations, not just symbols. A dash is
          three times the length of a dot. The gap between symbols within a letter
          is one dot. The gap between letters is three dots, and the gap between
          words is seven dots. Written Morse approximates these with spaces and a{' '}
          <code>/</code> for the word break, but the timing is what a listener
          actually decodes.
        </p>
        <h3>Example</h3>
        <pre><code>{`SOS   -> ... --- ...
HELLO -> .... . .-.. .-.. ---
"HI THERE":
.... ..   /   - .... . .-. .`}</code></pre>
        <p>
          Note that <code>SOS</code> is a continuous distress signal, not three
          separate letters with normal gaps, which is why it is written without
          inter-letter spacing when keyed.
        </p>
        <h3>What it cannot carry</h3>
        <p>
          Standard Morse is case-insensitive, so it cannot distinguish uppercase
          from lowercase, and it covers only a limited punctuation set. Characters
          outside that set, like most symbols and any non-Latin script, have no
          representation and are dropped or flagged on encoding.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why did my decode lose the capitalization?</strong> Morse has
          no case. Decoded output is typically rendered uppercase by convention.
        </p>
        <p>
          <strong>What does the slash mean?</strong> It marks a word boundary,
          standing in for the seven-dot gap between words.
        </p>
        <p>
          <strong>Why did an emoji or accented letter disappear?</strong> There
          is no standard Morse mapping for it, so it cannot be encoded and is
          skipped.
        </p>
      </>
    ),
  },

  'text-to-binary': {
    body: (
      <>
        <h2>Text as ones and zeros</h2>
        <p>
          Converting text to binary shows the raw bits a computer stores for each
          character. First each character maps to a number through a character
          encoding, then that number is written in base 2. For plain English in
          UTF-8, every character is one byte, shown as eight bits.
        </p>
        <h3>The encoding decides the bytes</h3>
        <p>
          The letter <code>A</code> is code point 65, which is{' '}
          <code>01000001</code> in binary. ASCII and UTF-8 agree for the first 128
          characters, so basic Latin text looks the same in both. The moment you
          include a non-ASCII character, UTF-8 uses two to four bytes for it,
          while other encodings differ entirely. Binary is meaningless without
          knowing the encoding.
        </p>
        <h3>Example</h3>
        <pre><code>{`"Hi" in UTF-8:
H = 72 = 01001000
i = 105 = 01101001

"é" in UTF-8 is two bytes:
11000011 10101001`}</code></pre>
        <p>
          The accented <code>é</code> expands to two bytes because it lives beyond
          the single-byte range, and UTF-8 marks multi-byte sequences with
          leading bits like <code>110</code> on the first byte.
        </p>
        <h3>Grouping and padding</h3>
        <p>
          Bits are conventionally grouped into bytes of eight, padded with leading
          zeros so <code>5</code> shows as <code>00000101</code>, not{' '}
          <code>101</code>. Without consistent padding and spacing, a binary
          string is ambiguous about where one character ends and the next begins.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is one character more than eight bits?</strong> It is
          outside the ASCII range, so UTF-8 encodes it as multiple bytes. To
          inspect the exact code point, try the{' '}
          <a href="/tools/unicode-lookup">Unicode lookup</a>.
        </p>
        <p>
          <strong>Can I decode binary without knowing the encoding?</strong> You
          can turn bits into numbers, but mapping those numbers back to characters
          needs the right encoding, usually UTF-8.
        </p>
        <p>
          <strong>Why does my decode fail on odd-length input?</strong> Each
          character needs a whole number of bytes. Stray bits or missing padding
          break the grouping.
        </p>
      </>
    ),
  },

  'ascii-art-generator': {
    body: (
      <>
        <h2>Turning text into ASCII art</h2>
        <p>
          An ASCII art generator renders your text as large letters built out of
          smaller characters, the banner style you see in terminal splash screens
          and README headers. Each letter is drawn from a font definition that
          describes how to compose it from characters across several rows.
        </p>
        <h3>How figlet-style fonts work</h3>
        <p>
          The classic approach comes from FIGlet. A FIGfont stores, for every
          character, a fixed-height block of text, commonly six or eight rows
          tall. The generator stitches those blocks side by side. Fonts vary
          wildly: some are blocky and bold, some use slashes and underscores for a
          3D look, some are tiny.
        </p>
        <h3>Example</h3>
        <pre><code>{` _    _ _
| |  | (_)
| |__| |_
|  __  | |
| |  | | |
|_|  |_|_|   ("Hi")`}</code></pre>
        <p>
          Every glyph occupies the same height so the rows line up. The art only
          looks right in a monospace font, where every character is the same
          width.
        </p>
        <h3>Where it works and where it breaks</h3>
        <p>
          ASCII banners are great in terminals, code comments, and plain-text
          files. They fall apart in proportional fonts, since the careful column
          alignment collapses. They also do not scale: unlike a real font, you
          cannot resize them smoothly, and very long input quickly overruns a
          normal terminal width.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is my banner misaligned when I paste it?</strong> It is
          being shown in a proportional font. Wrap it in a monospace or code block
          and the columns line up.
        </p>
        <p>
          <strong>Can it render lowercase and symbols?</strong> That depends on
          the font. Many banner fonts define only uppercase and digits, and fall
          back or blank out unsupported characters.
        </p>
        <p>
          <strong>Why does long text wrap oddly?</strong> Each letter is several
          characters wide, so a short word can exceed the terminal width and wrap
          mid-glyph.
        </p>
      </>
    ),
  },

  'unicode-lookup': {
    body: (
      <>
        <h2>Inspecting a character&apos;s identity</h2>
        <p>
          Every character has a Unicode code point, a number that uniquely
          identifies it independent of font or encoding. A lookup shows that code
          point, the character name, and the forms you need to embed it: the HTML
          entity, the JavaScript escape, and often the UTF-8 bytes. It is how you
          answer &quot;what exactly is this character?&quot;
        </p>
        <h3>Code point vs the forms around it</h3>
        <p>
          The code point for the euro sign is <code>U+20AC</code>. In HTML you can
          write it as <code>&amp;#8364;</code> or the named entity{' '}
          <code>&amp;euro;</code>. In a JavaScript string it is{' '}
          <code>\\u20AC</code>. These are different spellings of the same
          character, each needed in a different context.
        </p>
        <h3>Example</h3>
        <pre><code>{`Character: €
Code point: U+20AC (8364)
HTML:       &#8364;  or  &euro;
JS escape:  \\u20AC
UTF-8:      E2 82 AC`}</code></pre>
        <h3>Code points, code units, and graphemes</h3>
        <p>
          This is where confusion lives. A code point above <code>U+FFFF</code>,
          like many emoji, needs a surrogate pair in JavaScript, so{' '}
          <code>&quot;&#128512;&quot;.length</code> is 2, not 1. And what looks
          like one character on screen, a grapheme, can be several code points: a
          base letter plus combining accents, or an emoji with a skin-tone
          modifier. Normalization forms (NFC, NFD) let you convert between a
          precomposed accented letter and its decomposed base-plus-mark version,
          which matters for reliable string comparison.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is my string length wrong for emoji?</strong> JavaScript
          counts UTF-16 code units; characters beyond the basic plane use two,
          inflating the length. Converting the bytes is a job for the{' '}
          <a href="/tools/text-to-binary">text to binary</a> tool.
        </p>
        <p>
          <strong>Two strings look identical but are not equal, why?</strong> One
          uses a precomposed character and the other a base plus combining mark.
          Normalize both to NFC before comparing.
        </p>
        <p>
          <strong>What is the difference between &amp;#8364; and &amp;euro;?</strong>{' '}
          The first is a numeric reference by code point, the second a named
          entity. Both produce the same character; numeric works for any code
          point.
        </p>
      </>
    ),
  },

  'mime-lookup': {
    body: (
      <>
        <h2>Matching extensions to content types</h2>
        <p>
          A MIME type, or media type, is the label that tells software what kind
          of data a file holds, like <code>image/png</code> or{' '}
          <code>application/json</code>. It is sent in the HTTP{' '}
          <code>Content-Type</code> header and drives how a browser handles a
          response: render it, download it, or run it. A lookup maps a file
          extension to its canonical type, or searches types by keyword.
        </p>
        <h3>Why the server header wins</h3>
        <p>
          The file extension is a hint for humans; the <code>Content-Type</code>{' '}
          header is what the browser trusts. Serve a JSON file with{' '}
          <code>text/plain</code> and a <code>fetch</code> expecting JSON may
          refuse it. Serve a script with the wrong type and strict browsers block
          it. Getting the mapping right on your server avoids a long tail of
          &quot;it works locally but not deployed&quot; bugs.
        </p>
        <h3>Example</h3>
        <pre><code>{`.json  -> application/json
.svg   -> image/svg+xml
.woff2 -> font/woff2
.wasm  -> application/wasm
.md    -> text/markdown`}</code></pre>
        <h3>The structure of a type</h3>
        <p>
          A media type is <code>type/subtype</code>, optionally with parameters
          like <code>; charset=utf-8</code>. The <code>+xml</code> and{' '}
          <code>+json</code> suffixes signal the underlying structure, so{' '}
          <code>image/svg+xml</code> is an image that is also XML. For text
          formats, declaring the charset prevents mojibake from a mis-guessed
          encoding.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>My .js file is served as text/plain, is that a problem?</strong>{' '}
          Yes for modules; browsers require a JavaScript type for{' '}
          <code>type=&quot;module&quot;</code> scripts. Configure the server to
          send <code>text/javascript</code>.
        </p>
        <p>
          <strong>Is there one correct type per extension?</strong> Mostly, but a
          few extensions have several registered types, and some types predate a
          formal registration, so lists can disagree at the edges.
        </p>
        <p>
          <strong>Does the extension decide the type automatically?</strong> Only
          if your server is configured to map it. The extension itself carries no
          authority over the wire.
        </p>
      </>
    ),
  },

  'url-parser': {
    body: (
      <>
        <h2>Breaking a URL into parts</h2>
        <p>
          A URL packs several components into one string: the protocol, host,
          optional port, path, query string, and fragment. A parser splits them
          out so you can read or manipulate each piece without fragile string
          slicing. The structure follows a well-defined grammar, which is why a
          proper parser beats hand-written splitting on <code>?</code> and{' '}
          <code>/</code>.
        </p>
        <h3>The anatomy</h3>
        <p>
          Take{' '}
          <code>https://user@ex.com:8080/path?q=1&amp;sort=asc#top</code>. The
          scheme is <code>https</code>, the host <code>ex.com</code>, the port{' '}
          <code>8080</code>, the path <code>/path</code>, the query{' '}
          <code>q=1&amp;sort=asc</code>, and the fragment <code>top</code>. The
          fragment after <code>#</code> is never sent to the server; it is purely
          client-side.
        </p>
        <h3>Example</h3>
        <pre><code>{`https://ex.com:8080/a/b?x=1&y=2#sec
protocol: https:
host:     ex.com
port:     8080
path:     /a/b
query:    x=1&y=2  -> { x: "1", y: "2" }
hash:     #sec`}</code></pre>
        <h3>Query strings are trickier than they look</h3>
        <p>
          A key can appear more than once, so <code>a=1&amp;a=2</code> is a list,
          not a single value, and different frameworks handle that differently.
          Values are percent-encoded, so a parser should decode them; a raw split
          leaves <code>%20</code> in place. For encoding values before you build a
          URL, use the <a href="/tools/url-encode-decode">URL encoder</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is my fragment missing on the server?</strong> By design.
          Everything after <code>#</code> stays in the browser and is never sent
          in the request.
        </p>
        <p>
          <strong>What happens with no explicit port?</strong> It defaults by
          scheme: 443 for https, 80 for http. Parsers often leave the port blank
          to signal the default.
        </p>
        <p>
          <strong>How are duplicate query keys handled?</strong> It varies.
          Some keep the first, some the last, some collect all into an array, so
          check your framework&apos;s rule.
        </p>
      </>
    ),
  },

  'user-agent-parser': {
    body: (
      <>
        <h2>Reading a User-Agent string</h2>
        <p>
          The User-Agent header is a string browsers send that, in theory,
          identifies the browser, its version, the operating system, and the
          device. A parser extracts those fields. In practice the format is a
          historical mess, full of legacy tokens kept only for backward
          compatibility, which is why parsing it reliably is harder than it
          should be.
        </p>
        <h3>Why it is so cluttered</h3>
        <p>
          Nearly every browser still claims to be <code>Mozilla/5.0</code> for
          compatibility reasons dating to the 1990s, and Chrome, Edge, and others
          include tokens like <code>Safari</code> and <code>AppleWebKit</code> so
          old server-side sniffing still serves them modern pages. The real
          identity is buried among the compatibility fluff.
        </p>
        <h3>Example</h3>
        <pre><code>{`Mozilla/5.0 (Windows NT 10.0; Win64; x64)
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/120.0 Safari/537.36

Browser: Chrome 120
OS:      Windows 10
Device:  Desktop`}</code></pre>
        <h3>Do not over-trust it</h3>
        <p>
          A User-Agent is self-reported and trivially spoofed, so it is unreliable
          for security decisions. Browsers are also freezing and reducing it for
          privacy, moving detail into Client Hints instead. For feature decisions,
          detect the capability directly rather than inferring it from the string.
          Need realistic samples to test with? See the{' '}
          <a href="/tools/user-agent-generator">User-Agent generator</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does Chrome&apos;s UA mention Safari?</strong> For legacy
          compatibility. Chrome includes <code>Safari</code> and{' '}
          <code>AppleWebKit</code> tokens so older sites treat it as a modern
          WebKit browser.
        </p>
        <p>
          <strong>Can I trust the OS it reports?</strong> Only loosely. It can be
          spoofed, and reduced UA strings now report a coarse platform rather than
          a precise version.
        </p>
        <p>
          <strong>How do I tell a bot from a browser?</strong> Many crawlers name
          themselves (<code>Googlebot</code>, <code>bingbot</code>), but malicious
          ones impersonate browsers, so the string alone is not proof.
        </p>
      </>
    ),
  },

  'user-agent-generator': {
    body: (
      <>
        <h2>Realistic User-Agent strings on demand</h2>
        <p>
          A generator produces ready-to-use User-Agent strings for common
          browsers, operating systems, and known bots. The point is to grab a
          plausible, correctly formatted string for testing: checking how your
          site responds to different clients, seeding a request header in a
          script, or reproducing a device-specific bug.
        </p>
        <h3>Legitimate uses</h3>
        <p>
          Setting a User-Agent is normal and expected. Automated tests set one so
          analytics can distinguish them. API clients identify themselves so a
          server operator can contact them if something misbehaves. QA teams swap
          strings to verify responsive layouts and server-side device handling.
        </p>
        <h3>Example</h3>
        <pre><code>{`Chrome on macOS:
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)
AppleWebKit/537.36 (KHTML, like Gecko)
Chrome/120.0 Safari/537.36

Googlebot:
Mozilla/5.0 (compatible; Googlebot/2.1;
+http://www.google.com/bot.html)`}</code></pre>
        <h3>Keep them current and honest</h3>
        <p>
          Version numbers age quickly; a UA claiming a years-old Chrome build
          stands out and can get flagged. If you are identifying a bot you
          operate, name it honestly and include a contact URL, the way the major
          crawlers do, rather than impersonating a real browser. Spoofing a UA to
          evade blocks or scrape against a site&apos;s terms is a different matter
          and often against those terms. To inspect any string you receive, use
          the <a href="/tools/user-agent-parser">User-Agent parser</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Will setting a UA make me look like a real user?</strong> Not on
          its own. Sites also look at behavior, TLS fingerprints, and Client
          Hints, so the string is only one signal.
        </p>
        <p>
          <strong>Why avoid an outdated version string?</strong> It is
          inconsistent with other modern signals your client sends, which makes it
          an obvious tell and can trigger blocks.
        </p>
        <p>
          <strong>What should my own bot&apos;s UA say?</strong> A clear product
          name, a version, and a URL or email so operators can reach you. Honesty
          keeps you unblocked.
        </p>
      </>
    ),
  },

  'semver-calculator': {
    body: (
      <>
        <h2>Bumping and comparing semantic versions</h2>
        <p>
          Semantic Versioning gives a version three numbers,{' '}
          <code>MAJOR.MINOR.PATCH</code>, each with a defined meaning. A calculator
          bumps the right part for a change and compares two versions to tell you
          which is newer. The discipline is what lets dependency ranges work
          safely.
        </p>
        <h3>What each number means</h3>
        <p>
          You raise MAJOR for a breaking change, MINOR for a backward-compatible
          feature, and PATCH for a backward-compatible bug fix. Bumping a higher
          part resets the lower ones to zero: a minor bump of <code>1.4.3</code>{' '}
          is <code>1.5.0</code>, not <code>1.5.3</code>. That reset trips people
          up constantly.
        </p>
        <h3>Example</h3>
        <pre><code>{`1.4.3  patch -> 1.4.4
1.4.3  minor -> 1.5.0
1.4.3  major -> 2.0.0

Precedence:
1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-beta < 1.0.0`}</code></pre>
        <h3>Pre-release and build metadata</h3>
        <p>
          A pre-release tag like <code>-alpha.1</code> sorts before the normal
          release, so <code>1.0.0-rc.1</code> is older than <code>1.0.0</code>.
          Comparison of pre-release identifiers is part numeric, part
          lexicographic, which is why <code>alpha.2</code> comes before{' '}
          <code>alpha.10</code>. Build metadata after a <code>+</code> is ignored
          entirely for precedence; two versions differing only in build metadata
          rank equal.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Is 1.10.0 newer than 1.9.0?</strong> Yes. Each part is compared
          as a number, not as text, so 10 is greater than 9 despite the extra
          digit.
        </p>
        <p>
          <strong>Why does my pre-release sort as older?</strong> By spec a
          pre-release has lower precedence than its matching release, so{' '}
          <code>2.0.0-beta</code> is less than <code>2.0.0</code>.
        </p>
        <p>
          <strong>What about a leading zero like 1.01.0?</strong> That is invalid
          semver; numeric parts must not have leading zeros.
        </p>
      </>
    ),
  },

  'byte-converter': {
    body: (
      <>
        <h2>Decimal vs binary data sizes</h2>
        <p>
          Data size has two unit families that look alike and cause endless
          confusion. Decimal units (KB, MB, GB) are powers of 1000. Binary units
          (KiB, MiB, GiB) are powers of 1024. A kilobyte is 1000 bytes; a kibibyte
          is 1024. The gap compounds: a &quot;1 TB&quot; drive holds about 931 GiB
          as the OS counts it, which is why a new disk looks smaller than
          advertised.
        </p>
        <h3>Who uses which</h3>
        <p>
          Storage vendors advertise in decimal, so a drive labeled 500 GB is
          500,000,000,000 bytes. Operating systems often report in binary while
          using the decimal abbreviation, which is the root of the apparent
          shortfall. RAM is always binary. Network speeds are usually decimal, and
          in bits, not bytes.
        </p>
        <h3>Example</h3>
        <pre><code>{`1 KB  = 1000 bytes
1 KiB = 1024 bytes

1 GB  = 1,000,000,000 bytes
1 GiB = 1,073,741,824 bytes

"1 TB" drive -> ~0.909 TiB`}</code></pre>
        <h3>Bits vs bytes</h3>
        <p>
          A byte is 8 bits. Network throughput is quoted in bits per second
          (Mbps), while file sizes are in bytes, so a 100 Mbps link transfers
          about 12.5 MB per second at best. Mixing the two is a classic off-by-8
          error. For converting the underlying number between bases, the{' '}
          <a href="/tools/number-base-converter">number base converter</a> helps.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does my 1 TB drive show as 931 GB?</strong> The drive is 1
          trillion decimal bytes, but the OS divides by 1024 three times and
          labels the binary result with a decimal abbreviation.
        </p>
        <p>
          <strong>Is KB the same as KiB?</strong> Strictly no: 1000 vs 1024 bytes.
          Casually people use KB for both, which is exactly where the ambiguity
          comes from.
        </p>
        <p>
          <strong>Why is my download slower than my connection speed?</strong>{' '}
          Speed is in bits, downloads in bytes; divide the advertised rate by 8,
          then subtract overhead.
        </p>
      </>
    ),
  },

  'crontab-describe': {
    body: (
      <>
        <h2>Reading a cron expression in plain English</h2>
        <p>
          A cron expression is five fields that define a schedule: minute, hour,
          day of month, month, and day of week. The syntax is terse and easy to
          misread, so a describer translates it into a sentence like &quot;at 9:30
          AM every weekday.&quot; That sanity check catches scheduling mistakes
          before they run at the wrong time for weeks.
        </p>
        <h3>The five fields</h3>
        <p>
          Reading left to right: minute (0-59), hour (0-23), day of month (1-31),
          month (1-12), day of week (0-6, where 0 is Sunday). An asterisk means
          every value. A <code>*/5</code> means every fifth, a range{' '}
          <code>1-5</code> means Monday through Friday in the weekday field, and a
          list <code>1,15</code> means those specific values.
        </p>
        <h3>Example</h3>
        <pre><code>{`30 9 * * 1-5
= at 09:30, Monday through Friday

0 */6 * * *
= every 6 hours, on the hour

15 0 1 * *
= at 00:15 on the 1st of every month`}</code></pre>
        <h3>The day-of-month and day-of-week trap</h3>
        <p>
          When both the day-of-month and day-of-week fields are restricted (not{' '}
          <code>*</code>), most cron implementations treat them as an OR, not an
          AND. So <code>0 0 13 * 5</code> runs on the 13th of the month and on
          every Friday, not only on Friday the 13th. This surprises almost
          everyone the first time.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does cron run in my local time?</strong> It runs in the
          system&apos;s timezone, which may be UTC on a server. A job set for 9 AM
          can fire at the wrong local hour if the timezone differs.
        </p>
        <p>
          <strong>Why did my Friday-the-13th job run too often?</strong> Because
          day-of-month and day-of-week combine with OR when both are set, so it
          matched every 13th and every Friday.
        </p>
        <p>
          <strong>Is Sunday 0 or 7?</strong> Many crons accept both 0 and 7 for
          Sunday, but to avoid surprises stick to 0.
        </p>
      </>
    ),
  },

  'js-beautifier': {
    body: (
      <>
        <h2>Un-minifying JavaScript</h2>
        <p>
          A beautifier takes minified or messy JavaScript and reformats it with
          consistent indentation, line breaks, and spacing so it is readable. It
          only changes layout, not behavior; the parsed program is identical. This
          is the reverse of minification, which strips whitespace to shrink files
          for delivery.
        </p>
        <h3>When you need it</h3>
        <p>
          The usual case is inspecting a bundled or minified script from a web
          page to understand what it does, debugging a vendor file with no source
          map, or cleaning up code that was pasted without formatting. It also
          helps when diffing two scripts, since consistent formatting makes real
          changes stand out instead of drowning in whitespace noise.
        </p>
        <h3>Example</h3>
        <pre><code>{`Minified:
function f(a,b){return a>b?a:b}

Beautified:
function f(a, b) {
  return a > b ? a : b;
}`}</code></pre>
        <h3>Beautifying is not un-mangling</h3>
        <p>
          A key limit: minifiers also rename variables to short names like{' '}
          <code>a</code>, <code>b</code>, and <code>n</code>, and a beautifier
          cannot recover the original names. You get readable structure but not
          meaningful identifiers. Formatting choices like semicolon insertion and
          whether to expand single-line blocks are configurable and can differ
          from the author&apos;s original style.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Will it get my variable names back?</strong> No. Minification
          discards them; beautifying only restores whitespace and layout, not the
          lost names.
        </p>
        <p>
          <strong>Can it break my code?</strong> It should not change behavior,
          but auto-inserted semicolons on code that relied on ASI quirks is a rare
          edge; verify the output runs.
        </p>
        <p>
          <strong>Does it work on JSON too?</strong> JSON is a subset, so it will
          format, but a dedicated{' '}
          <a href="/tools/json-formatter">JSON formatter</a> validates structure
          and reports errors a JS beautifier may not.
        </p>
      </>
    ),
  },
}
