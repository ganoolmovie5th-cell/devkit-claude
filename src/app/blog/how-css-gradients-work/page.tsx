import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How CSS Gradients Work | DevKit Blog',
  description: 'Understand CSS gradients in depth: linear, radial, and conic types, color stops, angles, multi-stop blends, transparency, and practical UI examples.',
  alternates: { canonical: '/blog/how-css-gradients-work/' },
  keywords: 'css gradients, linear gradient, radial gradient, conic gradient, color stops, gradient angle, css background',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">How CSS Gradients Work</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <p>A CSS gradient is a generated image, not a color. That one fact explains a lot of its behavior: it goes wherever an image goes, so you set it on <code>background-image</code>, you can layer several of them, and you can stretch or repeat them. Once you treat gradients as images that happen to be made of color transitions, the syntax starts to make sense.</p>

      <p>There are three gradient functions in common use. Each blends colors in a different shape, and each takes a list of color stops that control where one color becomes the next.</p>

      <h2>Linear gradients</h2>
      <p>A linear gradient blends colors along a straight line. The first argument sets the direction, and the rest are color stops. Direction can be a keyword or an angle.</p>

      <pre><code>{`.box {
  background-image: linear-gradient(to right, #4f46e5, #06b6d4);
}`}</code></pre>

      <p>Here <code>to right</code> means the line runs from the left edge to the right edge, so the color shifts from indigo to cyan across the box. The keywords are <code>to top</code>, <code>to right</code>, <code>to bottom</code>, <code>to left</code>, and the diagonal pairs like <code>to top right</code>.</p>

      <h2>Angles in degrees</h2>
      <p>For precise control, pass an angle instead of a keyword. The angle describes the direction the gradient line points, measured clockwise from straight up. So <code>0deg</code> points up, <code>90deg</code> points right, <code>180deg</code> points down, and <code>45deg</code> runs diagonally toward the top right.</p>

      <pre><code>{`.box {
  background-image: linear-gradient(135deg, #f97316, #db2777);
}`}</code></pre>

      <p>At <code>135deg</code> the line points toward the bottom right, which is the direction a lot of hero backgrounds use because the diagonal feels more dynamic than a flat top-to-bottom fade.</p>

      <h2>Color stops</h2>
      <p>Each color in the list can carry a position, written as a percentage or length. The position tells the browser where that color should sit along the gradient line. Without positions, the colors spread out evenly.</p>

      <pre><code>{`.box {
  background-image: linear-gradient(
    to right,
    #10b981 0%,
    #10b981 40%,
    #3b82f6 60%,
    #3b82f6 100%
  );
}`}</code></pre>

      <p>Repeating a color at two positions creates a hard edge instead of a blend. In the example above the green holds solid until 40 percent, transitions to blue between 40 and 60 percent, then blue holds to the end. This trick builds stripes and split backgrounds without any extra elements.</p>

      <h2>Multi-stop blends</h2>
      <p>You are not limited to two colors. A multi-stop gradient lists as many colors as you want, and the browser blends between each neighboring pair. This is how you build smooth sunset-style backdrops.</p>

      <pre><code>{`.sky {
  background-image: linear-gradient(
    to bottom,
    #1e3a8a,
    #7c3aed,
    #ec4899,
    #f59e0b
  );
}`}</code></pre>

      <p>Keep the hues close on the color wheel for a soft, natural look. Jumping across the wheel produces muddy gray zones where opposite colors meet in the middle.</p>

      <h2>Transparency and overlays</h2>
      <p>Because gradients accept any color value, you can fade to transparent using <code>rgba</code> or an eight-digit hex with an alpha channel. A gradient that fades to transparent is the standard way to darken the bottom of a hero image so overlaid text stays readable.</p>

      <pre><code>{`.hero {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0)
  );
}`}</code></pre>

      <p>Since a gradient is an image, you can stack it over a photo by listing both in <code>background-image</code>, separated by a comma. The first one listed sits on top.</p>

      <pre><code>{`.hero {
  background-image:
    linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0)),
    url('/photo.jpg');
  background-size: cover;
}`}</code></pre>

      <h2>Radial gradients</h2>
      <p>A radial gradient blends outward from a center point in a circle or ellipse rather than along a line. It is the right choice for spotlights, glows, and soft vignettes.</p>

      <pre><code>{`.glow {
  background-image: radial-gradient(
    circle at center,
    #fde047,
    #f97316
  );
}`}</code></pre>

      <p>You control the shape with <code>circle</code> or <code>ellipse</code>, and the center with the <code>at</code> keyword followed by a position. A radial gradient fading from a light color to transparent makes a convincing light bloom behind a button or card.</p>

      <h2>Conic gradients</h2>
      <p>A conic gradient sweeps colors around a center point like the hands of a clock. This is what powers color wheels, pie charts, and loading spinners done in pure CSS.</p>

      <pre><code>{`.wheel {
  background-image: conic-gradient(
    from 0deg,
    red, yellow, lime, cyan, blue, magenta, red
  );
  border-radius: 50%;
}`}</code></pre>

      <p>Repeating the first color at the end closes the loop so the sweep has no visible seam. Pair conic gradients with hard color stops and you get a flat pie chart without a charting library.</p>

      <h2>Putting it to use</h2>
      <p>Buttons benefit from a subtle two-stop linear gradient that adds depth without shouting. Heroes lean on diagonal multi-stop blends or a photo plus a dark overlay. Decorative glows come from radial gradients fading to transparent. The functions are simple on their own; the craft is in choosing colors that sit close together and positioning stops so the blend feels intentional rather than accidental.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/gradient-generator" className="text-sm text-blue-600 hover:underline">Gradient Generator</Link>
        </div>
      </div>
    </article>
  )
}
