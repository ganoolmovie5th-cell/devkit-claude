'use client'

import { useEffect } from 'react'

// Load third-party scripts (GTM, AdSense, Google funding-choices) from the
// client AFTER React has mounted. Injecting them via plain DOM here — rather
// than rendering <script> through JSX or next/script — keeps them out of the
// hydrated tree entirely, so their DOM mutations (e.g. funding-choices adding
// an <iframe> to <body>) can't cause a hydration mismatch (React #418) and
// next/script's data-nscript attribute never reaches the AdSense tag.

export default function ThirdPartyScripts() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Guard against double-injection on client-side navigations.
    if ((window as unknown as { __devkitScripts?: boolean }).__devkitScripts) return
    ;(window as unknown as { __devkitScripts?: boolean }).__devkitScripts = true

    // Google Tag Manager
    ;(window as unknown as { dataLayer?: unknown[] }).dataLayer =
      (window as unknown as { dataLayer?: unknown[] }).dataLayer || []
    ;(window as unknown as { dataLayer: { push: (o: unknown) => void }[] & { push: (o: unknown) => void } }).dataLayer.push({
      'gtm.start': Date.now(),
      event: 'gtm.js',
    })
    const gtm = document.createElement('script')
    gtm.async = true
    gtm.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-KPV353KB'
    document.head.appendChild(gtm)

    // AdSense
    const ads = document.createElement('script')
    ads.async = true
    ads.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7759392165776614'
    ads.crossOrigin = 'anonymous'
    document.head.appendChild(ads)

    // Google funding-choices (ad-blocker recovery)
    const fc = document.createElement('script')
    fc.async = true
    fc.src = 'https://fundingchoicesmessages.google.com/i/pub-7759392165776614?ers=1'
    document.head.appendChild(fc)

    // Signal funding-choices presence via hidden iframe (runs post-hydration).
    const w = window as unknown as { frames: Record<string, unknown> }
    if (!w.frames['googlefcPresent']) {
      const iframe = document.createElement('iframe')
      iframe.style.cssText =
        'width:0;height:0;border:none;z-index:-1000;left:-1000px;top:-1000px;display:none'
      iframe.name = 'googlefcPresent'
      document.body.appendChild(iframe)
    }
  }, [])

  return null
}
