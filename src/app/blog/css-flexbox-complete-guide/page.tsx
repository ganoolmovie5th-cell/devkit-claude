import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CSS Flexbox Complete Guide | DevKit Blog',
  description: 'Learn CSS Flexbox from the ground up: main vs cross axis, justify-content, align-items, flex-grow, shrink, basis, wrapping, and real layout examples.',
  alternates: { canonical: '/blog/css-flexbox-complete-guide/' },
  keywords: 'css flexbox, flex direction, justify-content, align-items, flex-grow, flexbox layout, flexbox guide',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">CSS Flexbox Complete Guide</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <p>Flexbox is the layout model most developers reach for first, and for good reason. It handles the two problems that plagued CSS for years: distributing space along a line and aligning items that have different sizes. Once the mental model clicks, most everyday layouts stop being a fight.</p>

      <p>The whole system rests on one idea: a flex container has two axes, and every property either controls spacing along one axis or alignment along the other. Get the axes straight and the rest follows.</p>

      <h2>The main axis and the cross axis</h2>
      <p>When you set <code>display: flex</code> on an element, it becomes a flex container and its direct children become flex items. The container has a <strong>main axis</strong> and a <strong>cross axis</strong> that runs perpendicular to it.</p>
      <p>By default the main axis runs left to right (a row). The cross axis then runs top to bottom. The direction you choose decides which properties push items apart and which ones line them up. This is the single detail that trips people up, so keep it front of mind: <code>justify-content</code> works along the main axis, <code>align-items</code> works along the cross axis.</p>

      <pre><code>{`.container {
  display: flex;
}`}</code></pre>

      <h2>Setting the direction</h2>
      <p>The <code>flex-direction</code> property decides where the main axis points. It accepts four values: <code>row</code>, <code>row-reverse</code>, <code>column</code>, and <code>column-reverse</code>. Switch to <code>column</code> and the axes swap: the main axis now runs top to bottom, so <code>justify-content</code> controls vertical spacing instead of horizontal.</p>

      <pre><code>{`.container {
  display: flex;
  flex-direction: column;
}`}</code></pre>

      <p>This swap is why a <code>justify-content: center</code> rule can center things horizontally in one layout and vertically in another. Nothing changed in the property; the axis it points at changed.</p>

      <h2>justify-content vs align-items</h2>
      <p>These two are the workhorses, and they are easy to confuse. Think of them this way: <code>justify-content</code> distributes free space between items along the main axis, while <code>align-items</code> positions items across the cross axis.</p>

      <pre><code>{`.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`}</code></pre>

      <p>Common <code>justify-content</code> values are <code>flex-start</code>, <code>center</code>, <code>flex-end</code>, <code>space-between</code>, <code>space-around</code>, and <code>space-evenly</code>. The three space values differ in how they handle the gaps at the edges: <code>space-between</code> puts no gap on the outside, <code>space-around</code> gives each item equal padding on both sides, and <code>space-evenly</code> makes every gap identical including the edges.</p>

      <p>For <code>align-items</code>, the useful values are <code>stretch</code> (the default, items fill the cross axis), <code>flex-start</code>, <code>center</code>, <code>flex-end</code>, and <code>baseline</code>. Baseline is handy when items hold text of different sizes and you want the text to sit on a shared line.</p>

      <h2>Growing, shrinking, and the basis</h2>
      <p>Items are not fixed by default. The <code>flex</code> shorthand on each item controls how it responds when there is extra room or not enough. It bundles three values: <code>flex-grow</code>, <code>flex-shrink</code>, and <code>flex-basis</code>.</p>
      <p><code>flex-grow</code> decides how leftover space is shared. A value of <code>0</code> means do not grow. If one item has <code>1</code> and another has <code>2</code>, the second takes twice the extra space. <code>flex-shrink</code> works in reverse: when items overflow, it decides who gives up space. <code>flex-basis</code> sets the starting size before growing or shrinking kicks in.</p>

      <pre><code>{`.sidebar {
  flex: 0 0 240px;
}
.content {
  flex: 1 1 auto;
}`}</code></pre>

      <p>That pair is a classic sidebar layout: the sidebar holds a fixed 240px and refuses to grow or shrink, while the content area takes everything that remains. Writing <code>flex: 1</code> on its own is shorthand for <code>1 1 0%</code>, which is why a row of equal columns is often just <code>flex: 1</code> on each.</p>

      <h2>Wrapping and gaps</h2>
      <p>By default flex items stay on one line even if they overflow. Add <code>flex-wrap: wrap</code> and items that no longer fit drop to the next line. Combined with <code>flex-basis</code>, this gives responsive grids without media queries.</p>

      <pre><code>{`.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.gallery > * {
  flex: 1 1 200px;
}`}</code></pre>

      <p>Each card wants at least 200px and grows to fill the row. When the row runs out of space, cards wrap. The <code>gap</code> property adds consistent spacing between items without the old margin tricks, and it applies both between columns and between wrapped rows.</p>

      <h2>Real layouts</h2>
      <p>A navbar is the canonical flexbox example. Put the logo on the left and the links on the right with one line:</p>

      <pre><code>{`.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
}`}</code></pre>

      <p>The logo and the link group sit at opposite ends because <code>space-between</code> pushes the free space between them, and <code>align-items: center</code> keeps everything on the same vertical line regardless of height.</p>

      <p>Centering a card dead center in a container is the other request everyone has. Flexbox makes it two lines once you remember the axis rule:</p>

      <pre><code>{`.screen {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`}</code></pre>

      <p>Because the container is a default row, <code>justify-content</code> centers horizontally and <code>align-items</code> centers vertically. The old days of negative margins and absolute positioning for centering are gone.</p>

      <h2>Where to go next</h2>
      <p>Flexbox is built for one-dimensional layouts, a row or a column. When you need rows and columns to line up together as a true grid, CSS Grid is the better tool. The two work well side by side: Grid for the page skeleton, Flexbox for the components inside each cell.</p>
      <p>The fastest way to internalize the axis behavior is to change values and watch items move. Pick a container, set <code>display: flex</code>, and tweak one property at a time until the model feels obvious.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/flexbox-generator" className="text-sm text-blue-600 hover:underline">Flexbox Generator</Link>
        </div>
      </div>
    </article>
  )
}
