import './globals.css'
import { Metadata } from 'next'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ServiceWorker from '@/components/ServiceWorker'
import CommandPalette from '@/components/CommandPalette'
import KeyboardHelp from '@/components/KeyboardHelp'
import Onboarding from '@/components/Onboarding'
import Confetti from '@/components/Confetti'
import BackToTop from '@/components/BackToTop'
import ScrollProgress from '@/components/ScrollProgress'
import { ToastProvider } from '@/components/Toast'
import { Analytics } from '@vercel/analytics/next'
import ThirdPartyScripts from '@/components/ThirdPartyScripts'
import PwaPrompt from '@/components/PwaPrompt'

export const metadata: Metadata = {
  title: 'DevKit — Free Online Developer Tools',
  description: 'Collection of 145+ free online developer tools: JSON formatter, Base64 encoder, UUID generator, regex tester, and more. All tools run client-side.',
  metadataBase: new URL('https://www.devkit.web.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DevKit — Free Online Developer Tools',
    description: '145+ free developer tools that run entirely in your browser.',
    url: 'https://www.devkit.web.id',
    siteName: 'DevKit',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="gtm-script" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KPV353KB');`,
        }} />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <link rel="alternate" type="application/rss+xml" title="DevKit Blog" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DevKit',
              url: 'https://www.devkit.web.id',
              logo: 'https://www.devkit.web.id/logo-512.png',
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KPV353KB" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ToastProvider>
          <Header />
          <ServiceWorker />
          <CommandPalette />
          <KeyboardHelp />
          <Onboarding />
          <Confetti />
          <ScrollProgress />
          <BackToTop />
          <PwaPrompt />
          <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
            {children}
          </main>
          <Footer />
        </ToastProvider>
        <Analytics />
        <ThirdPartyScripts />
      </body>
    </html>
  )
}
