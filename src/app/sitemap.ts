import { MetadataRoute } from 'next'
import { tools } from '@/tools/registry'

export const dynamic = 'force-static'

const BASE = 'https://www.devkit.web.id'
const categorySlugs = Array.from(new Set(tools.map(t => t.category))).map(c => c.toLowerCase().replace(/\s+/g, '-'))

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map(t => ({
    url: `${BASE}/tools/${t.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const howToPages = tools.map(t => ({
    url: `${BASE}/how-to/${t.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const cheatsheets = ['regex', 'cron', 'git'].map(s => ({
    url: `${BASE}/cheatsheets/${s}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogPosts = [
    'mastering-json-formatting', 'regex-guide-for-developers', 'web-security-encoding-guide',
    'jwt-tokens-explained', 'docker-compose-beginners-guide', 'css-generators-every-developer-needs',
  ].map(slug => ({
    url: `${BASE}/blog/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const comparePages = [
    'json-vs-yaml', 'base64-vs-url-encoding', 'md5-vs-sha256',
    'rest-vs-graphql', 'css-vs-tailwind', 'devkit-vs-transform-tools', 'devkit-vs-cyberchef',
  ].map(slug => ({
    url: `${BASE}/compare/${slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...blogPosts,
    { url: `${BASE}/compare/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...comparePages,
    { url: `${BASE}/cheatsheets/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    ...cheatsheets,
    { url: `${BASE}/bundles/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/workspace/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/compare-tools/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/api-docs/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/contribute/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/changelog/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE}/pro/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/resources/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/about/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy-policy/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...categorySlugs.map(s => ({
      url: `${BASE}/category/${s}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...toolPages,
    ...howToPages,
  ]
}
