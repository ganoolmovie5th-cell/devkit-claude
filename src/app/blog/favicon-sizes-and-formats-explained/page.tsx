import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Favicon Sizes and Formats Explained | DevKit Blog',
  description: 'Why a modern site needs several favicon sizes, how ICO, PNG, and SVG differ, what apple-touch-icon and the web manifest do, plus a practical setup.',
  alternates: { canonical: '/blog/favicon-sizes-and-formats-explained/' },
  keywords: 'favicon sizes, favicon formats, apple-touch-icon, web manifest, ico vs png, svg favicon, favicon best practices',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Favicon Sizes and Formats Explained</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <p>A favicon used to be one tiny file dropped at the root of a site. That era is over. A single icon now has to look sharp in a browser tab, on a phone home screen, in a bookmark list, and as an app shortcut, and those surfaces all want different sizes and formats. This is why favicon setup feels oddly complicated for something so small.</p>

      <h2>Why so many sizes</h2>
      <p>Different places render the icon at different pixel dimensions, and scaling down a large image to a tiny tab icon rarely looks clean. A 16 by 16 icon in a browser tab needs crisp, deliberate pixels, while a 512 by 512 icon on a splash screen needs enough detail to not look blurry when enlarged. Supplying each size separately lets you tune the artwork for the context instead of letting the browser guess.</p>
      <p>The sizes that matter in practice are a short list. 16 and 32 pixels cover browser tabs and bookmarks. 180 pixels is the size Apple devices use when you add a site to the iOS home screen. 192 and 512 pixels are the standard icons for Android and progressive web apps, where 192 shows on the home screen and 512 feeds splash screens and install prompts.</p>

      <h2>ICO, PNG, and SVG</h2>
      <p>The format question comes down to three options, each with a reason to exist.</p>
      <p>The <strong>ICO</strong> format is the old container that can hold several resolutions inside one file. A browser reading <code>favicon.ico</code> picks whichever size it needs. It is still worth shipping because very old browsers and some tools look for it by default, and it guarantees a fallback.</p>
      <p><strong>PNG</strong> is the modern workhorse. It supports transparency, renders predictably everywhere, and is what you use for the specific sizes like 32, 180, and 192. Most of your favicon files will be PNGs at fixed dimensions.</p>
      <p><strong>SVG</strong> is the newest option and the most interesting. Because it is vector, a single SVG stays sharp at any size, so one file can cover tabs on high-density displays without you exporting a dozen rasters. It can even respond to dark mode using a media query inside the SVG. Support is good in current browsers but not universal, so an SVG should sit alongside PNG and ICO fallbacks, not replace them.</p>

      <h2>The apple-touch-icon</h2>
      <p>Apple handles home screen icons its own way. When someone adds your site to their iOS home screen, Safari looks for a link tagged <code>apple-touch-icon</code> and uses it as the app-style icon. The recommended size is 180 by 180 pixels, and it should be a PNG with no transparency, because iOS applies its own rounded corners and will put a black background behind transparent areas.</p>

      <pre><code>{`<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`}</code></pre>

      <h2>The web manifest</h2>
      <p>For installable web apps, the icons live in a separate JSON file, the web app manifest. Android and PWA install flows read this file to find the larger icons and decide what to show on the home screen and splash screen.</p>

      <pre><code>{`{
  "name": "DevKit",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}`}</code></pre>

      <p>The 512 icon is important here even though nothing displays it at full size directly; the system uses it to generate splash screens and to downscale cleanly when a sharper source is better than enlarging a smaller file.</p>

      <h2>Wiring it up in the head</h2>
      <p>Browsers find these files through link tags in the document head. A complete, modern setup looks like this:</p>

      <pre><code>{`<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/icon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`}</code></pre>

      <p>The order matters less than the coverage. A capable browser picks the SVG, an older one falls back to the ICO, Apple devices grab the touch icon, and installable apps read the manifest. Each surface finds what it needs without you forcing a single file to do every job.</p>

      <h2>Best practice checklist</h2>
      <p>A few habits keep favicons painless. Design the smallest size first; if your logo is still readable at 16 pixels, every larger size will be fine. Keep the artwork simple, since fine detail disappears in a tab. Ship an ICO for the broadest fallback, PNGs for the fixed sizes, and an SVG if your logo is vector friendly. Give the apple-touch-icon a solid background so iOS does not paint black behind it. And generate everything from one high-resolution master so the icon stays consistent across every size.</p>
      <p>Done once, this setup lasts the life of the site. The payoff is an icon that looks intentional everywhere it appears, which is a small detail users notice without quite knowing why.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/favicon-generator" className="text-sm text-blue-600 hover:underline">Favicon Generator</Link>
          <Link href="/tools/image-to-base64" className="text-sm text-blue-600 hover:underline">Image to Base64</Link>
        </div>
      </div>
    </article>
  )
}
