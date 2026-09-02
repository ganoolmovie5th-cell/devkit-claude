import { tools } from '@/tools/registry'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const categories = Array.from(new Set(tools.map(t => t.category)))
const slugify = (c: string) => c.toLowerCase().replace(/\s+/g, '-')
const fromSlug = (s: string) => categories.find(c => slugify(c) === s)

export function generateStaticParams() {
  return categories.map(c => ({ slug: slugify(c) }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cat = fromSlug(slug)
  if (!cat) return {}
  const count = tools.filter(t => t.category === cat).length
  return {
    title: `${cat} Tools — ${count} Free Online ${cat} Utilities | DevKit`,
    description: `Browse ${count} free ${cat.toLowerCase()} tools that run in your browser. No signup, no upload — everything is processed client-side.`,
    keywords: [`${cat.toLowerCase()} tools`, `online ${cat.toLowerCase()}`, `free ${cat.toLowerCase()} tools`],
    alternates: { canonical: `/category/${slug}/` },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cat = fromSlug(slug)
  if (!cat) notFound()

  const catTools = tools.filter(t => t.category === cat)

  return (
    <div className="max-w-4xl mx-auto">
      <nav className="text-xs text-gray-400 mb-4"><Link href="/" className="hover:text-gray-600">Home</Link> / {cat}</nav>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{cat} Tools</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">{catTools.length} free {cat.toLowerCase()} tools that run entirely in your browser.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {catTools.map(t => (
          <Link key={t.slug} href={`/tools/${t.slug}`} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
            <p className="font-medium text-gray-900 dark:text-white text-sm">{t.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.description}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800 prose prose-sm prose-gray dark:prose-invert max-w-none">
        <h2>About {cat.toLowerCase()} tools</h2>
        <p>
          These {catTools.length} {cat.toLowerCase()} tools cover the tasks developers reach for most.
          Each one runs client-side, so your input never leaves your device and every tool works
          offline after the first visit. No account, no upload, no tracking.
        </p>
      </section>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Other categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.filter(c => c !== cat).map(c => (
            <Link key={c} href={`/category/${slugify(c)}`} className="text-sm px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-full text-gray-600 dark:text-gray-400 hover:border-blue-300">{c}</Link>
          ))}
        </div>
      </div>
    </div>
  )
}
