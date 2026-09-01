import Link from 'next/link'
import NewsletterCTA from './NewsletterCTA'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 pb-6">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="max-w-md mx-auto">
          <NewsletterCTA />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> DevKit. All tools run client-side. Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-[10px]">?</kbd> for shortcuts.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://github.com/ganoolmovie5th-cell/dev-tools-claude/issues/new?title=Tool+Suggestion:+" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700 dark:hover:text-gray-200">Suggest a Tool</a>
            <Link href="/changelog" className="hover:text-gray-700 dark:hover:text-gray-200">Changelog</Link>
            <Link href="/pro" className="hover:text-gray-700 dark:hover:text-gray-200">Pro</Link>
            <Link href="/resources" className="hover:text-gray-700 dark:hover:text-gray-200">Resources</Link>
            <Link href="/privacy-policy" className="hover:text-gray-700 dark:hover:text-gray-200">Privacy</Link>
            <Link href="/about" className="hover:text-gray-700 dark:hover:text-gray-200">About</Link>
          </div>
        </div>
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-600">
          Built with Next.js + Tailwind CSS. Open source on{' '}
          <a href="https://github.com/ganoolmovie5th-cell/devkit-claude" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 dark:hover:text-gray-400 underline">GitHub</a>.
        </p>
      </div>
    </footer>
  )
}
