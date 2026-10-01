import type { ToolArticle } from './index'

export const batch2: Record<string, ToolArticle> = {
  'lorem-ipsum-generator': {
    body: (
      <>
        <h2>Why designers reach for placeholder text</h2>
        <p>
          Lorem ipsum is scrambled Latin derived from a passage of Cicero that
          has been used as filler copy since the 1500s. It exists for one
          reason: when you are reviewing a layout, real sentences pull your eye
          toward the meaning of the words instead of the shape of the page.
          Nonsense text lets a reviewer judge line length, leading, and visual
          rhythm without getting distracted by a half-written headline.
        </p>
        <p>
          Reach for a generator when you are mocking up a blog card, filling a
          Figma component, seeding a database with sample rows, or stress
          testing how a container behaves when a paragraph runs long. The point
          is realistic volume and word distribution, not real meaning.
        </p>
        <h3>Picking the right amount</h3>
        <p>
          Most generators let you request output by paragraphs, sentences, or
          words. A single UI label needs a few words; a hero subtitle needs a
          sentence; an article body needs several paragraphs. Generating more
          than you need and trimming is usually faster than regenerating.
        </p>
        <pre><code>{`Request: 2 sentences

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.`}</code></pre>
        <p>
          Some tools can start the block with the canonical opening so the text
          reads as expected, then randomize the rest:
        </p>
        <pre><code>{`Request: 1 paragraph, start with "Lorem ipsum"

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod
malesuada.`}</code></pre>
        <h3>Common questions</h3>
        <p>
          <strong>Should placeholder text ever ship to production?</strong> No.
          Lorem ipsum left in a live page is a classic embarrassment and also
          hurts SEO because search engines index it. Treat it as scaffolding
          and search your codebase for &quot;lorem&quot; before you deploy.
        </p>
        <p>
          <strong>Does it have to be Latin?</strong> Not at all. Latin is
          conventional because it looks like Western prose while being
          unreadable, which keeps reviewers focused on design. If you are
          testing a non-Latin script, use filler in that script so line
          breaking and glyph width behave realistically.
        </p>
        <p>
          <strong>Will the same text pass a duplicate-content check?</strong>
          Classic lorem ipsum appears on millions of pages, so never use it as
          real content. For varied dummy data, generate fresh randomized blocks
          each time rather than copying one block everywhere.
        </p>
        <p>
          Need to populate a sample dataset instead of prose? Pair this with a{' '}
          <a href="/tools/json-to-csv">JSON to CSV converter</a> to turn
          generated records into a spreadsheet-friendly file.
        </p>
      </>
    ),
  },

  'html-entity-encode-decode': {
    body: (
      <>
        <h2>What HTML entities actually solve</h2>
        <p>
          A browser reads certain characters as markup, not text. An angle
          bracket starts a tag, an ampersand starts an entity, and quotes close
          attribute values. If you drop raw user input containing those
          characters into a page, the browser can misinterpret it, break your
          layout, or run injected script. HTML entity encoding replaces those
          reserved characters with safe escape sequences so they render as
          literal text.
        </p>
        <p>
          The core four are the ones you will use constantly: ampersand becomes
          <code> &amp;amp;</code>, less-than becomes <code>&amp;lt;</code>,
          greater-than becomes <code>&amp;gt;</code>, and a double quote becomes
          <code> &amp;quot;</code>. There are thousands more named entities for
          symbols and accented letters, plus numeric forms like{' '}
          <code>&amp;#169;</code> for the copyright sign.
        </p>
        <h3>Encode vs decode</h3>
        <p>
          Encoding goes from readable text to entity form, which is what you do
          before inserting untrusted content into HTML. Decoding reverses it,
          useful when you have scraped markup or pulled a value out of a feed
          that double-escaped it.
        </p>
        <pre><code>{`Encode
Input:  <script>alert("hi")</script>
Output: &lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;`}</code></pre>
        <p>
          Because the brackets are now entities, the browser prints the text
          verbatim instead of executing a script tag, which is the whole point
          of escaping output to prevent XSS.
        </p>
        <pre><code>{`Decode
Input:  Tom &amp; Jerry &mdash; season 1
Output: Tom & Jerry — season 1`}</code></pre>
        <h3>Questions people run into</h3>
        <p>
          <strong>Do I need to encode every character?</strong> No. Encode the
          reserved characters relevant to the context. Inside HTML text the four
          core entities are enough; inside an attribute value, be sure the quote
          character is escaped. Over-encoding ordinary letters just bloats the
          markup.
        </p>
        <p>
          <strong>Is encoding the same as sanitizing?</strong> They are
          different jobs. Encoding makes content safe to display as text.
          Sanitizing strips or allows specific tags when you actually want to
          render some HTML. If you only need to show user text, encoding is the
          simpler and safer choice.
        </p>
        <p>
          <strong>Why did my text turn into &amp;amp;amp;?</strong> That is
          double encoding: something escaped an already-escaped string. Decode
          once to recover the original, and make sure only one layer of your
          stack is responsible for encoding.
        </p>
      </>
    ),
  },

  'css-minifier': {
    body: (
      <>
        <h2>What minifying CSS does and does not do</h2>
        <p>
          A CSS minifier shrinks a stylesheet by removing everything the browser
          does not need to apply the rules: comments, line breaks, indentation,
          the spaces around colons and braces, and the final semicolon in a
          block. It does not change which rules exist or how they cascade. The
          rendered result is byte-for-byte identical in behavior, just delivered
          in fewer bytes.
        </p>
        <p>
          Smaller files matter because CSS is render-blocking. The browser will
          not paint until it has parsed your stylesheet, so trimming kilobytes
          off a large file shaves real time off first paint, especially on slow
          mobile connections where every byte travels over the air.
        </p>
        <h3>A concrete before and after</h3>
        <pre><code>{`/* Primary button */
.btn-primary {
    background-color: #3366ff;
    padding: 12px 24px;
    border-radius: 8px;
}`}</code></pre>
        <p>Minified, the same rule collapses to:</p>
        <pre><code>{`.btn-primary{background-color:#36f;padding:12px 24px;border-radius:8px}`}</code></pre>
        <p>
          Notice the comment is gone, the whitespace is gone, the trailing
          semicolon is gone, and <code>#3366ff</code> was safely shortened to
          <code> #36f</code> because the hex pair repeats. Those are the only
          kinds of changes a good minifier makes, and none of them alter the
          visual output.
        </p>
        <h3>Questions worth answering</h3>
        <p>
          <strong>Will minifying break my selectors or specificity?</strong> No.
          Minification is a text transformation, not a rewrite of your logic.
          Selectors, media queries, and the order of declarations are preserved,
          so the cascade behaves exactly as before.
        </p>
        <p>
          <strong>Should I keep an unminified copy?</strong> Yes. Minified CSS
          is hard to read and debug, so keep the readable source in version
          control and minify as a build step. Ship the small file, develop
          against the big one, and generate a source map if you need to trace
          rules in dev tools.
        </p>
        <p>
          <strong>Does it merge duplicate rules?</strong> Plain minification
          only removes whitespace and comments. Heavier optimizers can merge or
          dedupe rules, but that is a separate, riskier transformation. If you
          only want safe size reduction, basic minification is the predictable
          choice.
        </p>
        <p>
          Doing the same for scripts? See the{' '}
          <a href="/tools/js-minifier">JavaScript minifier</a>, which follows
          the same philosophy of stripping bytes without changing behavior.
        </p>
      </>
    ),
  },

  'js-minifier': {
    body: (
      <>
        <h2>Shrinking JavaScript without changing what it does</h2>
        <p>
          A JavaScript minifier reduces file size by removing comments and
          whitespace and, unlike CSS, by renaming local variables to short
          names. A variable called <code>itemCount</code> inside a function can
          safely become <code>a</code> because nothing outside that scope refers
          to it. The code still runs the same; it just takes fewer characters to
          express.
        </p>
        <p>
          This matters because JavaScript has a double cost: the bytes have to
          download, and then the engine has to parse and compile them. A smaller
          bundle improves both. On content-heavy pages the savings from renaming
          and dead-code removal can be substantial.
        </p>
        <h3>A real transformation</h3>
        <pre><code>{`// Add tax to a price
function withTax(price, rate) {
  const total = price + price * rate;
  return total;
}`}</code></pre>
        <p>Minified, that becomes roughly:</p>
        <pre><code>{`function withTax(e,t){return e+e*t}`}</code></pre>
        <p>
          The comment is gone, the intermediate <code>total</code> variable is
          inlined, and the parameters are shortened. The function name stayed
          because it may be called from elsewhere. The behavior is identical: a
          price and a rate go in, a taxed total comes out.
        </p>
        <h3>Things that trip people up</h3>
        <p>
          <strong>Will minification break my code?</strong> Safe minifiers
          preserve behavior, but they assume valid JavaScript. Code that relies
          on reading a function or variable name as a string, or on
          non-standard tricks, can break. Keep your minified build covered by
          the same tests as your source.
        </p>
        <p>
          <strong>Is minifying the same as obfuscating?</strong> No. Minifying
          aims for small size and renames variables as a side effect.
          Obfuscation deliberately makes code hard to read as a goal. Minified
          code is still fully functional and can be reverse-engineered; it is
          not a security measure.
        </p>
        <p>
          <strong>Why ship a source map?</strong> Minified code is unreadable in
          the browser, so a source map lets dev tools map an error on line one,
          column five thousand back to the original file and line. Generate the
          map during your build and keep it out of the public bundle if you do
          not want to expose source.
        </p>
        <p>
          For stylesheets, the companion step is the{' '}
          <a href="/tools/css-minifier">CSS minifier</a>.
        </p>
      </>
    ),
  },

  'sql-formatter': {
    body: (
      <>
        <h2>Why a long query needs formatting</h2>
        <p>
          SQL ignores whitespace, so a query runs the same whether it is on one
          line or fifty. But humans do not read it the same way. A reporting
          query with several joins, a nested subquery, and a long filter becomes
          almost impossible to review when it arrives as a single wall of text,
          which is exactly how query builders and ORMs tend to emit it. A
          formatter reindents the statement into a consistent, readable shape so
          you can see the structure at a glance.
        </p>
        <p>
          Formatting shines during code review, when debugging a slow query, and
          when you inherit SQL from a logging tool. Lining up the clauses makes
          it obvious which tables are joined on what, and where a condition
          belongs.
        </p>
        <h3>From a wall of text to a readable shape</h3>
        <pre><code>{`select id,name,email from users u join orders o on o.user_id=u.id where o.total>100 and u.active=1 order by o.created_at desc`}</code></pre>
        <p>A formatter turns that into:</p>
        <pre><code>{`SELECT id, name, email
FROM users u
JOIN orders o ON o.user_id = u.id
WHERE o.total > 100
  AND u.active = 1
ORDER BY o.created_at DESC;`}</code></pre>
        <p>
          Keywords are uppercased, each major clause starts a new line, and the
          <code> AND</code> is indented under <code>WHERE</code> so the filter
          reads as one group. Nothing about the query logic changed.
        </p>
        <h3>Questions people ask</h3>
        <p>
          <strong>Does formatting change my results or performance?</strong> No.
          Whitespace and letter case of keywords do not affect the execution
          plan or the rows returned. Formatting is purely about readability. If a
          query is slow, format it first so you can actually read the plan, then
          optimize indexes and joins.
        </p>
        <p>
          <strong>Does it understand every SQL dialect?</strong> Core SQL
          formats cleanly everywhere, but dialect-specific syntax (Postgres
          JSON operators, SQL Server bracketed identifiers, MySQL backticks) can
          differ. Pick the dialect option that matches your database so quoting
          and functions are handled correctly.
        </p>
        <p>
          <strong>Will it uppercase my table and column names?</strong> A good
          formatter only changes the case of keywords, not identifiers, because
          some databases treat identifier case as significant. Your table names
          stay exactly as you wrote them.
        </p>
      </>
    ),
  },

  'cron-expression-generator': {
    body: (
      <>
        <h2>Reading a cron expression</h2>
        <p>
          Cron is the scheduler that has run background jobs on Unix systems for
          decades. A standard cron expression has five fields separated by
          spaces, in this order: minute, hour, day of month, month, and day of
          week. Each field accepts a number, a list, a range, or a step. The
          hard part is not writing the expression, it is reading it correctly a
          month later, which is exactly what a generator helps with.
        </p>
        <pre><code>{`*  *  *  *  *
|  |  |  |  |
|  |  |  |  +-- day of week (0-6, Sunday = 0)
|  |  |  +----- month (1-12)
|  |  +-------- day of month (1-31)
|  +----------- hour (0-23)
+-------------- minute (0-59)`}</code></pre>
        <h3>Steps, ranges, and the examples that matter</h3>
        <p>
          The step syntax is where most confusion lives. <code>*/5</code> in the
          minute field means every 5 minutes, not at minute 5. A single number
          means exactly that value. Here are expressions you will reach for
          often:
        </p>
        <pre><code>{`*/5 * * * *     every 5 minutes
0 * * * *       at the top of every hour
30 2 * * *      every day at 02:30
0 9 * * 1-5     at 09:00 Monday through Friday
0 0 1 * *       at midnight on the 1st of each month`}</code></pre>
        <p>
          One real gotcha: when both day-of-month and day-of-week are set to
          something other than <code>*</code>, standard cron treats them as an
          OR, so the job runs when either matches. Keep one of them as a wildcard
          unless you truly mean that OR behavior.
        </p>
        <h3>Questions that come up</h3>
        <p>
          <strong>Which time zone does cron use?</strong> Classic system cron
          runs in the server local time zone, so a schedule can shift an hour
          across daylight saving changes. Many managed schedulers let you pin a
          time zone explicitly; if yours does, set it so 09:00 means 09:00 all
          year.
        </p>
        <p>
          <strong>Why does my five-field expression fail in this tool?</strong>
          Some platforms add a seconds field at the front (six fields) or a
          year field at the end. Quartz-style schedulers in particular use six
          or seven fields. Confirm how many fields your runner expects before
          copying an expression over.
        </p>
        <p>
          <strong>Can I run a job every 90 minutes?</strong> Not cleanly, because
          cron fields do not span across the hour boundary. A step like{' '}
          <code>*/90</code> in the minute field is invalid. You would schedule
          the specific minutes and hours, or run every 30 minutes and skip in
          code.
        </p>
      </>
    ),
  },

  'gitignore-generator': {
    body: (
      <>
        <h2>Keeping the wrong files out of your repo</h2>
        <p>
          A <code>.gitignore</code> file tells Git which paths to leave
          untracked. It exists because every project accumulates files that
          should never be committed: dependency folders that can be
          reinstalled, build output that is regenerated, editor settings that
          are personal, and secrets that must never leave your machine. A
          generator assembles a sensible starting file for your language and
          tooling so you do not forget a critical entry.
        </p>
        <p>
          The patterns are glob-style. A trailing slash matches a directory, a
          leading slash anchors to the repo root, an asterisk matches within a
          path segment, and a leading <code>!</code> re-includes something you
          otherwise excluded.
        </p>
        <h3>A realistic Node example</h3>
        <pre><code>{`# Dependencies
node_modules/

# Build output
dist/
.next/

# Environment secrets
.env
.env.local

# OS and editor cruft
.DS_Store
.vscode/

# Logs
*.log`}</code></pre>
        <p>
          The <code>.env</code> entries are the ones that matter most: committing
          an environment file with API keys is one of the most common and costly
          mistakes, and leaked keys often get scraped within minutes of a push.
        </p>
        <h3>Questions that keep coming up</h3>
        <p>
          <strong>Why is a file still tracked after I ignore it?</strong>{' '}
          <code>.gitignore</code> only affects untracked files. If you already
          committed something, Git keeps tracking it. Remove it from the index
          with <code>git rm --cached path</code> and commit; the file stays on
          disk but leaves the repo.
        </p>
        <p>
          <strong>Should I ignore the lock file?</strong> No. Dependency lock
          files like <code>package-lock.json</code> should be committed so
          everyone installs identical versions. Ignore the installed{' '}
          <code>node_modules</code> folder, not the lock file that describes it.
        </p>
        <p>
          <strong>How do I ignore everything except one file in a folder?</strong>
          Ignore the folder with <code>build/*</code>, then re-include the file
          with <code>!build/keep.txt</code>. Order matters, and you cannot
          re-include a file if its parent directory is fully ignored, so exclude
          the contents rather than the directory itself.
        </p>
      </>
    ),
  },

  'diff-checker': {
    body: (
      <>
        <h2>Seeing exactly what changed</h2>
        <p>
          A diff checker compares two blocks of text and highlights what was
          added, removed, or left unchanged. It is the same idea that powers
          code review, but useful far beyond code: comparing two drafts of a
          contract, spotting the single character that broke a config file, or
          confirming that a pasted value matches the original. The tool does the
          tedious character-by-character comparison your eyes are bad at.
        </p>
        <p>
          Most diff tools work line by line and can also show word-level or
          character-level changes within a line, which matters when a single
          edit is buried in a long paragraph.
        </p>
        <h3>What a diff looks like</h3>
        <pre><code>{`Original                 Changed
----------------------   ----------------------
const port = 3000        const port = 8080
const host = "localhost" const host = "localhost"
                         const debug = true`}</code></pre>
        <p>A unified diff of the same change reads:</p>
        <pre><code>{`  const host = "localhost"
- const port = 3000
+ const port = 8080
+ const debug = true`}</code></pre>
        <p>
          Lines marked <code>-</code> were removed, lines marked <code>+</code>{' '}
          were added, and the unchanged line stays as context. Here a value
          changed and a new line was added, which is instantly clear in the diff
          but easy to miss by eye.
        </p>
        <h3>Common questions</h3>
        <p>
          <strong>Why does the whole line show as changed for a tiny edit?</strong>
          Line-based diffs treat any modified line as a remove plus an add. Turn
          on word or character highlighting to see that only one token actually
          changed, which makes small edits far easier to spot.
        </p>
        <p>
          <strong>Does whitespace count?</strong> By default, yes. A trailing
          space or a tab-versus-spaces change registers as a difference, which
          is often what breaks a file that &quot;looks identical.&quot; Many
          tools offer an option to ignore whitespace when you only care about
          content.
        </p>
        <p>
          <strong>Will the order of the two inputs matter?</strong> It affects
          the labels. Swapping the sides flips additions and deletions, but the
          set of differences is the same. Put the earlier version on the left so
          the plus and minus signs read as a forward change over time.
        </p>
      </>
    ),
  },

  'json-to-csv': {
    body: (
      <>
        <h2>Turning structured data into a spreadsheet</h2>
        <p>
          JSON and CSV solve different problems. JSON stores nested, typed data
          and is what APIs speak; CSV is a flat grid of rows and columns that
          spreadsheets and many analytics tools expect. Converting JSON to CSV
          means mapping a list of objects into a header row plus one data row per
          object, so a non-technical colleague can open the result in Excel or
          Google Sheets.
        </p>
        <p>
          The clean case is an array of flat objects that all share the same
          keys. The keys become the column headers, and each object becomes a
          row.
        </p>
        <pre><code>{`[
  { "id": 1, "name": "Ada",  "role": "admin" },
  { "id": 2, "name": "Grace", "role": "user" }
]`}</code></pre>
        <p>Converts to:</p>
        <pre><code>{`id,name,role
1,Ada,admin
2,Grace,user`}</code></pre>
        <h3>The nested-data problem</h3>
        <p>
          Real JSON is rarely flat. CSV has no concept of a nested object or
          array, so the converter has to flatten. A common approach joins nested
          keys with a dot:
        </p>
        <pre><code>{`[{ "id": 1, "address": { "city": "Jakarta", "zip": "10110" } }]

id,address.city,address.zip
1,Jakarta,10110`}</code></pre>
        <p>
          Arrays inside a record are messier: you either join them into one cell
          or expand them into multiple rows, and the right choice depends on how
          you will use the file.
        </p>
        <h3>Questions people hit</h3>
        <p>
          <strong>What if objects have different keys?</strong> The converter
          should collect the union of all keys as the header and leave an empty
          cell where a record lacks a value. If it only uses the first object,
          later records can silently lose columns, so check that behavior on
          uneven data.
        </p>
        <p>
          <strong>How are commas and quotes inside a value handled?</strong> CSV
          escapes them by wrapping the field in double quotes and doubling any
          internal quote. A name like <code>Smith, Jr.</code> becomes{' '}
          <code>&quot;Smith, Jr.&quot;</code>. Without that escaping, the comma
          would be read as a column break and shift every following field.
        </p>
        <p>
          <strong>Why do my numbers lose a leading zero?</strong> Spreadsheets
          interpret CSV cells, so a zip code like <code>01234</code> can be read
          as the number 1234. That is the spreadsheet, not the conversion. Keep
          such values as text, or import with the column typed as text.
        </p>
      </>
    ),
  },

  'qr-code-generator': {
    body: (
      <>
        <h2>What a QR code actually encodes</h2>
        <p>
          A QR code is a two-dimensional barcode that stores data in a grid of
          black and white modules. A camera reads the pattern and decodes the
          bytes back into text. Most often that text is a URL, but it can just as
          easily be plain text, a Wi-Fi network configuration, contact details
          in vCard format, or a payment string. The code itself is just data;
          what the scanning app does with it depends on the content.
        </p>
        <p>
          Generators are handy for linking a printed poster to a landing page,
          putting a menu behind a sticker on a table, sharing a Wi-Fi password
          without reading it aloud, or adding a scan-to-contact square to a
          business card.
        </p>
        <h3>Error correction and why size changes</h3>
        <p>
          QR codes have four error-correction levels, and this is the setting
          most people overlook. Level L recovers about 7 percent of lost data, M
          about 15 percent, Q about 25 percent, and H about 30 percent. Higher
          correction means the code still scans even if part of it is scratched,
          smudged, or covered by a logo, but it also packs in more modules, so
          the pattern gets denser for the same message.
        </p>
        <pre><code>{`Content: https://example.com/menu
Level L  -> smaller, denser-looking, fragile if damaged
Level H  -> larger grid, survives a logo in the center

Wi-Fi payload format:
WIFI:T:WPA;S:MyNetwork;P:mypassword;;`}</code></pre>
        <p>
          That Wi-Fi string is a real example: a phone that scans it offers to
          join the network directly, which is why the fields follow an exact
          format with the type, SSID, and password.
        </p>
        <h3>Questions worth knowing</h3>
        <p>
          <strong>Why does my code fail to scan?</strong> Usually contrast or
          size. Keep dark modules on a light background, not the reverse, and
          preserve the quiet zone, the empty margin around the code. Printing it
          too small or at low contrast is the most common cause of a code that
          will not read.
        </p>
        <p>
          <strong>Can I put a logo in the middle?</strong> Yes, if you use a
          higher error-correction level like Q or H. The correction data lets the
          scanner reconstruct the modules the logo covers, as long as the logo
          stays modest in size.
        </p>
        <p>
          <strong>Can I change where it points after printing?</strong> Not for a
          static code, because the destination is baked into the pattern. If you
          need to redirect later, encode a short link you control and change
          where that link forwards.
        </p>
      </>
    ),
  },
}
