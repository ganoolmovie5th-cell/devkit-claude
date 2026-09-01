import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — DevToolkit',
  description: 'DevToolkit is a collection of free online developer tools that run entirely in your browser.',
  alternates: { canonical: '/about/' },
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto prose prose-gray">
      <h1>About DevToolkit</h1>
      <p>
        DevToolkit is a free collection of 22+ developer tools built for everyday coding tasks.
        Every tool runs entirely in your browser — no data is ever sent to a server.
      </p>
      <h2>Why DevToolkit?</h2>
      <ul>
        <li><strong>Privacy-first:</strong> All processing happens client-side. Your data stays on your machine.</li>
        <li><strong>No signup required:</strong> Just open and use. No accounts, no tracking cookies.</li>
        <li><strong>Fast and lightweight:</strong> Static site with minimal JavaScript. Tools load instantly.</li>
        <li><strong>Always free:</strong> Supported by non-intrusive ads to keep the site running.</li>
      </ul>
      <h2>Tools Available</h2>
      <p>
        We offer formatters (JSON, SQL, CSS), encoders/decoders (Base64, URL, HTML entities, JWT),
        generators (UUID, password, Lorem Ipsum, QR code, cron expressions, .gitignore),
        converters (Unix timestamp, color, JSON to CSV), and testers (regex, diff checker).
      </p>
      <h2>Contact</h2>
      <p>
        Found a bug or have a suggestion? Open an issue on our{' '}
        <a href="https://github.com/ganoolmovie5th-cell/dev-tools-claude" target="_blank" rel="noopener noreferrer">
          GitHub repository
        </a>.
      </p>
    </div>
  )
}
