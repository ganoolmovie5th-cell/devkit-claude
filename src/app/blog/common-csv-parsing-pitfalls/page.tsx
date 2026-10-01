import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Common CSV Parsing Pitfalls and How to Avoid Them | DevKit Blog',
  description: 'CSV looks simple but breaks in subtle ways. Quoting, embedded newlines, CRLF, delimiters, encoding and BOM, lost leading zeros, and type coercion.',
  alternates: { canonical: '/blog/common-csv-parsing-pitfalls/' },
  keywords: 'csv parsing, csv pitfalls, csv quoting, csv delimiter, csv bom, leading zero csv, csv newline',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Common CSV Parsing Pitfalls and How to Avoid Them</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <p>CSV looks like the simplest format in the world: values separated by commas, rows separated by newlines. Then you hand-roll a parser with a split on commas, ship it, and a week later a customer file breaks everything. The format is deceptively full of edge cases, and almost all of them trace back to the gap between what CSV looks like and what the data actually contains.</p>

      <p>Here are the pitfalls that cause the most grief, with concrete examples.</p>

      <h2>Quoting: commas inside fields</h2>
      <p>The moment a value contains a comma, the naive split-on-comma approach falls apart. CSV handles this by wrapping the field in double quotes:</p>
      <pre><code>{`id,name,note
1,"Smith, John",regular customer`}</code></pre>
      <p>That is three fields, not four. The quotes tell the parser the comma is data, not a separator. If you split on every comma you get a mangled row with the name torn in half. This alone is the reason to use a real CSV parser rather than a one-liner.</p>

      <h2>Quotes inside quoted fields</h2>
      <p>Once fields can be quoted, you need a way to put an actual quote character inside one. CSV escapes a double quote by doubling it:</p>
      <pre><code>{`id,quote
1,"She said ""hello"" to me"`}</code></pre>
      <p>The parser reads the doubled quotes as a single literal quote, producing the value: She said "hello" to me. Miss this rule and your quote counting drifts off by one for the rest of the file.</p>

      <h2>Newlines inside fields</h2>
      <p>This is the one that breaks line-by-line readers. A quoted field can contain a literal newline, so a single logical row spans multiple physical lines:</p>
      <pre><code>{`id,address
1,"123 Main St
Apartment 4"`}</code></pre>
      <p>That is one record with two fields, even though it occupies two lines in the file. Any parser that reads a file line by line and treats each line as a row will split this record in two. A correct parser tracks whether it is inside an open quote and keeps reading until the quote closes.</p>

      <h2>CRLF vs LF line endings</h2>
      <p>Different systems end lines differently. Windows tools often write a carriage return plus line feed, while Unix tools write a line feed alone. A parser that only expects one style can leave a stray carriage return character stuck to the end of the last field in every row:</p>
      <pre><code>{`value\\r\\n   -> field becomes "value\\r" instead of "value"`}</code></pre>
      <p>That trailing character is invisible in most editors but makes string comparisons and lookups fail silently. Normalize line endings on read, or use a parser that handles both.</p>

      <h2>The delimiter is not always a comma</h2>
      <p>Despite the name, the separator varies by locale. In many European regions the comma is the decimal mark, so spreadsheets there use a semicolon as the field separator instead:</p>
      <pre><code>{`id;name;amount
1;Mueller;1.234,56`}</code></pre>
      <p>A file exported from a German copy of Excel will not parse with a comma delimiter. When you accept files from users, either detect the delimiter from the first line or let the user specify it. Tab-separated files are common too.</p>

      <h2>Headers are a convention, not a rule</h2>
      <p>CSV has no built-in notion of a header row. The first line is just the first line. Your code decides whether to treat it as column names or as data. Problems appear when that assumption is wrong: a file without headers loses its first real row of data, and a file where you forget headers exist shifts every column name into your dataset. Always make the has-header decision explicit rather than guessing per file.</p>

      <h2>Encoding and the BOM</h2>
      <p>CSV is just text, and text needs an encoding. UTF-8 is the sensible default, but files arrive in many encodings, and a mismatch turns accented characters into garbage. A subtler issue is the byte order mark, a few invisible bytes some tools prepend to UTF-8 files. The BOM attaches itself to the very first field name:</p>
      <pre><code>{`BOM + "id" -> the first header reads as a weird "\\ufeffid"`}</code></pre>
      <p>Now a lookup for the column id fails because the real key has an invisible prefix. Strip the BOM on read, and declare your encoding explicitly rather than relying on whatever the platform guesses.</p>

      <h2>Spreadsheets eat leading zeros</h2>
      <p>This bites anyone who stores zip codes, phone numbers, or product IDs. Open a CSV in a spreadsheet and a value like 00123 gets interpreted as the number 123, dropping the leading zeros. The data was fine in the file; the viewer corrupted it. If a round trip through a spreadsheet is likely, document that these fields are text, and be aware that quoting in the CSV does not stop a spreadsheet from reformatting on display.</p>

      <h2>Everything is a string until you decide otherwise</h2>
      <p>At the file level, every CSV value is text. There is no type information. Your code chooses how to interpret each field, and overeager conversion causes real bugs. A version string like 1.10 becomes 1.1 if parsed as a number. A long numeric ID loses precision when forced into a float. Dates in an ambiguous format like 01/02/2026 flip between January and February depending on locale assumptions. Treat values as strings by default and convert deliberately, field by field, only where you actually need a number or a date.</p>

      <h2>The takeaway</h2>
      <p>Nearly every CSV bug comes from assuming the data is cleaner than it is. Use a tested parser instead of a split, be explicit about delimiter, encoding, and headers, and keep values as text until you have a reason to convert. The format rewards suspicion.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/csv-to-json" className="text-sm text-blue-600 hover:underline">CSV to JSON</Link>
          <Link href="/tools/json-to-csv" className="text-sm text-blue-600 hover:underline">JSON to CSV</Link>
        </div>
      </div>
    </article>
  )
}
