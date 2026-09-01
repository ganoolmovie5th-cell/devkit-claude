import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Developer Comparisons — DevKit',
  description: 'Side-by-side comparisons of encoding formats, data formats, and developer tools.',
  alternates: { canonical: '/compare/' },
}

const comparisons = [
  { slug: 'json-vs-yaml', title: 'JSON vs YAML', description: 'When to use each data format for config, APIs, and data exchange.' },
  { slug: 'base64-vs-url-encoding', title: 'Base64 vs URL Encoding', description: 'Two encoding methods for different transport needs.' },
  { slug: 'md5-vs-sha256', title: 'MD5 vs SHA-256', description: 'Hash algorithm comparison for security and performance.' },
  { slug: 'rest-vs-graphql', title: 'REST vs GraphQL', description: 'API design approaches — when each makes sense.' },
  { slug: 'css-vs-tailwind', title: 'CSS vs Tailwind CSS', description: 'Vanilla CSS versus utility-first framework.' },
  { slug: 'devkit-vs-transform-tools', title: 'DevKit vs Transform.tools', description: 'Feature-by-feature comparison of two developer toolkits.' },
  { slug: 'devkit-vs-cyberchef', title: 'DevKit vs CyberChef', description: 'When to use each: daily dev tasks vs complex data pipelines.' },
]

export default function ComparePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Developer Comparisons</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Side-by-side breakdowns to help you choose the right tool for the job.</p>

      <div className="grid gap-4">
        {comparisons.map(c => (
          <Link
            key={c.slug}
            href={`/compare/${c.slug}`}
            className="block p-5 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all"
          >
            <h2 className="font-semibold text-gray-900 dark:text-white">{c.title}</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{c.description}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 prose prose-sm prose-gray dark:prose-invert max-w-none">
        <h2>How to use these comparisons</h2>
        <p>
          Picking between two formats or tools usually comes down to trade-offs rather than a clear
          winner. These guides lay the options side by side — syntax, performance, readability, and the
          situations each one fits — so you can decide based on your actual use case instead of a
          gut feeling.
        </p>
        <p>
          The data-format guides (JSON vs YAML, Base64 vs URL encoding) help when two systems expect
          different shapes of the same data. The security guide (MD5 vs SHA-256) covers when a fast
          checksum is fine and when you need a collision-resistant hash. The architecture and tooling
          guides (REST vs GraphQL, CSS vs Tailwind, and the DevKit comparisons) weigh workflow and
          maintenance cost. Each page ends with a plain recommendation.
        </p>
      </section>
    </div>
  )
}
