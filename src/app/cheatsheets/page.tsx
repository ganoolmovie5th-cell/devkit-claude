import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Developer Cheat Sheets — DevKit',
  description: 'Free developer cheat sheets for regex, cron expressions, Git commands, and more.',
  alternates: { canonical: '/cheatsheets/' },
}

const sheets = [
  { slug: 'regex', title: 'Regex Cheat Sheet', description: 'Character classes, quantifiers, anchors, groups, lookaheads, and common patterns.' },
  { slug: 'cron', title: 'Cron Expression Cheat Sheet', description: 'Cron field syntax, special characters, and scheduling examples.' },
  { slug: 'git', title: 'Git Cheat Sheet', description: 'Essential Git commands for branching, merging, stashing, and more.' },
]

export default function CheatSheetsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Developer Cheat Sheets</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Quick references for everyday development tasks.</p>

      <div className="grid gap-4">
        {sheets.map(s => (
          <Link
            key={s.slug}
            href={`/cheatsheets/${s.slug}`}
            className="block p-5 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all"
          >
            <h2 className="font-semibold text-gray-900 dark:text-white">{s.title}</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{s.description}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 prose prose-sm prose-gray dark:prose-invert max-w-none">
        <h2>What are these cheat sheets for?</h2>
        <p>
          Each cheat sheet condenses the syntax you reach for most into a single searchable page, so
          you can confirm a pattern or command without leaving your editor for long-form docs. They
          cover regular expressions, cron scheduling, and Git — three areas where the exact syntax is
          easy to forget and expensive to get wrong.
        </p>
        <p>
          The regex sheet lists character classes, quantifiers, anchors, groups, and lookarounds with
          examples. The cron sheet explains each field and the special characters used to build a
          schedule. The Git sheet groups the everyday commands for branching, merging, stashing, and
          undoing changes. All of them are free, need no account, and load instantly.
        </p>
      </section>
    </div>
  )
}
