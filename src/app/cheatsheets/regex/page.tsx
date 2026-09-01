import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Regex Cheat Sheet — Quick Reference | DevKit',
  description: 'Complete regex cheat sheet with syntax, quantifiers, anchors, groups, lookaheads, and common patterns for JavaScript, Python, and Go.',
  alternates: { canonical: '/cheatsheets/regex/' },
  keywords: 'regex cheat sheet, regular expression reference, regex patterns',
}

const sections = [
  {
    title: 'Character Classes',
    rows: [
      ['.', 'Any character except newline'],
      ['\\w', 'Word character [a-zA-Z0-9_]'],
      ['\\W', 'Non-word character'],
      ['\\d', 'Digit [0-9]'],
      ['\\D', 'Non-digit'],
      ['\\s', 'Whitespace (space, tab, newline)'],
      ['\\S', 'Non-whitespace'],
      ['[abc]', 'Any of a, b, or c'],
      ['[^abc]', 'Not a, b, or c'],
      ['[a-z]', 'Range: a to z'],
    ],
  },
  {
    title: 'Anchors',
    rows: [
      ['^', 'Start of string (or line with m flag)'],
      ['$', 'End of string (or line with m flag)'],
      ['\\b', 'Word boundary'],
      ['\\B', 'Non-word boundary'],
    ],
  },
  {
    title: 'Quantifiers',
    rows: [
      ['*', '0 or more (greedy)'],
      ['+', '1 or more (greedy)'],
      ['?', '0 or 1 (optional)'],
      ['{3}', 'Exactly 3'],
      ['{3,}', '3 or more'],
      ['{3,5}', 'Between 3 and 5'],
      ['*?', '0 or more (lazy)'],
      ['+?', '1 or more (lazy)'],
    ],
  },
  {
    title: 'Groups & Lookaround',
    rows: [
      ['(abc)', 'Capturing group'],
      ['(?:abc)', 'Non-capturing group'],
      ['(?<name>abc)', 'Named capturing group'],
      ['\\1', 'Backreference to group 1'],
      ['(?=abc)', 'Positive lookahead'],
      ['(?!abc)', 'Negative lookahead'],
      ['(?<=abc)', 'Positive lookbehind'],
      ['(?<!abc)', 'Negative lookbehind'],
    ],
  },
  {
    title: 'Flags',
    rows: [
      ['g', 'Global — match all occurrences'],
      ['i', 'Case-insensitive'],
      ['m', 'Multiline — ^ and $ match line start/end'],
      ['s', 'Dotall — . matches newline'],
      ['u', 'Unicode support'],
    ],
  },
  {
    title: 'Common Patterns',
    rows: [
      ['^[\\w.-]+@[\\w.-]+\\.\\w{2,}$', 'Email (simple)'],
      ['^https?://[^\\s]+$', 'URL'],
      ['^\\d{4}-\\d{2}-\\d{2}$', 'Date (YYYY-MM-DD)'],
      ['^\\+?\\d{10,15}$', 'Phone number'],
      ['^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$', 'Hex color'],
      ['^(?=.*[A-Z])(?=.*\\d).{8,}$', 'Strong password'],
    ],
  },
]

export default function RegexCheatSheet() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Regex Cheat Sheet</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Quick reference for regular expressions. Test patterns with our <Link href="/tools/regex-tester" className="text-blue-600 hover:underline">Regex Tester</Link>.</p>
      </div>

      <div className="space-y-8">
        {sections.map(section => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{section.title}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {section.rows.map(([pattern, desc], i) => (
                    <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2 pr-4 font-mono text-blue-600 whitespace-nowrap">{pattern}</td>
                      <td className="py-2 text-gray-600 dark:text-gray-400">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
