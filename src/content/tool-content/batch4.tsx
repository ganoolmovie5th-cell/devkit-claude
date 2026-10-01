import type { ToolArticle } from './index'

export const batch4: Record<string, ToolArticle> = {
  'box-shadow-generator': {
    body: (
      <>
        <h2>Reading a CSS box-shadow by its parts</h2>
        <p>
          A box-shadow is a stack of four lengths and a color:
          <code>offset-x offset-y blur-radius spread-radius color</code>. The
          first two numbers push the shadow right and down (negative values go
          left and up). Blur softens the edge, so a larger blur spreads the
          shadow thinner and lighter. Spread grows or shrinks the shadow before
          the blur is applied, which is the knob people forget exists. Prefix
          the whole thing with <code>inset</code> and the shadow is painted
          inside the box instead of behind it, which is how you fake a pressed
          button or an inner groove.
        </p>
        <h3>Where it earns its keep</h3>
        <p>
          Elevation is the usual job: cards, modals, and dropdowns float above
          the page because a soft shadow implies distance from the surface.
          Shadows also separate a sticky header from scrolling content, outline
          a focused input, or build neumorphic buttons. You are not limited to
          one shadow either; comma-separate several and they layer from the
          first listed on top to the last on the bottom.
        </p>
        <h3>From subtle to dramatic</h3>
        <p>A gentle card lift, barely there:</p>
        <pre><code>{`box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);`}</code></pre>
        <p>
          A layered shadow reads as more realistic than one heavy blur, because
          real light casts both a tight contact shadow and a broad ambient one:
        </p>
        <pre><code>{`box-shadow:
  0 1px 2px rgba(0, 0, 0, 0.08),
  0 8px 24px rgba(0, 0, 0, 0.16);`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Why does my shadow get clipped?</strong> A parent with
          <code>overflow: hidden</code> cuts off anything painted outside its
          box, shadows included. Move the shadow to an element that is not
          clipped, or drop the overflow rule.
        </p>
        <p>
          <strong>box-shadow or drop-shadow?</strong> <code>box-shadow</code>
          follows the rectangular border box. The <code>filter: drop-shadow()</code>
          function follows the actual painted shape, so it is the one you want
          for a transparent PNG, an SVG icon, or an element with irregular
          corners.
        </p>
        <p>
          <strong>Do shadows hurt performance?</strong> Static shadows are
          cheap. Animating blur or spread forces repaints every frame and can
          stutter; animate <code>transform</code> and <code>opacity</code>
          instead, or swap between two prebuilt shadow values.
        </p>
      </>
    ),
  },

  'gradient-generator': {
    body: (
      <>
        <h2>How CSS gradients are built</h2>
        <p>
          A gradient is a generated image, not a color, so it lives in
          <code>background-image</code> rather than <code>background-color</code>.
          The two you reach for most are <code>linear-gradient()</code>, which
          blends along a straight line, and <code>radial-gradient()</code>,
          which blends outward from a center point. A linear gradient starts
          with a direction (an angle like <code>45deg</code> or a keyword like
          <code>to right</code>) followed by two or more color stops. Each stop
          is a color plus an optional position, and the browser interpolates the
          colors between them.
        </p>
        <h3>Controlling the blend with stops</h3>
        <p>
          Stop positions decide where a color is at full strength. Put two stops
          at the same position and the transition becomes a hard line instead of
          a fade, which is how you make stripes or a two-tone split with a single
          gradient. Radial gradients add shape (<code>circle</code> or
          <code>ellipse</code>) and a size keyword such as
          <code>farthest-corner</code> that sets how far the last stop reaches.
        </p>
        <h3>Examples</h3>
        <p>A diagonal two-color fade:</p>
        <pre><code>{`background-image: linear-gradient(135deg, #6366f1, #ec4899);`}</code></pre>
        <p>A hard split with no blend, using doubled stops:</p>
        <pre><code>{`background-image: linear-gradient(
  to right,
  #0ea5e9 0% 50%,
  #22c55e 50% 100%
);`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Why is my gradient a flat color?</strong> Usually it is set on
          <code>background-color</code> by mistake, or the element has no height.
          Gradients need a box with size to show the blend.
        </p>
        <p>
          <strong>Can I stack gradients?</strong> Yes. List several in
          <code>background-image</code> separated by commas; the first is painted
          on top. Pair that with transparency to overlay a tint on a photo.
        </p>
        <p>
          <strong>Why does the midpoint look muddy?</strong> Blending through
          sRGB can pass through a dull gray. Picking stops that share hue or
          adding an intermediate stop keeps the middle clean.
        </p>
      </>
    ),
  },

  'flexbox-generator': {
    body: (
      <>
        <h2>Flexbox in terms of two axes</h2>
        <p>
          Flexbox lays children out along a main axis and sizes them across a
          cross axis. The direction of the main axis comes from
          <code>flex-direction</code>: <code>row</code> runs left to right,
          <code>column</code> runs top to bottom. This matters because the two
          alignment properties people mix up are tied to the axes, not to the
          words &quot;horizontal&quot; and &quot;vertical&quot;.
          <code>justify-content</code> distributes items along the main axis,
          and <code>align-items</code> positions them on the cross axis.
        </p>
        <h3>The property that confuses everyone</h3>
        <p>
          In a <code>row</code> container, <code>justify-content</code> moves
          items left and right while <code>align-items</code> moves them up and
          down. Flip to <code>column</code> and the roles swap: now
          <code>justify-content</code> is the vertical one. The classic
          &quot;center a thing both ways&quot; trick leans on both at once.
        </p>
        <h3>Example</h3>
        <p>Perfectly centered content:</p>
        <pre><code>{`.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}`}</code></pre>
        <p>A navbar with a logo on the left and links on the right:</p>
        <pre><code>{`.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Why do my items overflow instead of wrapping?</strong> Flex
          items stay on one line until you add <code>flex-wrap: wrap</code>. By
          default they shrink to fit, and once they cannot shrink further they
          spill out.
        </p>
        <p>
          <strong>What does flex: 1 mean?</strong> It is shorthand for
          <code>flex-grow: 1; flex-shrink: 1; flex-basis: 0</code>, telling an
          item to take an equal share of free space. Give one child
          <code>flex: 2</code> and it claims twice the slack of its siblings.
        </p>
        <p>
          <strong>Flexbox or grid?</strong> Flexbox is one-dimensional, best for
          a row or a column of items. When you need rows and columns to line up
          together, grid is the better fit.
        </p>
      </>
    ),
  },

  'jwt-generator': {
    body: (
      <>
        <h2>What a JWT is made of</h2>
        <p>
          A JSON Web Token is three Base64URL-encoded parts joined by dots:
          <code>header.payload.signature</code>. The header names the signing
          algorithm, commonly <code>HS256</code> or <code>RS256</code>. The
          payload holds claims, which are just JSON key-value pairs such as
          <code>sub</code> (the subject), <code>exp</code> (expiry as a Unix
          timestamp), and <code>iat</code> (issued-at). The signature is computed
          over the first two parts with a secret or private key, and that is what
          lets a server trust the token later without a database lookup.
        </p>
        <h3>HS256 versus RS256</h3>
        <p>
          <code>HS256</code> is symmetric: the same secret signs and verifies, so
          anyone who can verify can also forge. It fits a single service that
          keeps its own secret. <code>RS256</code> is asymmetric: a private key
          signs and a public key verifies, so you can hand the public key to many
          consumers while only the issuer can mint tokens. Pick RS256 when the
          signer and verifier are different parties.
        </p>
        <h3>Example</h3>
        <p>A decoded payload before signing:</p>
        <pre><code>{`{
  "sub": "user_123",
  "role": "editor",
  "iat": 1710000000,
  "exp": 1710003600
}`}</code></pre>
        <p>The resulting token has the familiar three-segment shape:</p>
        <pre><code>{`eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyXzEyMyJ9.3vJ8...`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Is the payload encrypted?</strong> No. It is only encoded, so
          anyone can decode and read it. Never put passwords or secrets in a JWT;
          the signature proves integrity, not confidentiality.
        </p>
        <p>
          <strong>What stops someone editing the claims?</strong> Changing the
          payload invalidates the signature, and the server rejects it on verify.
          That only holds if the server actually checks the signature and does
          not accept the <code>none</code> algorithm.
        </p>
        <p>
          <strong>How do I handle expiry?</strong> Set <code>exp</code> to a
          short window and issue a separate longer-lived refresh token. The
          verifier must compare <code>exp</code> against the current time and
          reject anything past it.
        </p>
      </>
    ),
  },

  'http-status-codes': {
    body: (
      <>
        <h2>Reading HTTP status codes by class</h2>
        <p>
          Every HTTP response carries a three-digit status code whose first
          digit sets the category. <code>2xx</code> means success,
          <code>3xx</code> means redirection, <code>4xx</code> means the client
          sent something wrong, and <code>5xx</code> means the server failed
          while handling an otherwise valid request. That first digit alone
          tells you which side to go looking at when something breaks.
        </p>
        <h3>The pairs people confuse</h3>
        <p>
          <strong>404 versus 500:</strong> a 404 says the resource was not found,
          which is a client-facing &quot;this does not exist&quot; and often
          expected. A 500 is an unhandled error inside your code; it points at a
          bug or a crashed dependency, not at the request. Treat a spike in 500s
          as an incident; a 404 is usually a bad link.
        </p>
        <p>
          <strong>301 versus 302:</strong> a 301 is a permanent redirect, so
          browsers and search engines cache it and update bookmarks and link
          equity to the new URL. A 302 (or the clearer 307) is temporary, telling
          clients the move is not forever and the original URL still owns the
          resource. Shipping a 301 by accident is painful because clients keep
          using the cached target long after you revert.
        </p>
        <h3>Example</h3>
        <p>A redirect response as seen on the wire:</p>
        <pre><code>{`HTTP/1.1 301 Moved Permanently
Location: https://example.com/new-path`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>When should an API return 401 vs 403?</strong> 401 means you
          are not authenticated, so logging in might fix it. 403 means you are
          authenticated but not allowed, so logging in again will not help.
        </p>
        <p>
          <strong>What is 429 for?</strong> Too Many Requests signals rate
          limiting. A well-behaved server adds a <code>Retry-After</code> header
          telling the client how long to wait before trying again.
        </p>
        <p>
          <strong>Is 204 an error?</strong> No. 204 No Content is a success with
          an intentionally empty body, common after a successful DELETE or an
          update that returns nothing.
        </p>
      </>
    ),
  },

  'meta-tag-generator': {
    body: (
      <>
        <h2>Why meta tags still matter</h2>
        <p>
          Meta tags live in the <code>head</code> of an HTML page and describe it
          to browsers, search engines, and social platforms. The classics are
          <code>title</code> and the <code>description</code> meta, which feed the
          snippet shown in search results. On top of those sit the Open Graph
          tags, which control how a link looks when pasted into a chat or a social
          feed: a title, a description, and critically an image preview.
        </p>
        <h3>Open Graph and the social preview</h3>
        <p>
          Open Graph properties use the <code>property</code> attribute, like
          <code>og:title</code>, <code>og:description</code>, and
          <code>og:image</code>. Without <code>og:image</code> your link usually
          shows up as a bare line of text, while a correct image turns it into a
          rich card. The image should be a fully qualified absolute URL, and most
          platforms want roughly a 1200 by 630 pixel image so it is not cropped
          awkwardly.
        </p>
        <h3>Example</h3>
        <p>A minimal but complete head block:</p>
        <pre><code>{`<title>Devkit Tools</title>
<meta name="description" content="Fast browser-based developer utilities." />
<meta property="og:title" content="Devkit Tools" />
<meta property="og:description" content="Fast browser-based developer utilities." />
<meta property="og:image" content="https://example.com/preview.png" />
<meta name="twitter:card" content="summary_large_image" />`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Do I need the meta keywords tag?</strong> No. Major search
          engines ignore <code>meta keywords</code>; it has not influenced
          ranking for years and only clutters the markup.
        </p>
        <p>
          <strong>Why is my preview image not updating?</strong> Platforms cache
          Open Graph data aggressively. Use the platform scraping or debug tool to
          force a refetch after you change the image.
        </p>
        <p>
          <strong>Do I need Twitter tags separately?</strong> Twitter falls back
          to Open Graph tags for most fields, but <code>twitter:card</code> is
          what upgrades a plain link to the large image layout.
        </p>
      </>
    ),
  },

  'favicon-generator': {
    body: (
      <>
        <h2>Why one favicon is never enough</h2>
        <p>
          A favicon is the small icon shown in a browser tab, a bookmark, and the
          home-screen shortcut on phones. The catch is that these contexts want
          different sizes and formats. A tab might use a 16 by 16 or 32 by 32
          icon, an Android home screen wants a 192 by 192 PNG, and iOS pulls a 180
          by 180 apple-touch-icon. Shipping a single 16-pixel image means your
          icon looks blurry everywhere it is scaled up.
        </p>
        <h3>Generating a full set from one image</h3>
        <p>
          A favicon generator takes one high-resolution square source, ideally
          512 by 512 or larger with simple, legible shapes, and downsizes it into
          each required format. Fine detail disappears at 16 pixels, so a bold
          mark reads far better than a shrunken full logo. The output is a bundle
          of PNGs plus a traditional <code>.ico</code> and often a web app
          manifest that ties the Android icons together.
        </p>
        <h3>Example</h3>
        <p>The link tags you drop into the head:</p>
        <pre><code>{`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Why has my favicon not changed?</strong> Browsers cache
          favicons hard. A forced refresh, a visit in a private window, or
          appending a version query like <code>?v=2</code> usually breaks the
          cache.
        </p>
        <p>
          <strong>Do I still need favicon.ico?</strong> It helps. Some browsers
          and tools request <code>/favicon.ico</code> at the site root by default,
          so keeping a multi-size <code>.ico</code> there covers those requests.
        </p>
        <p>
          <strong>Can I use an SVG favicon?</strong> Modern browsers support an
          SVG icon that scales cleanly and can even respond to dark mode. Keep a
          PNG fallback for the clients that do not.
        </p>
      </>
    ),
  },

  'docker-run-to-compose': {
    body: (
      <>
        <h2>Turning a docker run into a compose file</h2>
        <p>
          A long <code>docker run</code> command is fine once, but it is hard to
          remember, review, or share. Docker Compose moves the same options into a
          YAML file you can commit, so the next person just runs
          <code>docker compose up</code>. The translation is mostly mechanical:
          each command-line flag maps to a key under a service.
        </p>
        <h3>How the flags map</h3>
        <p>
          <code>-p 8080:80</code> becomes an entry under <code>ports</code>.
          <code>-v data:/var/lib/app</code> becomes an entry under
          <code>volumes</code>. Each <code>-e KEY=value</code> becomes a line
          under <code>environment</code>. The image name and any trailing command
          move to <code>image</code> and <code>command</code>, and
          <code>--name</code> becomes the service key itself. Keeping the mapping
          in mind means you can read a compose file back as the run command it
          replaced.
        </p>
        <h3>Example</h3>
        <p>Starting from a run command:</p>
        <pre><code>{`docker run -d --name web \\
  -p 8080:80 \\
  -e NODE_ENV=production \\
  -v app-data:/data \\
  nginx:alpine`}</code></pre>
        <p>The equivalent compose file:</p>
        <pre><code>{`services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    volumes:
      - app-data:/data

volumes:
  app-data:`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>Where did -d go?</strong> Detached mode is a runtime choice, not
          a service property. You pass it to the command instead:
          <code>docker compose up -d</code>.
        </p>
        <p>
          <strong>Do named volumes need declaring?</strong> Yes. A named volume
          like <code>app-data</code> must also appear under a top-level
          <code>volumes</code> key. A bind mount with a host path does not.
        </p>
        <p>
          <strong>Can I set the restart policy?</strong> Yes. The
          <code>--restart unless-stopped</code> flag becomes
          <code>restart: unless-stopped</code> under the service.
        </p>
      </>
    ),
  },

  'regex-escape': {
    body: (
      <>
        <h2>Why you escape characters in a regex</h2>
        <p>
          Regular expressions treat many punctuation characters as operators
          rather than literal text. A dot matches any character, a plus means
          &quot;one or more&quot;, and parentheses create a group. When you want
          to match those characters literally, you escape them with a backslash so
          the engine reads <code>\.</code> as a real period instead of
          &quot;any character&quot;. Escaping is what you do when the input is
          data, not a pattern you wrote by hand.
        </p>
        <h3>The characters that need escaping</h3>
        <p>
          The usual suspects are <code>. * + ? ^ $ ( ) [ ] {'{'} {'}'} | \</code>
          and the forward slash when it is your delimiter. Each has a special
          meaning on its own, so a stray one silently changes what your pattern
          matches. The safe move when you build a pattern from user input is to
          escape every one of these before inserting the string, which prevents
          both broken matches and a form of injection where input alters the
          regex logic.
        </p>
        <h3>Example</h3>
        <p>A URL contains several regex-special characters:</p>
        <pre><code>{`Input:   https://a.com/path?id=1
Escaped: https://a\\.com/path\\?id=1`}</code></pre>
        <p>Only the dot and the question mark needed escaping to match literally.</p>
        <h3>FAQ</h3>
        <p>
          <strong>Does everything need a backslash?</strong> No. Letters, digits,
          and most spaces are already literal. Over-escaping harmless characters
          makes the pattern unreadable without changing behavior.
        </p>
        <p>
          <strong>Is escaping different inside a character class?</strong> Yes.
          Inside <code>[ ]</code> most metacharacters lose their power, so you
          escape fewer things, but the dash and the caret still need care.
        </p>
        <p>
          <strong>Is there a built-in escape function?</strong> Many languages
          ship one, such as <code>re.escape</code> in Python. JavaScript has no
          native helper, so a small escape routine or a tool like this one fills
          the gap.
        </p>
      </>
    ),
  },

  'json-path-finder': {
    body: (
      <>
        <h2>Querying JSON with JSONPath</h2>
        <p>
          JSONPath is a small query language for pulling values out of a JSON
          document, in the same spirit that XPath selects nodes from XML. The
          root of the document is <code>$</code>, you walk into objects with dot
          notation, and you index into arrays with brackets. So
          <code>$.store.book[0].title</code> reads &quot;from the root, into
          store, into book, take the first element, and give me its title.&quot;
        </p>
        <h3>Beyond a single path</h3>
        <p>
          The power shows up with wildcards and filters. <code>$.store.book[*].author</code>
          collects every author across the array. The recursive descent operator
          <code>..</code> searches at any depth, so <code>$..price</code> finds
          every price in the document regardless of where it is nested. Filter
          expressions narrow results by condition, which turns a path into a tiny
          query rather than a fixed lookup.
        </p>
        <h3>Example</h3>
        <p>Given this document:</p>
        <pre><code>{`{
  "store": {
    "book": [
      { "title": "A", "price": 10 },
      { "title": "B", "price": 25 }
    ]
  }
}`}</code></pre>
        <p>The expression and its result:</p>
        <pre><code>{`$.store.book[0].title   ->  "A"
$.store.book[*].price   ->  [10, 25]`}</code></pre>
        <h3>FAQ</h3>
        <p>
          <strong>How do I get the last array element?</strong> Most
          implementations accept <code>[-1]</code> for the last item, and a slice
          like <code>[0:2]</code> for a range, mirroring Python-style indexing.
        </p>
        <p>
          <strong>Can I filter by value?</strong> Yes, with a filter expression
          such as <code>$.store.book[?(@.price &gt; 15)]</code>, where
          <code>@</code> refers to the current item being tested.
        </p>
        <p>
          <strong>Is JSONPath standardized?</strong> It is now specified in RFC
          9535, but older libraries differ on edge cases like filter syntax and
          whether a query returns a single value or always an array.
        </p>
      </>
    ),
  },
}
