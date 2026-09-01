import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DevKit Pro — Bulk Operations & API Access',
  description: 'Upgrade to DevKit Pro for bulk processing, API access, no ads, and priority features.',
  alternates: { canonical: '/pro/' },
}

const features = [
  { name: 'Bulk Processing', desc: 'Process hundreds of items at once — batch Base64, hash, UUID generation, and more.', free: '1 item', pro: 'Unlimited batch' },
  { name: 'API Access', desc: 'RESTful API for all tools. Automate workflows from CLI or CI/CD.', free: '—', pro: '10,000 req/mo' },
  { name: 'No Ads', desc: 'Clean, distraction-free interface with zero advertisements.', free: 'Ads shown', pro: 'Ad-free' },
  { name: 'Export Formats', desc: 'Download results as JSON, CSV, or plain text files.', free: 'Copy only', pro: 'File export' },
  { name: 'History Sync', desc: 'Sync your output history across devices.', free: 'Local only', pro: 'Cloud sync' },
  { name: 'Priority Features', desc: 'Vote on and get early access to new tools.', free: '—', pro: 'Early access' },
]

export default function ProPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">Coming Soon</span>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">DevKit Pro</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
          All the tools you love, supercharged with bulk operations, API access, and zero ads.
        </p>
      </div>

      <div className="grid gap-4 mb-12">
        <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 px-4">
          <span className="col-span-2">Feature</span>
          <span className="text-center">Free</span>
          <span className="text-center text-blue-600">Pro</span>
        </div>
        {features.map(f => (
          <div key={f.name} className="grid grid-cols-4 gap-4 items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="col-span-2">
              <p className="font-medium text-gray-900 dark:text-white">{f.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{f.desc}</p>
            </div>
            <span className="text-center text-sm text-gray-400">{f.free}</span>
            <span className="text-center text-sm text-blue-600 font-medium">{f.pro}</span>
          </div>
        ))}
      </div>

      <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
        <p className="text-lg font-semibold text-gray-900 dark:text-white">$5/month or $48/year</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Save 20% with annual billing</p>
        <button
          disabled
          className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed"
        >
          Coming Soon — Join Waitlist
        </button>
        <p className="mt-3 text-xs text-gray-400">
          Free tier stays free forever. Pro just adds power-user features.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link href="/" className="text-sm text-blue-600 hover:underline">← Back to free tools</Link>
      </div>
    </div>
  )
}
