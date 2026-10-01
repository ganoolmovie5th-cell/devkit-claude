import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mastering CSS Box Shadow | DevKit Blog',
  description: 'A deep dive into CSS box-shadow: offset, blur, and spread syntax, inset shadows, stacking multiple shadows, elevation systems, and drop-shadow filter.',
  alternates: { canonical: '/blog/mastering-css-box-shadow/' },
  keywords: 'css box-shadow, inset shadow, multiple shadows, elevation, drop-shadow filter, css shadow guide',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Mastering CSS Box Shadow</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <p>Shadows are the quietest part of good interface design. A card that floats, a button that looks pressable, a modal that lifts above the page, all of it comes from <code>box-shadow</code>. The property looks intimidating because it crams several numbers into one line, but each number has a clear job.</p>

      <h2>The syntax, number by number</h2>
      <p>A single shadow takes up to four length values followed by a color. In order they are: horizontal offset, vertical offset, blur radius, and spread radius.</p>

      <pre><code>{`.card {
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.15);
}`}</code></pre>

      <p>Reading that from left to right: the first <code>0</code> is the horizontal offset, so the shadow is not pushed left or right. The <code>4px</code> is the vertical offset, pushing the shadow down. The <code>12px</code> is the blur radius, which softens the edge. The last <code>0</code> is the spread, which would grow or shrink the shadow if it were nonzero. Finally the color, usually a low-opacity black.</p>

      <h2>Offset, blur, and spread in plain terms</h2>
      <p>The offsets decide direction. A positive vertical offset drops the shadow below the element, which mimics a light source above, the look our eyes expect. Horizontal offset is usually left at <code>0</code> unless you want a side-lit effect.</p>
      <p>Blur controls softness. A blur of <code>0</code> gives a hard, crisp shadow with a sharp edge. Larger blur values spread the darkness over more pixels, producing the soft diffusion of a real shadow. Most natural shadows use a blur roughly two to three times the vertical offset.</p>
      <p>Spread grows or shrinks the shadow before blurring. A positive spread makes the shadow larger than the element, while a negative spread pulls it in. Negative spread paired with a vertical offset creates a tight shadow that only peeks out from one edge, which looks clean on small chips and tags.</p>

      <h2>Inset shadows</h2>
      <p>Add the <code>inset</code> keyword and the shadow draws inside the element instead of outside. This is how you suggest a recessed surface, an input field that looks carved into the page, or a button that appears pushed in when active.</p>

      <pre><code>{`.input {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}`}</code></pre>

      <p>The same four values apply, but now the shadow falls on the inner side of the border. Inset shadows are easy to overdo; keep the opacity low or the field starts to look dirty rather than recessed.</p>

      <h2>Stacking multiple shadows</h2>
      <p>One element can carry several shadows at once. List them separated by commas, and the browser paints them in order with the first one on top. This is the single most useful technique for realistic depth, because real shadows are never one flat blob.</p>

      <pre><code>{`.card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.08),
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 12px 24px rgba(0, 0, 0, 0.05);
}`}</code></pre>

      <p>The tight, dark first layer anchors the element to the surface. The wider, fainter layers below suggest ambient light wrapping around it. Each layer gets softer and more transparent as it spreads, which is exactly how light behaves. A single shadow with high blur never looks as convincing as three stacked ones.</p>

      <h2>Elevation systems</h2>
      <p>Design systems formalize this idea into an elevation scale. Instead of inventing shadow values per component, you define a handful of levels, each a stacked shadow, and reuse them. Low levels sit near the surface, high levels float well above it.</p>

      <pre><code>{`:root {
  --elevation-1: 0 1px 2px rgba(0,0,0,0.1);
  --elevation-2: 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.08);
  --elevation-3: 0 4px 8px rgba(0,0,0,0.1), 0 12px 24px rgba(0,0,0,0.08);
}

.menu {
  box-shadow: var(--elevation-3);
}`}</code></pre>

      <p>Storing shadows in custom properties keeps the whole interface consistent. A resting card uses elevation 1, a hovered card jumps to elevation 2, and an open dropdown reaches elevation 3. The jump in shadow communicates the change in height, which is the entire point of elevation.</p>

      <h2>box-shadow versus drop-shadow</h2>
      <p>There is a second way to cast a shadow: the <code>drop-shadow</code> filter. The two look similar but behave differently. A <code>box-shadow</code> always traces the rectangular box of the element, including its border-radius. A <code>filter: drop-shadow</code> follows the actual visible shape, including transparent regions of a PNG or the outline of an SVG icon.</p>

      <pre><code>{`.icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}`}</code></pre>

      <p>Use <code>box-shadow</code> for cards, buttons, and anything rectangular, because it is cheaper to render and supports spread and inset. Reach for <code>drop-shadow</code> when the element has a non-rectangular silhouette, like a logo with cutouts or an icon with transparency, where a box shadow would awkwardly outline the invisible bounding rectangle. Note that <code>drop-shadow</code> has no spread value and no inset mode.</p>

      <h2>Practical defaults</h2>
      <p>A few values cover most situations. Subtle card lift: <code>0 1px 3px rgba(0,0,0,0.1)</code>. Floating element: <code>0 10px 30px rgba(0,0,0,0.15)</code>. Pressed button: <code>inset 0 2px 4px rgba(0,0,0,0.2)</code>. Start from those, then adjust the blur and opacity until the depth matches the height you want the element to feel at. Shadows read best when they are quiet, so when in doubt, lower the opacity.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/box-shadow-generator" className="text-sm text-blue-600 hover:underline">Box Shadow Generator</Link>
        </div>
      </div>
    </article>
  )
}
