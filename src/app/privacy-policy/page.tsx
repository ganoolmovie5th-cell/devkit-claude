import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — DevToolkit',
  description: 'Privacy policy for DevToolkit developer tools website.',
  alternates: { canonical: '/privacy-policy/' },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto prose prose-gray">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: August 18, 2026</em></p>

      <h2>Overview</h2>
      <p>
        DevToolkit is committed to protecting your privacy. All developer tools on this site
        run entirely in your web browser. No input data is transmitted to any server.
      </p>

      <h2>Data Collection</h2>
      <p>We do not collect, store, or process any personal data or tool inputs. Specifically:</p>
      <ul>
        <li>No user accounts or registration</li>
        <li>No cookies for tracking (only essential cookies from ad services)</li>
        <li>No analytics that identify individual users</li>
        <li>No server-side processing of tool inputs</li>
      </ul>

      <h2>Third-Party Services</h2>
      <p>
        This site uses Google AdSense to display advertisements. Google may use cookies to serve
        ads based on your prior visits to this or other websites. You can opt out of personalized
        advertising by visiting{' '}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
          Google Ad Settings
        </a>.
      </p>

      <h2>Cookies</h2>
      <p>
        We do not set any first-party cookies. Third-party ad services may set their own cookies
        as described above.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this privacy policy from time to time. Changes will be posted on this page
        with an updated revision date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Open an issue on our{' '}
        <a href="https://github.com/ganoolmovie5th-cell/dev-tools-claude" target="_blank" rel="noopener noreferrer">
          GitHub repository
        </a>.
      </p>
    </div>
  )
}
