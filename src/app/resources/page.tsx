import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developer Resources & Recommended Tools | DevKit',
  description: 'Curated list of developer tools, hosting, domains, and services we recommend for building web projects.',
  alternates: { canonical: '/resources/' },
}

const categories = [
  {
    title: 'Hosting & Deployment',
    items: [
      { name: 'Vercel', desc: 'Deploy frontend apps with zero config. Free tier included.', url: 'https://vercel.com', tag: 'Free tier' },
      { name: 'Netlify', desc: 'Static site hosting with CI/CD, forms, and serverless functions.', url: 'https://netlify.com', tag: 'Free tier' },
      { name: 'Railway', desc: 'Deploy databases and backend apps in seconds.', url: 'https://railway.app', tag: 'From $5/mo' },
      { name: 'DigitalOcean', desc: 'Cloud VPS with predictable pricing. Great for backend.', url: 'https://digitalocean.com', tag: 'From $4/mo' },
    ],
  },
  {
    title: 'Domains',
    items: [
      { name: 'Namecheap', desc: 'Affordable domains with free WhoisGuard privacy.', url: 'https://namecheap.com', tag: 'From $8/yr' },
      { name: 'Cloudflare Registrar', desc: 'At-cost domain registration. No markup.', url: 'https://cloudflare.com/products/registrar', tag: 'At cost' },
      { name: 'Niagahoster', desc: 'Domain .id dan .web.id murah untuk pasar Indonesia.', url: 'https://niagahoster.co.id', tag: 'From Rp15k' },
    ],
  },
  {
    title: 'Developer Tools',
    items: [
      { name: 'VS Code', desc: 'Free code editor. Extensible, fast, industry standard.', url: 'https://code.visualstudio.com', tag: 'Free' },
      { name: 'GitHub', desc: 'Code hosting, CI/CD, project management. Free for public repos.', url: 'https://github.com', tag: 'Free' },
      { name: 'Figma', desc: 'Collaborative UI design tool. Free for personal use.', url: 'https://figma.com', tag: 'Free tier' },
      { name: 'Postman', desc: 'API testing and documentation platform.', url: 'https://postman.com', tag: 'Free tier' },
    ],
  },
  {
    title: 'Learning',
    items: [
      { name: 'freeCodeCamp', desc: 'Free full-stack curriculum with certifications.', url: 'https://freecodecamp.org', tag: 'Free' },
      { name: 'MDN Web Docs', desc: 'The definitive web development reference.', url: 'https://developer.mozilla.org', tag: 'Free' },
      { name: 'The Odin Project', desc: 'Open-source full-stack web development curriculum.', url: 'https://theodinproject.com', tag: 'Free' },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Developer Resources</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Tools and services we use and recommend for web development.</p>

      <div className="space-y-10">
        {categories.map(cat => (
          <div key={cat.title}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{cat.title}</h2>
            <div className="grid gap-3">
              {cat.items.map(item => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded whitespace-nowrap ml-4">{item.tag}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs text-gray-400 dark:text-gray-500 text-center">
        Some links may contain affiliate referrals that help support DevKit at no extra cost to you.
      </p>
    </div>
  )
}
