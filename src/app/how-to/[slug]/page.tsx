import { tools, getToolBySlug } from '@/tools/registry'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return {}
  return {
    title: `How to Use ${tool.name} Online — Free Guide | DevKit`,
    description: `Learn how to use ${tool.name} online for free. Step-by-step guide with examples. No signup required, runs in your browser.`,
    keywords: [`how to ${tool.keywords[0]}`, `${tool.name} tutorial`, `${tool.name} guide`],
    alternates: {
      canonical: `/how-to/${slug}/`,
    },
  }
}

function getSteps(slug: string, name: string): { step: string; detail: string }[] {
  const base = [
    { step: `Open ${name}`, detail: `Navigate to the ${name} tool page on DevKit. No signup or download required.` },
    { step: 'Enter your input', detail: 'Paste or type your data in the input area. All processing happens locally in your browser — nothing is sent to any server.' },
    { step: 'Click the action button', detail: 'Press the main action button to process your input. Results appear instantly below.' },
    { step: 'Copy the result', detail: 'Click the "Copy" button to copy the output to your clipboard. You can also use the Share button to create a shareable link.' },
  ]

  if (slug.includes('generator')) {
    base[1] = { step: 'Configure options', detail: 'Adjust the settings and parameters to match your needs. Each option updates the output in real-time.' }
  }
  if (slug.includes('converter') || slug.includes('encode') || slug.includes('decode')) {
    base.push({ step: 'Switch direction', detail: 'Many converter tools work both ways. Use the alternate button to reverse the conversion.' })
  }
  if (slug.includes('diff') || slug.includes('checker')) {
    base[1] = { step: 'Enter both texts', detail: 'Paste the original text on the left and the modified text on the right for comparison.' }
  }

  base.push({ step: 'Check your history', detail: 'Your last 10 results are saved locally. Click "History" below the tool to access previous outputs.' })
  return base
}

function getTips(slug: string): string[] {
  const tips = [
    'All data stays in your browser. Safe for sensitive information like API keys and tokens.',
    'Use Ctrl+K (Cmd+K on Mac) to quickly search and jump to any tool.',
    'Star your favorite tools for quick access from the homepage.',
  ]

  if (slug.includes('json')) tips.push('Tip: Invalid JSON will show a helpful error message pointing to the issue.')
  if (slug.includes('regex')) tips.push('Tip: Use the flags input to add modifiers like "g" (global) or "i" (case-insensitive).')
  if (slug.includes('base64')) tips.push('Tip: Base64 encoding increases size by ~33%. Use it for embedding, not compression.')
  if (slug.includes('hash')) tips.push('Tip: SHA-256 is recommended for most use cases. MD5 is fast but not collision-resistant.')
  if (slug.includes('password')) tips.push('Tip: 16+ characters with mixed case, numbers, and symbols is considered strong.')
  if (slug.includes('uuid')) tips.push('Tip: UUID v4 uses cryptographically random values. Collision probability is negligible.')
  if (slug.includes('color')) tips.push('Tip: Click the color picker for visual selection, or paste any hex code directly.')
  if (slug.includes('cron')) tips.push('Tip: Use */5 in the minute field for "every 5 minutes" scheduling.')
  if (slug.includes('jwt')) tips.push('Tip: Never paste production JWTs into online tools that send data to a server. DevKit is safe — it decodes locally.')
  if (slug.includes('yaml')) tips.push('Tip: YAML is whitespace-sensitive. Use consistent 2-space indentation.')
  if (slug.includes('csv')) tips.push('Tip: Make sure your first row contains column headers for proper JSON key mapping.')
  if (slug.includes('timestamp')) tips.push('Tip: Unix timestamps are in seconds. JavaScript uses milliseconds — divide by 1000.')

  return tips
}

export default async function HowToPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  const steps = getSteps(tool.slug, tool.name)
  const tips = getTips(tool.slug)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">How to Use {tool.name}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{tool.description} Free, no signup, works offline.</p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Step-by-Step Guide</h2>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{s.step}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <h2 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Tips</h2>
        <ul className="space-y-1.5">
          {tips.map((tip, i) => (
            <li key={i} className="text-sm text-blue-700 dark:text-blue-400 flex gap-2">
              <span>•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Why Use DevKit&apos;s {tool.name}?</h2>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex gap-2"><span className="text-green-500">✓</span> 100% client-side — your data never leaves your device</li>
          <li className="flex gap-2"><span className="text-green-500">✓</span> No signup, no account, no tracking</li>
          <li className="flex gap-2"><span className="text-green-500">✓</span> Works offline after first visit (PWA)</li>
          <li className="flex gap-2"><span className="text-green-500">✓</span> Free forever — supported by non-intrusive ads</li>
          <li className="flex gap-2"><span className="text-green-500">✓</span> Mobile responsive — works on any device</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/tools/${tool.slug}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Use {tool.name} Now →
        </Link>
        <Link
          href="/"
          className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Browse All Tools
        </Link>
      </div>
    </div>
  )
}
