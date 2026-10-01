import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — DevKit',
  description: 'DevKit is a collection of 145+ free online developer tools that run entirely in your browser.',
  alternates: { canonical: '/about/' },
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">About DevKit</h1>
      <p className="mt-4">
        DevKit is a free collection of 145+ developer tools built for everyday coding tasks —
        formatting, encoding, generating, converting, and testing. Every tool runs entirely in
        your browser. Your input never leaves your device.
      </p>
      <p className="mt-3">
        It started as a personal set of scripts for repetitive tasks: formatting a messy JSON
        payload, decoding a JWT to check a claim, generating a batch of UUIDs for test data.
        Instead of pasting sensitive data into random websites, each tool was rebuilt to run
        locally. DevKit is that collection, cleaned up and shared.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">Why DevKit?</h2>
      <ul className="mt-3 space-y-2 list-disc pl-5">
        <li><strong className="text-gray-900 dark:text-white">Privacy-first:</strong> All processing happens client-side. Your data stays on your machine, which matters for API keys, tokens, and internal data.</li>
        <li><strong className="text-gray-900 dark:text-white">No signup required:</strong> Open a tool and use it. No accounts, no tracking cookies.</li>
        <li><strong className="text-gray-900 dark:text-white">Fast and lightweight:</strong> A static site with minimal JavaScript. Tools load instantly and work offline after the first visit.</li>
        <li><strong className="text-gray-900 dark:text-white">Open source:</strong> The code is public and anyone can audit it or contribute.</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">What&apos;s inside</h2>
      <p className="mt-3">
        145+ tools across formatters (JSON, SQL, CSS, XML), encoders and decoders (Base64, URL,
        HTML entities, JWT), generators (UUID, password, QR code, cron expressions, .gitignore),
        converters (Unix timestamp, color, JSON to CSV, YAML), calculators (chmod, IP subnet,
        HTTP status), and testers (regex, diff checker, JSON Schema). Alongside the tools, DevKit
        publishes long-form guides, tool comparisons, and cheat sheets for regex, cron, and git.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">Contact</h2>
      <p className="mt-3">
        Found a bug or have a suggestion? Open an issue on the{' '}
        <a className="text-blue-600 hover:underline" href="https://github.com/ganoolmovie5th-cell/devkit-claude" target="_blank" rel="noopener noreferrer">
          GitHub repository
        </a>.
      </p>
    </div>
  )
}
