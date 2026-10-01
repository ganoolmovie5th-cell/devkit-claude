import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'bcrypt vs SHA-256 for Passwords: Why Fast Hashing Is Wrong | DevKit Blog',
  description: 'Why SHA-256 is the wrong choice for passwords, how bcrypt uses salting and a cost factor to stay slow, the 72-byte limit, and when to pick argon2 or scrypt instead.',
  alternates: { canonical: '/blog/bcrypt-vs-sha256-for-passwords/' },
  keywords: 'bcrypt vs sha256, password hashing, bcrypt cost factor, password salt, argon2 scrypt, bcrypt 72 byte limit',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">bcrypt vs SHA-256 for Passwords: Why Fast Hashing Is Wrong</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <p>A frequent and dangerous mistake is storing passwords with SHA-256. It is a hash, it produces a fixed-length output, and it feels secure. For passwords, though, it is the wrong tool, and the reason comes down to a property that makes SHA-256 excellent everywhere else: speed.</p>

      <h2>Why fast hashing fails for passwords</h2>
      <p>SHA-256 is designed to be fast. A modern GPU can compute billions of SHA-256 hashes per second. That is wonderful for verifying file integrity, but it is a catastrophe for passwords. If an attacker steals your database, they do not try to reverse the hash; they guess common passwords, hash each guess, and compare. The faster the hash, the more guesses per second, and billions of guesses per second means weak passwords fall almost instantly.</p>
      <p>Plain SHA-256 has a second problem: identical passwords produce identical hashes. An attacker can precompute a huge table of common passwords and their hashes once, then match it against any database. These are called rainbow tables.</p>

      <h2>What a password hash actually needs</h2>
      <p>A password hashing function should be deliberately slow and should produce a different output for the same input every time. Two mechanisms deliver this: a salt and a cost factor.</p>
      <p>A <strong>salt</strong> is a random value mixed into each password before hashing. Because every password gets a unique salt, two users with the same password end up with different stored hashes, and precomputed rainbow tables become useless.</p>
      <p>A <strong>cost factor</strong> makes the function run a tunable number of iterations. As hardware gets faster, you raise the cost to keep the function slow enough that mass guessing stays impractical.</p>

      <h2>How bcrypt handles this</h2>
      <p>bcrypt builds both features in. It generates a salt for you, applies a configurable cost factor, and packages everything into a single self-describing string:</p>
      <pre><code>{`$2b$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW
 |  |  |                     |
 |  |  |                     +-- 31-char salt + hash
 |  |  +-- cost factor (12)
 |  +-- (minor version)
 +-- algorithm identifier`}</code></pre>
      <p>Everything needed to verify a password later lives inside that one string: the algorithm, the cost, and the salt. You store the whole thing in a single column. When a user logs in, bcrypt reads the cost and salt back out of the stored hash, applies them to the submitted password, and compares. There is no separate salt column to manage.</p>
      <p>The cost factor is a power of two for the work involved. Raising it from 10 to 11 roughly doubles the time to compute each hash. A value in the range of 10 to 12 is a reasonable starting point on current hardware; measure on your own servers and pick the highest value your login latency can tolerate.</p>

      <h2>The 72-byte limit</h2>
      <p>bcrypt only considers the first 72 bytes of the input. Anything beyond that is silently ignored, so a very long passphrase can have its tail truncated without warning. This rarely matters for ordinary passwords, but it causes a subtle bug in one specific pattern: pre-hashing. Some developers run a password through SHA-256 first and feed the hex result into bcrypt, which can run into both the length limit and null-byte issues depending on encoding. If you need to support arbitrarily long inputs, prefer a function without this constraint rather than stacking hashes.</p>

      <h2>argon2 and scrypt</h2>
      <p>bcrypt is a solid, battle-tested choice, but it is not the only one. Both scrypt and argon2 add memory hardness, meaning they require a large amount of memory as well as time. This matters because attackers increasingly use GPUs and custom hardware that can parallelize cheap-memory work; forcing high memory usage levels the field.</p>
      <p><strong>argon2</strong>, specifically the argon2id variant, is the current recommendation for new systems from most security guidance. It lets you tune time, memory, and parallelism independently. <strong>scrypt</strong> is a good older option with similar memory-hard properties. If your platform offers argon2id, it is the strongest default; if not, bcrypt remains perfectly acceptable.</p>

      <h2>Practical rules</h2>
      <ul>
        <li>Never use a fast general-purpose hash such as SHA-256 or MD5 for passwords.</li>
        <li>Use bcrypt, scrypt, or argon2id, all of which salt automatically.</li>
        <li>Store the full hash string; do not try to split out the salt yourself.</li>
        <li>Tune the cost or memory parameters to the slowest value your login flow can accept, and revisit it as hardware improves.</li>
        <li>Compare hashes with the library verify function, which uses constant-time comparison, rather than a plain string equality check.</li>
      </ul>
      <p>To see what a bcrypt hash looks like for a given input and cost, try the <Link href="/tools/bcrypt-generator">bcrypt Generator</Link>. And if you want to understand the contrast firsthand, run the same text through the <Link href="/tools/hash-generator">Hash Generator</Link> and notice how a SHA-256 digest appears instantly, which is exactly the speed you do not want guarding a password.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/bcrypt-generator" className="text-sm text-blue-600 hover:underline">bcrypt Generator</Link>
          <Link href="/tools/hash-generator" className="text-sm text-blue-600 hover:underline">Hash Generator</Link>
        </div>
      </div>
    </article>
  )
}
