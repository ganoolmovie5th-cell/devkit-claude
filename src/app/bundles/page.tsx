import { Metadata } from 'next'
import Link from 'next/link'
import { tools } from '@/tools/registry'

export const metadata: Metadata = {
  title: 'Tool Bundles — Curated Developer Kits | DevKit',
  description: 'Curated collections of developer tools for frontend, backend, DevOps, and security workflows.',
  alternates: { canonical: '/bundles/' },
}

const bundles = [
  {
    name: 'Frontend Dev Kit',
    desc: 'Everything a frontend developer needs: CSS generators, color tools, and code formatters.',
    icon: '🎨',
    slugs: ['color-converter', 'tailwind-colors', 'box-shadow-generator', 'gradient-generator', 'flexbox-generator', 'css-minifier', 'js-minifier', 'svg-to-css', 'tailwind-to-css', 'markdown-preview'],
  },
  {
    name: 'API Developer Kit',
    desc: 'Tools for building and debugging APIs: JSON, JWT, status codes, encoding.',
    icon: '🔌',
    slugs: ['json-formatter', 'json-tree-viewer', 'json-path-finder', 'jwt-decoder', 'jwt-generator', 'http-status-codes', 'url-encode-decode', 'base64-encode-decode', 'yaml-json'],
  },
  {
    name: 'DevOps Kit',
    desc: 'Docker, Nginx, cron, and deployment tools for infrastructure work.',
    icon: '🐳',
    slugs: ['docker-run-to-compose', 'nginx-config-generator', 'cron-expression-generator', 'env-to-json', 'toml-to-json', 'gitignore-generator', 'chmod-calculator'],
  },
  {
    name: 'Security Kit',
    desc: 'Hash generators, password tools, and encoding for security workflows.',
    icon: '🔒',
    slugs: ['hash-generator', 'bcrypt-generator', 'password-generator', 'jwt-decoder', 'uuid-generator', 'base64-encode-decode'],
  },
  {
    name: 'SEO & Marketing Kit',
    desc: 'Meta tags, Open Graph previews, and content tools for growth.',
    icon: '📈',
    slugs: ['meta-tag-generator', 'og-preview', 'slug-generator', 'word-counter', 'qr-code-generator', 'favicon-generator'],
  },
  {
    name: 'Data Conversion Kit',
    desc: 'Convert between formats: JSON, CSV, YAML, TOML, and more.',
    icon: '🔄',
    slugs: ['json-to-csv', 'csv-to-json', 'yaml-json', 'toml-to-json', 'json-to-typescript', 'html-to-markdown', 'markdown-to-html', 'js-object-to-json'],
  },
]

export default function BundlesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Tool Bundles</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Curated collections for specific workflows. Click any tool to use it.</p>

      <div className="space-y-8">
        {bundles.map(bundle => {
          const bundleTools = bundle.slugs.map(s => tools.find(t => t.slug === s)).filter(Boolean)
          return (
            <div key={bundle.name} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{bundle.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{bundle.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{bundle.desc}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {bundleTools.map(t => t && (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}`}
                    className="px-3 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                  >
                    {t.name}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
