import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog — DevKit',
  description: 'What\'s new in DevKit. Latest updates, new tools, and improvements.',
  alternates: { canonical: '/changelog/' },
}

const entries = [
  {
    date: '2026-08-18',
    version: '1.4.0',
    changes: [
      { type: 'new', text: 'JSON Tree Viewer — interactive collapsible tree visualization' },
      { type: 'new', text: 'Meta Tag Generator — generate SEO, OG, and Twitter Card meta tags' },
      { type: 'new', text: 'Open Graph Preview — see how pages look when shared on social media' },
      { type: 'new', text: 'Auto-generated "How to" guide for every tool' },
      { type: 'new', text: 'Changelog page (you\'re looking at it)' },
    ],
  },
  {
    date: '2026-08-18',
    version: '1.3.0',
    changes: [
      { type: 'new', text: '10 new tools: YAML/JSON, CSV to JSON, Number Base Converter, HTTP Status Codes, Regex Escape, HTML to Markdown, Markdown to HTML, JS Object to JSON, JSON Path Finder, Word-Level Diff' },
      { type: 'new', text: 'Command Palette (Ctrl+K) for instant tool navigation' },
      { type: 'new', text: 'JSON-LD structured data on every tool page' },
      { type: 'new', text: 'Embed widget — share any tool as an iframe' },
      { type: 'new', text: 'Pro page with pricing and waitlist' },
      { type: 'new', text: 'Resources page with curated developer links' },
      { type: 'improved', text: 'Sitemap now includes cheat sheets' },
      { type: 'improved', text: 'OpenGraph meta tags on all tool pages' },
    ],
  },
  {
    date: '2026-08-18',
    version: '1.2.0',
    changes: [
      { type: 'new', text: 'Favicon (SVG + ICO)' },
      { type: 'new', text: 'Cheat sheets: Regex, Cron, Git' },
      { type: 'new', text: 'Custom 404 page with tool suggestions' },
      { type: 'new', text: 'Output history per tool (localStorage)' },
      { type: 'new', text: 'Google Analytics placeholder' },
    ],
  },
  {
    date: '2026-08-18',
    version: '1.1.0',
    changes: [
      { type: 'new', text: '6 new tools: Word Counter, Text Case Converter, JSON to TypeScript, Image to Base64, Tailwind Colors, Chmod Calculator' },
      { type: 'new', text: 'Dark mode with system preference detection' },
      { type: 'new', text: 'Favorites (star) and Recently Used on homepage' },
      { type: 'new', text: 'Related tools widget on each tool page' },
      { type: 'new', text: 'Shareable links via ?q= URL parameter' },
      { type: 'new', text: 'Category filter tabs on homepage' },
      { type: 'new', text: 'PWA support — installable, works offline' },
      { type: 'improved', text: 'Domain updated to devkit.web.id' },
    ],
  },
  {
    date: '2026-08-18',
    version: '1.0.0',
    changes: [
      { type: 'new', text: 'Initial launch with 22 developer tools' },
      { type: 'new', text: 'Static export to GitHub Pages' },
      { type: 'new', text: 'SEO: sitemap, robots.txt, per-page meta' },
      { type: 'new', text: 'Privacy policy and About page' },
      { type: 'new', text: 'AdSense placeholder' },
    ],
  },
]

function Badge({ type }: { type: string }) {
  const styles = type === 'new'
    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
    : type === 'improved'
    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'

  return <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${styles} uppercase`}>{type}</span>
}

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Changelog</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">New features, improvements, and updates to DevKit.</p>

      <div className="space-y-10">
        {entries.map(entry => (
          <div key={entry.version} className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700">
            <div className="absolute -left-[9px] top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white dark:border-gray-900" />
            <div className="mb-3">
              <span className="text-sm font-bold text-gray-900 dark:text-white">v{entry.version}</span>
              <span className="text-sm text-gray-400 ml-2">{entry.date}</span>
            </div>
            <ul className="space-y-1.5">
              {entry.changes.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Badge type={c.type} />
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
