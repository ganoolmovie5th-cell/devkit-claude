import type { ToolArticle } from './index'

export const batch7: Record<string, ToolArticle> = {
  'css-clamp': {
    body: (
      <>
        <h2>Fluid sizing in a single property</h2>
        <p>
          <code>clamp()</code> takes three arguments:{' '}
          <code>clamp(min, preferred, max)</code>. The browser uses the
          preferred value but never lets it drop below the minimum or rise above
          the maximum. For typography the preferred value usually mixes a fixed
          part with a viewport part, so the text grows smoothly as the window
          widens instead of jumping at each breakpoint. One line replaces a
          stack of media queries.
        </p>
        <h3>Why the units matter</h3>
        <p>
          The common trap is writing a preferred value with only a{' '}
          <code>vw</code> unit, like <code>clamp(1rem, 5vw, 2rem)</code>. That
          technically works, but a user who zooms the page gets no change,
          because <code>vw</code> ignores zoom and font settings. Mixing a{' '}
          <code>rem</code> term in, such as <code>1rem + 2vw</code>, keeps the
          text responsive to both the viewport and the reader&apos;s own font
          preferences, which matters for accessibility.
        </p>
        <h3>Example</h3>
        <pre><code>{`h1 {
  /* min 1.5rem, scales with viewport, caps at 3rem */
  font-size: clamp(1.5rem, 1rem + 2.5vw, 3rem);
}`}</code></pre>
        <p>
          At a 320px viewport the middle term computes to about 1.5rem, so the
          floor holds. Around 1400px it reaches the 3rem ceiling. Between those
          points the heading scales in a straight line with no breakpoints to
          maintain.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Order is not enforced: if your minimum is larger than your maximum the
          result pins to the minimum, which looks like the value is stuck.
          Avoid clamping line-height to a viewport unit, since very wide screens
          then produce awkward gaps. For spacing you can clamp{' '}
          <code>padding</code> or <code>margin</code> the same way; pair it with
          a <a href="/tools/px-rem-converter">px to rem converter</a> to pick
          sensible rem bounds.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>How do I find the right slope?</strong> Pick two viewport
          widths and the sizes you want at each, then solve for the{' '}
          <code>vw</code> coefficient and the fixed <code>rem</code> offset. Many
          generators do this algebra for you from the four numbers.
        </p>
        <p>
          <strong>Does clamp() work outside font-size?</strong> Yes. It is valid
          anywhere a length is accepted: width, gap, padding, even{' '}
          <code>border-radius</code>.
        </p>
        <p>
          <strong>What about older browsers?</strong> <code>clamp()</code> is
          supported across all current browsers. If you must support very old
          ones, provide a static fallback declaration before the clamp line.
        </p>
      </>
    ),
  },

  'cubic-bezier': {
    body: (
      <>
        <h2>Shaping motion with four numbers</h2>
        <p>
          A CSS <code>cubic-bezier(x1, y1, x2, y2)</code> describes a curve that
          maps elapsed time (x) to animation progress (y). Both control points
          start the curve pulling away from the origin and ease it toward the
          end. The named keywords are shorthands for specific curves:{' '}
          <code>ease</code> is <code>cubic-bezier(0.25, 0.1, 0.25, 1)</code> and{' '}
          <code>linear</code> is a straight diagonal. Building your own lets you
          dial in exactly how an element accelerates and settles.
        </p>
        <h3>The x axis is clamped, the y axis is not</h3>
        <p>
          The two x values must stay between 0 and 1, because time cannot run
          backward. The y values can go below 0 or above 1, and that is where
          the interesting effects live. A y above 1 makes the animation
          overshoot its target and ease back, which reads as a bouncy, playful
          finish. A y below 0 makes it anticipate by pulling backward first.
        </p>
        <h3>Example</h3>
        <pre><code>{`.card {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.card:hover {
  transform: translateY(-6px);
}`}</code></pre>
        <p>
          The <code>1.56</code> as the second control point&apos;s y value is
          what pushes the card slightly past its resting position before it
          settles, giving a subtle spring without any JavaScript.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Overshoot curves look wrong on properties that should not exceed a
          bound, like <code>opacity</code>, where a value above 1 just clips and
          wastes the effect. Steep curves can also feel abrupt on long distances.
          Keep durations short (150-350ms) for UI feedback; a dramatic ease over
          a full second usually feels sluggish. For scaling motion across sizes,
          an <a href="/tools/css-clamp">easing paired with clamp()</a> keeps both
          size and timing coherent.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does my curve look linear?</strong> If both control points
          sit near the diagonal (for example <code>0.5, 0.5</code> twice) the
          curve barely bends. Pull the points apart to see acceleration.
        </p>
        <p>
          <strong>Can I use this for keyframe animations?</strong> Yes.{' '}
          <code>animation-timing-function</code> accepts the same{' '}
          <code>cubic-bezier()</code> value, and it applies between each pair of
          keyframes.
        </p>
        <p>
          <strong>What about spring physics?</strong> Bezier curves approximate
          springs but cannot model true oscillation. For multiple bounces you
          need a spring library or the newer <code>linear()</code> easing
          function.
        </p>
      </>
    ),
  },

  'css-grid-generator': {
    body: (
      <>
        <h2>Laying out in two dimensions</h2>
        <p>
          CSS Grid controls rows and columns at once, which is what sets it apart
          from flexbox&apos;s single axis. You define tracks with{' '}
          <code>grid-template-columns</code> and{' '}
          <code>grid-template-rows</code>, then place items into the cells. The{' '}
          <code>fr</code> unit represents a fraction of the leftover space, so{' '}
          <code>1fr 2fr</code> gives the second column twice the width of the
          first after any fixed sizes are subtracted.
        </p>
        <h3>repeat, minmax, and auto-fill</h3>
        <p>
          Writing <code>1fr 1fr 1fr</code> is fine, but{' '}
          <code>repeat(3, 1fr)</code> scales better. The real power combo is{' '}
          <code>repeat(auto-fill, minmax(200px, 1fr))</code>, which creates as
          many 200px-minimum columns as fit and lets them grow to fill the row.
          That builds a responsive card grid with no media queries at all.
        </p>
        <h3>Example</h3>
        <pre><code>{`.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}`}</code></pre>
        <p>
          On a narrow phone this collapses to one column; on a wide monitor it
          might show five. Each item keeps a sensible minimum width and the{' '}
          <code>gap</code> property spaces them without margin hacks.
        </p>
        <h3>Pitfalls</h3>
        <p>
          A frequent confusion is <code>auto-fill</code> versus{' '}
          <code>auto-fit</code>: <code>auto-fill</code> keeps empty tracks when
          there are few items, while <code>auto-fit</code> collapses them so the
          present items stretch across the whole row. Line-based placement counts
          grid lines, not cells, so a track spanning columns 1 to 3 covers two
          columns, not three. For a single-axis bar or toolbar, the{' '}
          <a href="/tools/css-clamp">simpler clamp-based sizing</a> on a flex row
          is often enough.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Grid or flexbox?</strong> Grid when you control both axes (a
          page layout, a card gallery). Flexbox when content flows along one axis
          and should wrap naturally.
        </p>
        <p>
          <strong>How do named areas work?</strong>{' '}
          <code>grid-template-areas</code> lets you draw the layout as a string
          map, then assign each child a name. It is readable but rigid, so it
          suits stable page shells more than dynamic content.
        </p>
        <p>
          <strong>Why does an item overflow its cell?</strong> Grid items default
          to <code>min-width: auto</code>, so long content refuses to shrink. Set{' '}
          <code>min-width: 0</code> on the item to let it fit.
        </p>
      </>
    ),
  },

  'border-radius-visualizer': {
    body: (
      <>
        <h2>Corners, one radius at a time</h2>
        <p>
          <code>border-radius</code> accepts one to four values that map to the
          corners clockwise from top-left: top-left, top-right, bottom-right,
          bottom-left. Give it one value and all four corners match; give it two
          and the first applies to the top-left/bottom-right diagonal. Each
          corner can also take two radii, a horizontal and a vertical one, which
          produces an ellipse rather than a circle at that corner.
        </p>
        <h3>The slash syntax for elliptical corners</h3>
        <p>
          The full form separates horizontal radii from vertical radii with a
          slash: <code>border-radius: 20px / 40px</code> makes every corner an
          ellipse that is 20px wide and 40px tall. This is how you create soft,
          organic shapes instead of uniform rounding, and it is easy to miss
          because the one-value form hides it.
        </p>
        <h3>Example</h3>
        <pre><code>{`/* a speech-bubble-ish asymmetric card */
.bubble {
  border-radius: 16px 16px 16px 4px;
}

/* a true pill, whatever the height */
.pill {
  border-radius: 9999px;
}`}</code></pre>
        <p>
          A very large value like <code>9999px</code> always produces a full
          pill or circle, because each corner can only round up to half the
          shorter side; the browser caps it for you.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Percentage radii are relative to the element&apos;s own width and
          height, so <code>50%</code> turns a square into a circle but a
          rectangle into an ellipse. Rounded corners on a parent do not clip
          children unless you add <code>overflow: hidden</code>, which is the
          usual reason an image pokes past a card&apos;s rounded edge. Pair this
          with the <a href="/tools/gradient-generator">gradient generator</a>{' '}
          when you want a rounded card with a soft background.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why do my corners look uneven?</strong> If the element has a
          border, the inner and outer radii differ. The browser shrinks the
          inner curve to keep the border width constant, which can look thin at
          the corners.
        </p>
        <p>
          <strong>Can I animate border-radius?</strong> Yes, it is animatable, so
          morphing a square into a circle on hover works. Keep the start and end
          value forms consistent so the interpolation stays smooth.
        </p>
        <p>
          <strong>What is the squircle look?</strong> True superellipse corners
          are not native CSS yet; approximate them with a large elliptical radius
          or an SVG mask.
        </p>
      </>
    ),
  },

  'svg-to-css': {
    body: (
      <>
        <h2>Inlining an SVG as a background</h2>
        <p>
          Any SVG can live directly inside a CSS <code>background-image</code> as
          a data URI, which removes a network request and keeps the icon in the
          same file as the rule that uses it. The SVG markup is wrapped in{' '}
          <code>url(&quot;data:image/svg+xml,...&quot;)</code> after a few
          characters are escaped so they do not break the CSS string.
        </p>
        <h3>Escape, do not always Base64</h3>
        <p>
          You can Base64-encode the SVG, but for text-based SVG that bloats the
          output by about a third and makes it unreadable. URL-encoding only the
          characters that matter keeps the result smaller and still editable. At
          minimum you must handle <code>#</code> (used in hex colors),{' '}
          <code>&lt;</code>, <code>&gt;</code>, and the quote style that would
          otherwise close the CSS string.
        </p>
        <h3>Example</h3>
        <pre><code>{`.icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M2 8h12'/%3E%3C/svg%3E");
  background-size: contain;
}`}</code></pre>
        <p>
          Note the single quotes inside the SVG and double quotes around the
          whole <code>url()</code>; mixing them avoids an escape war. The{' '}
          <code>%3C</code> and <code>%3E</code> are the encoded angle brackets.
        </p>
        <h3>Pitfalls</h3>
        <p>
          A literal <code>#</code> in a fill color terminates the data URI in
          some browsers, so encode it as <code>%23</code>. Keep an{' '}
          <code>xmlns</code> attribute on the root <code>svg</code> or the image
          will not render as a background. For large or repeated icons, consider
          running the file through the{' '}
          <a href="/tools/svg-minifier">SVG minifier</a> first so the inlined
          string stays short.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Can I recolor the SVG with CSS?</strong> Not through{' '}
          <code>background-image</code>; the color is baked into the markup. Use
          an inline <code>&lt;svg&gt;</code> or a <code>mask</code> if you need{' '}
          <code>currentColor</code>.
        </p>
        <p>
          <strong>Why is my background blank?</strong> Usually a missing{' '}
          <code>xmlns</code>, an unescaped quote, or a <code>viewBox</code> that
          does not match the path coordinates.
        </p>
        <p>
          <strong>Base64 or URL-encoded?</strong> URL-encode text SVG for size
          and legibility; reach for Base64 only when the SVG embeds binary data
          like a raster image.
        </p>
      </>
    ),
  },

  'svg-minifier': {
    body: (
      <>
        <h2>Trimming SVG without touching the drawing</h2>
        <p>
          SVG files exported from design tools carry a lot of baggage: editor
          metadata, XML comments, an <code>&lt;?xml?&gt;</code> prolog, a
          doctype, hidden layers, and generous whitespace. None of it affects
          what you see. Minifying strips the dead weight and leaves the geometry
          intact, which matters most when you inline icons where every byte
          repeats in your CSS or HTML.
        </p>
        <h3>What is safe to remove</h3>
        <p>
          Comments, the prolog, editor namespaces like{' '}
          <code>xmlns:sodipodi</code>, empty groups, and default attribute values
          all go without visual change. More aggressive passes round path
          coordinates to fewer decimals and merge transforms, which can shave
          significant size on detailed artwork but risk tiny shifts if you round
          too hard.
        </p>
        <h3>Example</h3>
        <pre><code>{`Before:
<?xml version="1.0"?>
<!-- Created with Editor -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
  <path d="M12.000 2.000 L22.000 12.000" />
</svg>

After:
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2 22 12"/></svg>`}</code></pre>
        <p>
          The trailing zeros collapse, the comment and prolog disappear, and the
          whitespace between tags is gone. The rendered line is identical.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Do not strip the root <code>xmlns</code>; without it the SVG stops
          rendering in many contexts. Removing <code>id</code> attributes breaks
          any SVG that references them for gradients, clip paths, or animation.
          If you are feeding the result into a CSS background, minify first and
          then run the <a href="/tools/svg-to-css">SVG to CSS converter</a> so
          the data URI is as small as possible.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Will minifying change colors or shapes?</strong> Safe passes do
          not. Only coordinate rounding can shift anything, and only by sub-pixel
          amounts at reasonable precision.
        </p>
        <p>
          <strong>Can I keep it readable?</strong> Yes, choose a mode that keeps
          attribute formatting but drops comments and prolog. Full minification
          trades legibility for size.
        </p>
        <p>
          <strong>Does it help gzip?</strong> Already-gzipped transfer sizes
          shrink less dramatically, but inlined SVG in CSS still benefits because
          the raw string is shorter in every copy.
        </p>
      </>
    ),
  },

  'tailwind-colors': {
    body: (
      <>
        <h2>The Tailwind color scale</h2>
        <p>
          Tailwind ships a palette of named hues (slate, red, amber, emerald,
          and so on), each with a numbered scale from <code>50</code> to{' '}
          <code>950</code>. The number is a lightness step: <code>50</code> is
          nearly white, <code>500</code> sits in the middle, and <code>950</code>{' '}
          is almost black. Picking shades by number instead of eyeballing hex
          values keeps contrast relationships predictable across a design.
        </p>
        <h3>How the steps are meant to pair</h3>
        <p>
          A reliable pattern is text at <code>700</code> to <code>900</code> on a
          background at <code>50</code> to <code>100</code> of the same hue, which
          keeps a family feel while staying readable. The <code>500</code> step
          is the brand anchor most people reach for, but it is often too light
          for body text on white. Checking the pair in a{' '}
          <a href="/tools/contrast-checker">contrast checker</a> before shipping
          saves a redesign later.
        </p>
        <h3>Example</h3>
        <pre><code>{`/* the raw values behind two common classes */
.bg-blue-500 { background-color: #3b82f6; }
.text-blue-900 { color: #1e3a8a; }

/* use the hex directly outside Tailwind */
button { background: #3b82f6; }`}</code></pre>
        <p>
          Copying the hex lets you reuse the palette in plain CSS, a canvas
          drawing, or a design file where Tailwind classes do not apply.
        </p>
        <h3>Pitfalls</h3>
        <p>
          The scale is perceptual, not linear, so <code>400</code> is not exactly
          halfway between <code>300</code> and <code>500</code> in any single
          channel. Gray and the true-neutral hues differ: <code>slate</code>,{' '}
          <code>gray</code>, <code>zinc</code>, <code>neutral</code>, and{' '}
          <code>stone</code> carry subtly different temperature tints, so mixing
          them in one UI can look muddy. Convert any value with the{' '}
          <a href="/tools/color-converter">color converter</a> if you need HSL to
          build custom intermediate shades.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Which step is accessible on white?</strong> As a rule of thumb{' '}
          <code>600</code> or darker clears the 4.5:1 text threshold for most
          hues, but verify, since yellows and limes stay light even at{' '}
          <code>600</code>.
        </p>
        <p>
          <strong>Can I add my own shade?</strong> Yes, extend the theme with a
          custom hue and the same <code>50</code>-<code>950</code> keys so
          utilities generate consistently.
        </p>
        <p>
          <strong>Why do my colors look different in dark mode?</strong> Flip the
          scale: a <code>100</code> background becomes an <code>900</code> one,
          and text moves from <code>900</code> toward <code>100</code>.
        </p>
      </>
    ),
  },

  'tailwind-to-css': {
    body: (
      <>
        <h2>Unpacking utility classes</h2>
        <p>
          Each Tailwind class is a shortcut for one or a few CSS declarations.{' '}
          <code>pt-4</code> is <code>padding-top: 1rem</code>,{' '}
          <code>flex</code> is <code>display: flex</code>, and{' '}
          <code>text-center</code> is <code>text-align: center</code>. Translating
          a string of utilities back to plain CSS is useful when you are leaving
          Tailwind, debugging a specificity clash, or explaining what a component
          actually does to someone who does not use the framework.
        </p>
        <h3>The spacing scale is the key</h3>
        <p>
          Most numeric utilities map through a 4px base: the number is quarters
          of a rem, so <code>4</code> is <code>1rem</code> (16px),{' '}
          <code>2</code> is <code>0.5rem</code>, and <code>8</code> is{' '}
          <code>2rem</code>. Knowing that one rule lets you decode padding,
          margin, gap, width, and height classes at a glance.
        </p>
        <h3>Example</h3>
        <pre><code>{`<!-- Tailwind -->
<div class="flex items-center gap-2 px-4 py-2 rounded-lg">

/* equivalent CSS */
.box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}`}</code></pre>
        <p>
          The <code>px-4 py-2</code> pair becomes shorthand padding, and{' '}
          <code>rounded-lg</code> resolves to a fixed <code>0.5rem</code> radius
          from the theme.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Responsive and state prefixes do not translate to a flat rule. A class
          like <code>md:flex</code> is a <code>@media</code> block, and{' '}
          <code>hover:bg-blue-500</code> is a <code>:hover</code> selector, so a
          naive converter that drops the prefix changes the behavior. Arbitrary
          values in square brackets, such as <code>top-[7px]</code>, pass through
          literally. For the raw palette numbers behind color utilities, keep the{' '}
          <a href="/tools/tailwind-colors">Tailwind colors reference</a> open.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Do custom themes change the output?</strong> Yes. If a project
          overrides the spacing or color scale, <code>p-4</code> might not be
          1rem. A generic converter assumes the defaults.
        </p>
        <p>
          <strong>What about !important?</strong> The <code>!</code> prefix (for
          example <code>!mt-0</code>) adds <code>!important</code> to the
          declaration.
        </p>
        <p>
          <strong>Can I go the other way?</strong> Converting plain CSS to
          Tailwind is lossier, because many CSS values have no exact utility and
          fall back to arbitrary bracket syntax.
        </p>
      </>
    ),
  },

  'color-palette-generator': {
    body: (
      <>
        <h2>Palettes from color theory</h2>
        <p>
          A harmonious palette is not random; it follows relationships on the
          color wheel. Starting from one base hue, a generator rotates the hue by
          fixed angles to find colors that sit well together. Complementary pairs
          are 180 degrees apart, analogous colors are the near neighbors within
          about 30 degrees, and a triadic set is three hues spaced 120 degrees
          apart.
        </p>
        <h3>Picking a scheme on purpose</h3>
        <p>
          Analogous palettes feel calm and cohesive, which suits backgrounds and
          large surfaces. Complementary palettes create tension and pop, so they
          work for a call-to-action against a muted field. A split-complementary
          scheme softens that contrast by using the two neighbors of the
          complement instead of the complement itself, which is often more
          forgiving.
        </p>
        <h3>Example</h3>
        <pre><code>{`Base:          hsl(210, 70%, 50%)   /* a blue */
Complement:    hsl(30, 70%, 50%)    /* +180 -> orange */
Analogous:     hsl(180, 70%, 50%), hsl(240, 70%, 50%)
Triadic:       hsl(330, 70%, 50%), hsl(90, 70%, 50%)`}</code></pre>
        <p>
          Working in HSL makes the rotation obvious: only the first number, the
          hue, changes. Holding saturation and lightness steady keeps the set
          feeling like one family.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Equal lightness across hues does not mean equal perceived brightness;
          yellow at 50 percent lightness looks far brighter than blue at the same
          value, so a mechanically generated palette can feel unbalanced. Always
          test a text-and-background pair in the{' '}
          <a href="/tools/contrast-checker">contrast checker</a>, and preview the
          result in the{' '}
          <a href="/tools/color-blindness-simulator">color blindness simulator</a>{' '}
          so you are not relying on a red-green distinction alone.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>How many colors should a palette have?</strong> A workable UI
          palette is usually one or two brand hues plus a neutral range and a
          couple of semantic colors for success and error.
        </p>
        <p>
          <strong>Why do my generated colors look garish?</strong> Full
          saturation reads as cheap on screens. Pull saturation down toward
          60-80 percent for most interface colors.
        </p>
        <p>
          <strong>Can I lock one color?</strong> Yes, fix your brand hue as the
          base and let the generator derive the rest around it.
        </p>
      </>
    ),
  },

  'contrast-checker': {
    body: (
      <>
        <h2>What a contrast ratio measures</h2>
        <p>
          Contrast ratio compares the relative luminance of two colors and
          returns a number from 1:1 (identical) to 21:1 (black on white). WCAG
          uses it to decide whether text is legible for people with low vision.
          The ratio is computed from the colors&apos; luminance, not their hue,
          which is why two very different-looking colors can still fail if they
          are equally bright.
        </p>
        <h3>The thresholds you need to hit</h3>
        <p>
          For normal body text, AA requires 4.5:1 and AAA requires 7:1. Large
          text, defined as 18pt (24px) or 14pt (about 18.66px) bold, has an
          easier bar: 3:1 for AA and 4.5:1 for AAA. There is a separate 3:1 rule
          for non-text elements like icons, input borders, and focus indicators,
          which teams often forget.
        </p>
        <h3>Example</h3>
        <pre><code>{`#767676 on #ffffff -> 4.54:1  -> passes AA for body text
#999999 on #ffffff -> 2.85:1  -> fails AA body, fails even large
#595959 on #ffffff -> 7.00:1  -> passes AAA`}</code></pre>
        <p>
          That jump shows how little room there is: nudging gray text from{' '}
          <code>#999</code> to <code>#767676</code> is the difference between
          failing and passing the body-text threshold.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Contrast alone does not make a UI accessible. A color pair can pass 4.5:1
          yet still be invisible to someone with a color-vision deficiency if the
          only cue is hue, so pair this with the{' '}
          <a href="/tools/color-blindness-simulator">color blindness simulator</a>.
          Text over a gradient or photo must meet the ratio at its worst point,
          not its average, which usually means adding a scrim. Semi-transparent
          text is measured against the composited result, not the declared color.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does the ratio care which color is text?</strong> No, the
          formula is symmetric. Light text on dark gives the same ratio as the
          reverse.
        </p>
        <p>
          <strong>What counts as large text exactly?</strong> 18.66px bold or
          24px regular and up. Below that, the stricter 4.5:1 body rule applies.
        </p>
        <p>
          <strong>Why did a passing pair fail after a theme tweak?</strong>{' '}
          Lightening a background or adding opacity changes the effective
          luminance; re-check after any color change, perhaps using the{' '}
          <a href="/tools/color-palette-generator">palette generator</a> to find
          a compliant shade.
        </p>
      </>
    ),
  },

  'color-blindness-simulator': {
    body: (
      <>
        <h2>Seeing a design through different eyes</h2>
        <p>
          Color-vision deficiency affects roughly 8 percent of men and 0.5
          percent of women, most commonly in the red-green range. A simulator
          transforms your colors through a model of how a given deficiency
          perceives them, so you can spot places where two colors that look
          distinct to you collapse into the same shade for a large slice of your
          users.
        </p>
        <h3>The main types</h3>
        <p>
          Protanopia and deuteranopia are the red-green forms and are by far the
          most common; reds, greens, and browns tend to muddy together.
          Tritanopia is the rarer blue-yellow form. There are also anomalous
          versions (protanomaly, deuteranomaly) where the sensitivity is reduced
          rather than absent. A good simulator covers at least the three dichromatic
          types.
        </p>
        <h3>Example</h3>
        <pre><code>{`A red "error" and green "success" badge:
  Normal vision:      clearly different
  Deuteranopia:       both read as dull yellow-brown

Fix: add an icon or label, not just color
  error   -> red + ✕ + "Error"
  success -> green + ✓ + "Success"`}</code></pre>
        <p>
          The repair is almost never a different color; it is a second channel of
          information, a shape, an icon, or text, so the meaning does not depend
          on hue perception.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Status systems built purely on red and green are the classic failure,
          and they appear everywhere from form validation to charts. Charts with
          many similar hues become unreadable; use distinct lightness steps or
          direct labels instead. Passing the{' '}
          <a href="/tools/contrast-checker">contrast checker</a> does not cover
          this, because contrast and color discrimination are different problems.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Is simulating enough to be accessible?</strong> It catches hue
          collisions, but you still need sufficient contrast and non-color cues.
          Treat it as one check among several.
        </p>
        <p>
          <strong>Which type should I test first?</strong> Deuteranopia, since
          red-green deficiency is the most prevalent, then confirm with the
          others.
        </p>
        <p>
          <strong>Can I rely on safe palettes?</strong> Colorblind-safe palettes
          help, but always verify your specific pairings; context and size change
          whether two colors stay distinguishable.
        </p>
      </>
    ),
  },

  'image-resize': {
    body: (
      <>
        <h2>Resizing and compressing in the browser</h2>
        <p>
          Resizing changes an image&apos;s pixel dimensions; compression reduces
          the file size for a given set of dimensions. Doing both locally means
          the image is drawn to a canvas and re-encoded in your browser, so the
          file never leaves your machine. That is faster for a one-off and keeps
          private screenshots off a third-party server.
        </p>
        <h3>Downscale, do not upscale</h3>
        <p>
          Shrinking an image discards pixels and looks clean. Enlarging invents
          pixels and always softens, because there is no detail to recover.
          Export your source at the largest size you will actually display, then
          scale down from there. For responsive sites, generate a couple of
          widths rather than serving one huge file to every device.
        </p>
        <h3>Example</h3>
        <pre><code>{`Source:  4000 x 3000, 6.2 MB JPEG
Resize:  1600 x 1200  (fits a content column)
Quality: 0.8 JPEG
Result:  ~380 KB, visually identical on screen`}</code></pre>
        <p>
          The big win is usually the resize, not the quality slider. A 4000px
          photo shown in a 1600px column wastes most of its data before any
          compression even runs.
        </p>
        <h3>Pitfalls</h3>
        <p>
          JPEG re-encoding is lossy every time, so repeatedly resizing the same
          file compounds artifacts; always go back to the original. Keep the
          aspect ratio locked unless you intend to distort, which is where an{' '}
          <a href="/tools/aspect-ratio-calculator">aspect ratio calculator</a>{' '}
          helps you pick matching dimensions. If you need a different format
          afterward, the{' '}
          <a href="/tools/image-convert">image format converter</a> handles that
          step.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>What quality setting should I use?</strong> For photos, 0.75 to
          0.85 JPEG is usually indistinguishable from the original at normal
          viewing sizes. Flat graphics do better as PNG or WebP.
        </p>
        <p>
          <strong>Does resizing in-browser lose EXIF data?</strong> Re-encoding
          typically strips metadata like location and camera info, which is often
          a privacy benefit.
        </p>
        <p>
          <strong>Why is my PNG not shrinking much?</strong> PNG is lossless;
          for photographic content switch to JPEG or WebP, which compress tonal
          gradients far better.
        </p>
      </>
    ),
  },

  'image-convert': {
    body: (
      <>
        <h2>Choosing the right raster format</h2>
        <p>
          PNG, JPEG, and WebP each suit different content. PNG is lossless and
          supports transparency, which makes it right for logos, icons, and
          screenshots with sharp edges. JPEG is lossy and has no transparency but
          compresses photographs small. WebP is the newer all-rounder: it does
          both lossy and lossless, supports an alpha channel, and usually beats
          both older formats on size.
        </p>
        <h3>Transparency is the deciding factor</h3>
        <p>
          If an image has transparent areas and you convert it to JPEG, those
          areas fill with a solid color, usually black or white, because JPEG has
          no alpha channel. That is the most common conversion surprise. WebP
          keeps alpha, so a transparent PNG converts to WebP without losing its
          cutout.
        </p>
        <h3>Example</h3>
        <pre><code>{`Logo with transparency:
  PNG  -> 48 KB, crisp edges, alpha intact
  WebP -> 22 KB, alpha intact
  JPEG -> 31 KB, BUT transparent areas turn solid`}</code></pre>
        <p>
          For that logo, WebP is the clear pick: smaller than PNG and it keeps
          the transparency JPEG would destroy.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Converting JPEG to PNG does not restore quality; it just wraps the
          already-lossy pixels in a larger lossless container. Going from a
          lossy format to another lossy format stacks artifacts, so convert from
          the highest-quality source you have. After converting, you can further
          shrink dimensions with the{' '}
          <a href="/tools/image-resize">image resizer</a>, or encode the result
          for inline use with{' '}
          <a href="/tools/image-to-base64">image to Base64</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Is WebP safe to use everywhere?</strong> All current browsers
          support it. If you must support very old clients, keep a JPEG or PNG
          fallback via the <code>&lt;picture&gt;</code> element.
        </p>
        <p>
          <strong>What about AVIF?</strong> AVIF often compresses even smaller
          than WebP but encodes slower and has slightly narrower support; it is
          worth it for large hero images.
        </p>
        <p>
          <strong>Why did my photo get bigger as PNG?</strong> PNG stores
          photographic detail poorly. Keep photos in JPEG or WebP.
        </p>
      </>
    ),
  },

  'image-to-base64': {
    body: (
      <>
        <h2>Embedding an image as text</h2>
        <p>
          Converting an image to Base64 produces a data URI you can paste
          directly into HTML, CSS, or JavaScript, so the image travels inside the
          code with no separate file. The string starts with a MIME type and the
          Base64 marker, like <code>data:image/png;base64,</code>, followed by the
          encoded bytes. The browser decodes it and renders the image inline.
        </p>
        <h3>The size tradeoff</h3>
        <p>
          Base64 encoding enlarges the data by about a third, since every three
          bytes become four characters. Inlining removes one network request,
          which helps for tiny assets like a 1px gradient or a small icon, but it
          hurts for anything large because the browser cannot cache the image
          separately and the host document grows. The same encoding math applies
          to any file; see the general{' '}
          <a href="/tools/base64-encode-decode">Base64 encoder</a>.
        </p>
        <h3>Example</h3>
        <pre><code>{`/* a small inline icon in CSS */
.badge {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...");
}

<!-- or straight in HTML -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..." alt="badge" />`}</code></pre>
        <p>
          The ellipsis stands in for the full encoded body, which for a real icon
          runs hundreds of characters even when the source file is small.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Large inlined images bloat your CSS or HTML and block caching, so keep
          data URIs under a few kilobytes as a rule of thumb. The declared MIME
          type must match the real format or some browsers refuse to render it.
          For vector art, a <a href="/tools/svg-to-css">URL-encoded SVG</a> is
          almost always smaller than a Base64 PNG of the same icon.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does Base64 compress the image?</strong> No, the opposite. Resize
          and compress first with the{' '}
          <a href="/tools/image-resize">image resizer</a>, then encode the smaller
          file.
        </p>
        <p>
          <strong>Can I use it for favicons or emails?</strong> Favicons yes, in
          some setups. Email clients are inconsistent about inline data URIs, so
          test before relying on it.
        </p>
        <p>
          <strong>Is the image hidden or encrypted?</strong> No. Base64 is just
          an encoding; anyone can decode it back to the original image.
        </p>
      </>
    ),
  },

  'placeholder-image': {
    body: (
      <>
        <h2>Stand-in images for layout work</h2>
        <p>
          A placeholder image is a generated rectangle of a chosen size and
          color, often with its dimensions printed on it, used to fill a slot
          before the real asset exists. It lets you build and test a layout, see
          how content wraps, and reserve the right amount of space without hunting
          for stock photos.
        </p>
        <h3>Reserve space to avoid layout shift</h3>
        <p>
          The real value is holding the exact dimensions the final image will
          use. If the placeholder matches the production width and height, the
          browser reserves that space up front and content does not jump when the
          real image loads later. That stability is part of the Cumulative Layout
          Shift metric that affects both user experience and search ranking.
        </p>
        <h3>Example</h3>
        <pre><code>{`<img
  src="https://placeholder.example/640x360/cccccc/333333?text=Hero"
  width="640"
  height="360"
  alt="Placeholder for hero image"
/>`}</code></pre>
        <p>
          The <code>640x360</code> sets the size, the two hex values set
          background and text color, and the <code>width</code> and{' '}
          <code>height</code> attributes let the browser reserve the box before
          the image arrives.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Placeholders that do not match the final aspect ratio give a false
          sense of the layout; compute matching dimensions with the{' '}
          <a href="/tools/aspect-ratio-calculator">aspect ratio calculator</a>.
          Leaving placeholder URLs in production is a common mistake that breaks
          when the generating service is down. For a people-shaped stand-in, an{' '}
          <a href="/tools/avatar-generator">initials avatar</a> often reads better
          than a gray box.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>SVG or raster placeholder?</strong> An inline SVG placeholder
          is tiny and scales crisply, which makes it a good choice for a local,
          dependency-free stand-in.
        </p>
        <p>
          <strong>Can I use a solid color div instead?</strong> Yes, a colored
          box with fixed dimensions is the lightest placeholder of all; the
          labeled image just makes the intended size obvious.
        </p>
        <p>
          <strong>What size should I pick?</strong> Match the production slot
          exactly, including the device pixel ratio if you serve retina assets.
        </p>
      </>
    ),
  },

  'avatar-generator': {
    body: (
      <>
        <h2>Initials avatars done deterministically</h2>
        <p>
          When a user has no profile photo, a tidy fallback is a colored circle
          showing their initials. The trick that makes it feel designed rather
          than random is determinism: the same name always maps to the same
          color. That consistency means a person is visually recognizable across
          a list, a comment thread, and a header without any stored image.
        </p>
        <h3>How the color is derived</h3>
        <p>
          The name is run through a simple hash to produce a number, then that
          number is mapped onto a fixed palette or a hue on the color wheel.
          Because the hash is stable, &quot;Ada Lovelace&quot; lands on the same
          swatch every time. Picking the hue in HSL with a fixed saturation and
          lightness keeps every generated avatar legible and in the same visual
          family.
        </p>
        <h3>Example</h3>
        <pre><code>{`function colorFromName(name) {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) | 0
  const hue = Math.abs(hash) % 360
  return 'hsl(' + hue + ', 65%, 45%)'
}
// "Ada Lovelace" -> always the same hue`}</code></pre>
        <p>
          The fixed 65 percent saturation and 45 percent lightness guarantee the
          white initials stay readable on top, whatever hue the hash picks.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Deriving initials is harder than taking the first two letters:
          single-word names, names with particles like &quot;van&quot;, and
          non-Latin scripts all need thought. A purely hue-based color can still
          land on a low-contrast combination, so lock lightness and verify the
          worst case against the{' '}
          <a href="/tools/contrast-checker">contrast checker</a>. For a plain box
          stand-in instead of a person, use the{' '}
          <a href="/tools/placeholder-image">placeholder image generator</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why deterministic colors?</strong> So the same user keeps the
          same avatar everywhere, which aids recognition and avoids a jarring
          color change on reload.
        </p>
        <p>
          <strong>How many initials should I show?</strong> One or two. More than
          two gets cramped in a small circle and loses legibility.
        </p>
        <p>
          <strong>What about right-to-left names?</strong> Detect the script and
          take the leading characters in logical order; do not assume left-to-right.
        </p>
      </>
    ),
  },

  'aspect-ratio-calculator': {
    body: (
      <>
        <h2>Keeping proportions while you resize</h2>
        <p>
          An aspect ratio is the relationship between width and height, written
          as width:height, like 16:9 or 4:3. The calculator does two jobs: reduce
          a pair of dimensions to its simplest ratio, and scale one dimension to
          find the matching other dimension so the image or video does not
          stretch. Both come down to one proportion that must hold.
        </p>
        <h3>The one equation</h3>
        <p>
          If the original is W by H and you fix a new width w, the matching height
          is <code>h = w * H / W</code>. Fix the height instead and width is{' '}
          <code>w = h * W / H</code>. Everything else, from fitting a thumbnail
          to sizing a responsive video, is that single relationship applied in
          one direction or the other.
        </p>
        <h3>Example</h3>
        <pre><code>{`Original: 1920 x 1080  -> ratio 16:9
Target width 1280:
  height = 1280 * 1080 / 1920 = 720
Result: 1280 x 720  (still 16:9)`}</code></pre>
        <p>
          Because 1280x720 holds the same 16:9 proportion, the resized frame
          looks identical, just smaller. Change the height to anything other than
          720 and the picture distorts.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Rounding to whole pixels can nudge the ratio off by a hair; for CSS
          layout, prefer the <code>aspect-ratio</code> property so the browser
          does the math and never leaves a fractional pixel. Confusing which
          number is width in a &quot;ratio&quot; is a frequent slip, since 9:16 is
          portrait and 16:9 is landscape. When you then shrink the file itself,
          hand the dimensions to the{' '}
          <a href="/tools/image-resize">image resizer</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>How do I reduce 1920:1080 to 16:9?</strong> Divide both by their
          greatest common divisor (120 here). The calculator does this to show the
          simplest form.
        </p>
        <p>
          <strong>Can I use the CSS aspect-ratio property instead?</strong> Yes.{' '}
          <code>aspect-ratio: 16 / 9</code> on a box keeps the shape responsively
          without computing a fixed height.
        </p>
        <p>
          <strong>What ratio for social video?</strong> 16:9 for landscape, 9:16
          for vertical stories and reels, 1:1 for square feed posts.
        </p>
      </>
    ),
  },

  'px-rem-converter': {
    body: (
      <>
        <h2>Pixels, rem, and em untangled</h2>
        <p>
          A pixel is an absolute length. A <code>rem</code> is relative to the
          root font size, usually 16px by default, so <code>1rem</code> equals
          16px until someone changes the root. An <code>em</code> is relative to
          the font size of the current element, which can cascade and compound.
          Converting between them is dividing or multiplying by the root size.
        </p>
        <h3>Why rem beats px for type</h3>
        <p>
          When a user raises their browser&apos;s default font size for
          readability, lengths set in <code>px</code> ignore that preference,
          while <code>rem</code> values scale with it. Sizing text and spacing in
          <code>rem</code> therefore respects accessibility settings. The common
          base is 16px, so the mental shortcut is: divide px by 16 to get rem.
        </p>
        <h3>Example</h3>
        <pre><code>{`Root font-size: 16px

24px / 16 = 1.5rem
12px / 16 = 0.75rem
40px / 16 = 2.5rem

/* em compounds: 1.2em inside a 1.2em parent = 1.44x root */`}</code></pre>
        <p>
          That last line is the <code>em</code> trap: nested elements each
          multiply, so an <code>em</code> value deep in the tree is not what it
          looks like in isolation.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Some teams set <code>html &#123; font-size: 62.5% &#125;</code> so{' '}
          <code>1rem</code> equals 10px for easier math, but that quietly rescales
          every rem-based third-party style and can cause surprises. Prefer{' '}
          <code>em</code> only where you want sizing to follow the local font,
          like padding inside a button. For fluid type that interpolates between
          rem bounds, combine this with the{' '}
          <a href="/tools/css-clamp">clamp() generator</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does the 16px base ever change?</strong> It is the browser
          default, but any stylesheet can override the root, so confirm the base
          before trusting a conversion.
        </p>
        <p>
          <strong>rem or em for media queries?</strong> Media query lengths in{' '}
          <code>em</code> are based on the browser default, not the root element,
          which is a subtle but documented difference.
        </p>
        <p>
          <strong>Should I convert borders to rem?</strong> Hairline borders
          often look best in <code>px</code> so they do not scale into fuzzy
          fractional widths.
        </p>
      </>
    ),
  },

  'editorconfig-generator': {
    body: (
      <>
        <h2>One file, consistent formatting</h2>
        <p>
          An <code>.editorconfig</code> file tells editors how to format files in
          a project: indent style, indent size, line endings, character set, and
          whether to trim trailing whitespace. Most editors read it natively or
          through a plugin, so a team on mixed tools still produces the same
          whitespace. It settles the tabs-versus-spaces argument once, at the
          repo level.
        </p>
        <h3>How the rules apply</h3>
        <p>
          The file is read from the current directory upward until one with{' '}
          <code>root = true</code> is found. Sections use glob patterns, so you
          can set a default under <code>[*]</code> and then override specific file
          types. This is how a project uses two-space indentation everywhere but
          tabs in Makefiles, which require them.
        </p>
        <h3>Example</h3>
        <pre><code>{`root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab`}</code></pre>
        <p>
          Markdown keeps its trailing whitespace because two trailing spaces mean
          a hard line break there, and the Makefile section restores the tabs its
          syntax demands.
        </p>
        <h3>Pitfalls</h3>
        <p>
          EditorConfig only governs whitespace and encoding; it does not reorder
          imports or enforce code style, so it complements a formatter like
          Prettier rather than replacing it. Forgetting <code>root = true</code>{' '}
          lets a parent config leak in unexpectedly. Pair it with a{' '}
          <a href="/tools/gitignore-generator">.gitignore generator</a> to round
          out a repo&apos;s baseline config.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does every editor support it?</strong> Many do out of the box;
          others need a plugin. Unsupported editors simply ignore the file,
          causing no harm.
        </p>
        <p>
          <strong>Will it fight my formatter?</strong> Keep the indentation
          settings in sync. If Prettier says two spaces, set the same here so they
          agree.
        </p>
        <p>
          <strong>What is insert_final_newline for?</strong> It ensures files end
          with a newline, which avoids noisy &quot;no newline at end of file&quot;
          diffs in version control.
        </p>
      </>
    ),
  },

  'markdown-table-generator': {
    body: (
      <>
        <h2>Markdown tables and their alignment</h2>
        <p>
          A Markdown table is rows of cells separated by pipes, with a divider
          row of dashes under the header. Colons in that divider control
          alignment: a colon on the left aligns left, on the right aligns right,
          and on both sides centers the column. Building one by hand is tedious to
          keep aligned, which is why a generator earns its place.
        </p>
        <h3>The divider row does the work</h3>
        <p>
          The second line is not decoration; it is required and it carries the
          alignment. <code>:---</code> is left, <code>---:</code> is right, and{' '}
          <code>:---:</code> is centered. The number of dashes does not matter to
          parsers, though keeping them padded makes the raw source readable.
        </p>
        <h3>Example</h3>
        <pre><code>{`| Name  | Role      | Score |
| :---- | :-------: | ----: |
| Ada   | Engineer  |    98 |
| Grace | Compiler  |   100 |`}</code></pre>
        <p>
          Here the first column is left-aligned, the role is centered, and the
          numeric score is right-aligned so the digits line up by place value,
          which is the right call for numbers.
        </p>
        <h3>Pitfalls</h3>
        <p>
          A literal pipe inside a cell breaks the table; escape it as{' '}
          <code>\|</code>. Markdown tables cannot span cells or nest block
          content like lists and code fences, so a complex layout needs raw HTML
          instead. The visual alignment of the raw source has no effect on
          output, only the colons do. For a longer document, generate section
          links with the{' '}
          <a href="/tools/markdown-toc-generator">Markdown TOC generator</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does my table render as plain text?</strong> Tables are a
          GitHub Flavored Markdown extension; a strict CommonMark renderer without
          it will not parse them. Also check that the divider row is present.
        </p>
        <p>
          <strong>Can cells contain formatting?</strong> Inline formatting like
          bold, code, and links works. Block-level content does not.
        </p>
        <p>
          <strong>Do columns need equal widths in the source?</strong> No. The
          renderer sizes columns from content; padding the source is purely for
          human readability.
        </p>
      </>
    ),
  },

  'markdown-toc-generator': {
    body: (
      <>
        <h2>A table of contents from your headings</h2>
        <p>
          A TOC generator scans a Markdown document for heading lines (the ones
          starting with <code>#</code>) and builds a nested list of links to
          them. The number of hashes sets the level, so an <code>h2</code> nests
          under the nearest preceding <code>h1</code>. Each link points to the
          slug that the renderer assigns to that heading.
        </p>
        <h3>How anchor slugs are formed</h3>
        <p>
          Most renderers derive a heading&apos;s anchor by lowercasing the text,
          replacing spaces with hyphens, and stripping punctuation. So{' '}
          <code>## Set Up &amp; Config</code> becomes the anchor{' '}
          <code>#set-up--config</code>. Knowing the rule matters, because the
          generated links must match exactly or they jump nowhere.
        </p>
        <h3>Example</h3>
        <pre><code>{`Headings in the document:
  # Guide
  ## Install
  ## Usage
  ### CLI

Generated TOC:
- [Install](#install)
- [Usage](#usage)
  - [CLI](#cli)`}</code></pre>
        <p>
          The top-level <code>h1</code> title is usually left out of the list
          itself, and the <code>h3</code> indents under its parent <code>h2</code>{' '}
          to show the hierarchy.
        </p>
        <h3>Pitfalls</h3>
        <p>
          Duplicate heading text produces duplicate slugs; renderers disambiguate
          by appending <code>-1</code>, <code>-2</code>, and so on, so the second
          &quot;Overview&quot; anchors to <code>#overview-1</code>. Emojis and
          non-Latin characters are slugged inconsistently across platforms, which
          is a common source of dead TOC links. Keep the heading levels
          sequential; skipping from <code>h2</code> to <code>h4</code> both
          confuses the nesting and hurts accessibility. The companion{' '}
          <a href="/tools/markdown-table-generator">table generator</a> covers the
          other structural piece of long docs.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Do all platforms slug headings the same way?</strong> No. GitHub,
          GitLab, and various static site generators differ on punctuation and
          Unicode handling, so a TOC built for one may need tweaks on another.
        </p>
        <p>
          <strong>How deep should the TOC go?</strong> Two or three levels is
          usually enough; listing every <code>h4</code> makes the index as long as
          the content.
        </p>
        <p>
          <strong>Can I keep it in sync automatically?</strong> Some tools insert
          the TOC between marker comments and regenerate it, so edits to headings
          update the list on the next run.
        </p>
      </>
    ),
  },
}
