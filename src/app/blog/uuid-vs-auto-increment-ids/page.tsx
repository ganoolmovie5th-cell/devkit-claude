import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'UUID vs Auto-Increment IDs: Choosing a Primary Key | DevKit Blog',
  description: 'Compare UUIDs and auto-increment integers as primary keys: distributed uniqueness, enumeration security, index performance, storage size, and when each one fits.',
  alternates: { canonical: '/blog/uuid-vs-auto-increment-ids/' },
  keywords: 'uuid vs auto increment, primary key choice, uuid v4, sortable uuid, database id enumeration, index performance',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">UUID vs Auto-Increment IDs: Choosing a Primary Key</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <p>Every table needs a primary key, and the choice usually comes down to two options: a sequential integer that the database hands out automatically, or a UUID that is generated as a random-looking string. Both work, but they trade off in ways that matter once a system grows. Picking the wrong one early can be painful to undo later.</p>

      <h2>What each one looks like</h2>
      <p>An auto-increment integer is just a counter. The first row is 1, the next is 2, and so on:</p>
      <pre><code>{`id | email
 1 | alice@example.com
 2 | bob@example.com
 3 | carol@example.com`}</code></pre>
      <p>A UUID is a 128-bit value, usually shown as 36 characters with dashes:</p>
      <pre><code>{`id                                   | email
f47ac10b-58cc-4372-a567-0e02b2c3d479 | alice@example.com
9b2e4c6a-7d81-4f33-8a19-5c0b1d2e3f44 | bob@example.com`}</code></pre>

      <h2>Distributed uniqueness</h2>
      <p>Auto-increment relies on a single source of truth to hand out the next number. That works beautifully on one database but becomes awkward when you shard, merge datasets, or generate records on multiple servers at once. Two independent nodes will both happily create an id of 1001.</p>
      <p>UUIDs are designed so that any machine can generate one at any time with a vanishingly small chance of collision, no coordination required. If your records are created in multiple places and later combined, UUIDs remove a whole class of merge conflicts.</p>

      <h2>Security and enumeration</h2>
      <p>Sequential ids leak information. If a user profile lives at <code>/users/42</code>, anyone can guess that <code>/users/41</code> and <code>/users/43</code> exist, count your records, and probe for data they should not see. This is called an enumeration attack, and it is a common real-world weakness.</p>
      <p>A random UUID in the URL cannot be guessed, so attackers cannot walk the sequence or estimate your total count. This is not a substitute for proper authorization checks, which you still need on every request, but it removes an easy avenue of attack.</p>

      <h2>Index performance</h2>
      <p>This is where auto-increment shines. Because new values are always larger than existing ones, inserts append to the end of the index, which keeps the underlying B-tree compact and cache-friendly. Random UUIDs land in arbitrary positions, forcing the index to split pages all over the place. On write-heavy tables this fragmentation shows up as slower inserts and a larger index on disk.</p>
      <p>The effect is real but often overstated for small and medium applications. It becomes a genuine concern at high insert volumes.</p>

      <h2>Storage size</h2>
      <p>A standard integer is 4 bytes and a bigint is 8 bytes. A UUID is 16 bytes stored in binary, or 36 bytes if you carelessly store it as text. That size difference multiplies across every foreign key and every index that references the key, so a UUID-based schema uses noticeably more space. Always store UUIDs in a native UUID or binary column rather than as a string.</p>

      <h2>UUID v4 vs sortable UUIDs</h2>
      <p>The classic UUID v4 is fully random, which is exactly what causes the index fragmentation described above. Newer formats fix this. A sortable identifier, such as UUID v7 or ULID, puts a timestamp in the leading bits so values generated later sort after earlier ones:</p>
      <pre><code>{`v4 (random order):  9b2e4c6a-7d81-...  f47ac10b-58cc-...
v7 (time-ordered):  018f2a... (older)  018f2b... (newer)`}</code></pre>
      <p>These give you the distributed, hard-to-guess qualities of a UUID while behaving like an incrementing value at insert time, which largely neutralizes the performance penalty. For new systems that want UUIDs, a time-ordered format is usually the better default than plain v4.</p>

      <h2>When to pick each</h2>
      <p>Reach for <strong>auto-increment</strong> when you have a single database, write performance is critical, and the ids stay internal where enumeration is not a concern. It is simple, compact, and fast.</p>
      <p>Reach for <strong>UUIDs</strong> when records are created across multiple services, when ids appear in public URLs, or when you need to generate the id before the row is written. Prefer a time-ordered variant to keep inserts healthy.</p>
      <p>A common hybrid keeps an internal auto-increment primary key for joins and performance, while exposing a separate UUID in public-facing URLs. You get the index benefits internally and the non-guessable identifier externally.</p>

      <h2>A practical note</h2>
      <p>Whichever you choose, be consistent across the schema and decide early, because migrating a primary key on a live table with existing foreign keys is tedious and risky. If you need to produce UUIDs for seeding, testing, or wiring up a new table, the <Link href="/tools/uuid-generator">UUID Generator</Link> creates valid values on demand.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/uuid-generator" className="text-sm text-blue-600 hover:underline">UUID Generator</Link>
        </div>
      </div>
    </article>
  )
}
