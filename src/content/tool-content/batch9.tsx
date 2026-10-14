import type { ToolArticle } from './index'

export const batch9: Record<string, ToolArticle> = {
  'dns-lookup': {
    body: (
      <>
        <h2>What a DNS lookup resolves</h2>
        <p>
          A DNS lookup queries the distributed name system for the records
          attached to a domain. The record type decides what you get back: an
          A record maps a name to an IPv4 address, AAAA to IPv6, MX names the
          mail servers and their priority, NS lists the authoritative name
          servers, TXT holds arbitrary text (SPF, DKIM, domain verification),
          and CNAME points one name at another as an alias. A single hostname
          usually has several record types at once.
        </p>
        <h3>When you reach for it</h3>
        <p>
          You check DNS after moving a site to a new host, when email bounces
          and you suspect a missing MX or broken SPF, when a CDN swap needs a
          CNAME verified, or when a certificate authority asks you to prove
          ownership with a TXT record. It is also the first thing to confirm
          before blaming the application for an unreachable host.
        </p>
        <h3>Example</h3>
        <pre><code>{`$ dig example.com A +short
93.184.216.34

$ dig example.com MX +short
10 mail.example.com.
20 backup.example.com.`}</code></pre>
        <p>
          The number before each MX host is its priority: the lowest value is
          tried first, and equal values share load. The trailing dot marks a
          fully qualified name so the resolver does not append a search domain.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          The one that burns everyone is TTL and propagation. When you change a
          record, old answers stay cached until the previous TTL expires, so a
          record with a 24-hour TTL can keep serving the old IP long after you
          edited it. Lower the TTL a day before a planned migration. Also note a
          CNAME cannot coexist with other records on the same name, which is why
          you cannot put a CNAME on a root domain that also needs MX records.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why do two lookups return different IPs?</strong> Many domains
          publish several A records for load balancing, and resolvers rotate
          them. GeoDNS can also hand different regions different answers.
        </p>
        <p>
          <strong>My change is not showing up, why?</strong> You are almost
          certainly seeing a cached answer. Query an authoritative server
          directly, or wait out the old TTL before concluding something broke.
        </p>
        <p>
          <strong>What record do I need for a certificate?</strong> Usually a
          TXT record the CA dictates. Once DNS is correct, confirm the cert with
          the <a href="/tools/ssl-checker">SSL checker</a>.
        </p>
      </>
    ),
  },

  'ssl-checker': {
    body: (
      <>
        <h2>What an SSL check tells you</h2>
        <p>
          An SSL (really TLS) check connects to a host, completes the handshake,
          and reports back the certificate it was served: the subject and any
          Subject Alternative Names, the issuer, the validity window, the
          signature algorithm, and which TLS protocol versions the server will
          speak. It answers the practical question of whether browsers will
          trust the site and for how long.
        </p>
        <h3>When you reach for it</h3>
        <p>
          You run it right after installing or renewing a certificate, when
          users report a browser warning, or when monitoring flags an upcoming
          expiry. It is also the fastest way to confirm a load balancer or CDN
          is presenting the certificate you think it is rather than a stale one.
        </p>
        <h3>Example</h3>
        <pre><code>{`$ openssl s_client -connect example.com:443 -servername example.com
subject=CN=example.com
issuer=CN=R3, O=Let's Encrypt
notBefore=Jan  1 00:00:00 2024 GMT
notAfter =Apr  1 23:59:59 2024 GMT`}</code></pre>
        <p>
          The <code>-servername</code> flag sends SNI, which matters because one
          IP can host many certificates; without it you may get the wrong one.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          The classic failure is a broken chain. Your leaf certificate can be
          perfectly valid while the server forgets to send the intermediate
          certificate that links it to a trusted root. Many desktop browsers
          paper over this using cached intermediates, so it works on your laptop
          and fails on a fresh mobile device. Always test the full chain, not
          just the leaf. A second trap is confusing leaf expiry with the whole
          path: an intermediate can expire and break trust even while your leaf
          still has months left.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>It works in Chrome but fails on my phone, why?</strong>{' '}
          Almost always a missing intermediate. Chrome had it cached; the phone
          did not. Fix the chain the server sends.
        </p>
        <p>
          <strong>Does the certificate cover www and the root?</strong> Only if
          both appear in the SAN list. A cert for <code>example.com</code> does
          not automatically cover <code>www.example.com</code>.
        </p>
        <p>
          <strong>The cert is valid but the site is unreachable.</strong> That
          is a name resolution issue, not TLS. Check the record first with the{' '}
          <a href="/tools/dns-lookup">DNS lookup</a> tool.
        </p>
      </>
    ),
  },

  'ip-info': {
    body: (
      <>
        <h2>Reading your public IP footprint</h2>
        <p>
          This tool reports the public IP address the internet sees for your
          connection, plus the metadata usually attached to it: an approximate
          city and country from a geolocation database, the ISP or hosting
          provider that owns the address block, and the timezone commonly
          associated with that region. It reflects your network edge, not the
          private address on your own machine.
        </p>
        <h3>When you reach for it</h3>
        <p>
          Useful when configuring an allowlist and you need the address to
          whitelist, when confirming a VPN actually changed your apparent
          location, when debugging why a geo-restricted service blocks you, or
          when a server log shows a request and you want to know roughly where
          it originated.
        </p>
        <h3>Example</h3>
        <pre><code>{`IP:        203.0.113.47
City:      Jakarta
Country:   Indonesia (ID)
ISP:       Example Telecom
Timezone:  Asia/Jakarta`}</code></pre>
        <h3>Common pitfalls</h3>
        <p>
          Geolocation is an estimate, not a GPS fix. It resolves the registered
          owner of the IP block, which can place you in the city where your ISP
          routes traffic rather than where you physically sit, sometimes
          hundreds of kilometers off. Mobile carriers and corporate VPNs make
          this worse because many users share one exit address. The IP shown is
          also your network&apos;s public address; every device behind the same
          router shares it thanks to NAT, so it does not identify a single
          machine. If you need to reason about the private ranges behind that
          edge, the <a href="/tools/ip-subnet-calculator">subnet calculator</a>{' '}
          is the right tool.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is the city wrong?</strong> The database maps the IP block
          to where it is registered or routed, which may differ from your
          actual location. It is normal to be off by a region.
        </p>
        <p>
          <strong>Is this my computer&apos;s real address?</strong> No, it is the
          public address of your router. Internally your device has a private
          address like 192.168.x.x that the outside world never sees.
        </p>
        <p>
          <strong>Does a changing IP mean something is wrong?</strong> Not
          usually. Residential ISPs hand out dynamic addresses that rotate on
          reconnect or lease renewal.
        </p>
      </>
    ),
  },

  'ip-subnet-calculator': {
    body: (
      <>
        <h2>What CIDR math gives you</h2>
        <p>
          A subnet calculator takes an address and a prefix length in CIDR
          notation and works out the network address, the broadcast address, the
          usable host range, the subnet mask, and how many hosts the block holds.
          The prefix, the number after the slash, says how many leading bits are
          the network portion; the rest identify hosts within it.
        </p>
        <h3>When you reach for it</h3>
        <p>
          You use it when carving a VPC into subnets, when sizing a block for a
          given number of hosts, when writing firewall rules that reference a
          range, or when checking whether two addresses actually sit in the same
          network before debugging a routing problem.
        </p>
        <h3>Example</h3>
        <pre><code>{`192.168.1.0/26
Mask:       255.255.255.192
Network:    192.168.1.0
Broadcast:  192.168.1.63
Hosts:      192.168.1.1 - 192.168.1.62  (62 usable)`}</code></pre>
        <p>
          A /26 leaves 6 host bits, so 2^6 = 64 total addresses. Two are
          reserved, which is where the next part trips people up.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          The off-by-one that catches everyone is the broadcast and network
          reservation. A block of 64 addresses does not give you 64 usable hosts;
          the first address is the network identifier and the last is the
          broadcast address, leaving 62. Forgetting this makes a /30 point-to-
          point link look like it has 4 hosts when it only offers 2. The other
          trap is assuming addresses are in the same subnet because they look
          close: <code>192.168.1.62</code> and <code>192.168.1.65</code> are only
          three apart but a /26 boundary at .64 puts them in different networks.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>How many usable hosts does /24 give?</strong> 256 total minus
          network and broadcast, so 254 usable addresses.
        </p>
        <p>
          <strong>Why can&apos;t I use the broadcast address for a host?</strong>{' '}
          It is reserved to address every host on the subnet at once, so no
          single interface may claim it.
        </p>
        <p>
          <strong>What does /32 mean?</strong> A single host, zero spare bits.
          It is common in route tables and allowlists to pin one exact address,
          often one you found with <a href="/tools/ip-info">IP info</a>.
        </p>
      </>
    ),
  },

  'nginx-config-generator': {
    body: (
      <>
        <h2>Generating a reverse proxy block</h2>
        <p>
          This generator builds an Nginx server block that terminates TLS,
          forwards requests to an upstream application, and optionally enables
          gzip and static caching. Rather than memorizing directive names and
          their exact placement, you describe the upstream, the domain, and the
          certificate paths, and it emits a config you can drop into{' '}
          <code>sites-available</code>.
        </p>
        <h3>When you reach for it</h3>
        <p>
          Typical when putting Nginx in front of a Node, Python, or Go service
          that listens on a local port, when adding HTTPS to an app that only
          speaks HTTP, or when standing up a new site and you want sensible
          compression and header defaults without hand-writing the whole file.
        </p>
        <h3>Example</h3>
        <pre><code>{`server {
    listen 443 ssl;
    server_name app.example.com;

    ssl_certificate     /etc/letsencrypt/live/app.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.example.com/privkey.pem;

    gzip on;
    gzip_types text/css application/javascript application/json;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`}</code></pre>
        <h3>Common pitfalls</h3>
        <p>
          The famous one is the trailing slash on <code>proxy_pass</code>. With{' '}
          <code>proxy_pass http://backend/;</code> (trailing slash) Nginx
          strips the matched location prefix before forwarding; without it, the
          full original path is passed through. That single slash decides whether{' '}
          <code>/api/users</code> hits the upstream as <code>/users</code> or{' '}
          <code>/api/users</code>, and it is the usual cause of mystery 404s
          behind a proxy. Also remember to forward <code>X-Forwarded-Proto</code>,
          or an app behind TLS will think requests arrived over plain HTTP and
          may build broken redirect URLs.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does my app see HTTP instead of HTTPS?</strong> Nginx
          terminated TLS, so set <code>X-Forwarded-Proto $scheme</code> and
          configure the app to trust it.
        </p>
        <p>
          <strong>WebSockets drop after upgrading, why?</strong> You need to pass
          the <code>Upgrade</code> and <code>Connection</code> headers in the
          location block, otherwise the connection falls back to plain HTTP.
        </p>
        <p>
          <strong>Which cert file goes where?</strong> Use the full chain for{' '}
          <code>ssl_certificate</code>, not just the leaf, so the intermediate is
          sent. Verify it afterward with the{' '}
          <a href="/tools/ssl-checker">SSL checker</a>.
        </p>
      </>
    ),
  },

  'robots-txt-generator': {
    body: (
      <>
        <h2>What robots.txt controls</h2>
        <p>
          A <code>robots.txt</code> file sits at the root of a domain and tells
          cooperating crawlers which paths they may or may not request. It is a
          set of rules grouped by user-agent, each with Allow and Disallow lines,
          and optionally a Sitemap pointer. It is a crawling directive, not a
          security boundary; well-behaved bots obey it, but nothing enforces it.
        </p>
        <h3>When you reach for it</h3>
        <p>
          You write one to keep crawlers out of admin panels, search result
          pages, or staging areas, to point search engines at your sitemap, or to
          throttle aggressive bots away from expensive endpoints. It is one of
          the first files to review when a site indexes pages it should not.
        </p>
        <h3>Example</h3>
        <pre><code>{`User-agent: *
Disallow: /admin/
Disallow: /cart
Allow: /admin/public/

User-agent: Googlebot
Allow: /

Sitemap: https://example.com/sitemap.xml`}</code></pre>
        <p>
          Rules are grouped per user-agent, and a crawler obeys only the most
          specific matching group, not the union of all groups.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          The dangerous misunderstanding is treating Disallow as a way to hide a
          page. Disallow stops crawling, not indexing: if other sites link to a
          disallowed URL, search engines can still list it, just without the
          content. To actually keep a page out of results, allow crawling and use
          a <code>noindex</code> meta tag, or protect it behind auth. The other
          trap is scope: a single <code>robots.txt</code> only governs its own
          host and protocol, so <code>http</code> and <code>https</code>, and
          each subdomain, need their own file.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does Disallow remove a page from Google?</strong> No. It stops
          crawling. The URL can still appear in results. Use noindex to drop it.
        </p>
        <p>
          <strong>Can I block all bots at once?</strong> Yes, with{' '}
          <code>User-agent: *</code> and <code>Disallow: /</code>, but malicious
          scrapers simply ignore the file.
        </p>
        <p>
          <strong>Where must the file live?</strong> Exactly at the domain root,{' '}
          <code>/robots.txt</code>. A copy in a subfolder is ignored.
        </p>
      </>
    ),
  },

  'og-preview': {
    body: (
      <>
        <h2>Previewing a social share card</h2>
        <p>
          Open Graph preview renders how a URL will appear when someone shares it
          on Facebook, LinkedIn, or X, by reading the page&apos;s meta tags. The
          title, description, and image come from <code>og:</code> tags in the
          document head; the preview assembles them into the card the platform
          would show, so you catch a missing image or a truncated title before
          you post.
        </p>
        <h3>When you reach for it</h3>
        <p>
          You check it before launching a landing page, after changing a title or
          hero image, or when a shared link looks blank or wrong in a feed. It is
          also handy for confirming that a server-rendered page actually exposes
          the tags, since client-rendered apps sometimes inject them too late for
          crawlers to see.
        </p>
        <h3>Example</h3>
        <pre><code>{`<meta property="og:title" content="DevKit Tools" />
<meta property="og:description" content="Fast developer utilities." />
<meta property="og:image" content="https://example.com/card.png" />
<meta property="og:url" content="https://example.com/" />
<meta name="twitter:card" content="summary_large_image" />`}</code></pre>
        <p>
          X reads the <code>twitter:</code> tags first and falls back to{' '}
          <code>og:</code>, so the large-image card type needs its own tag.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          The image is where most previews break. The <code>og:image</code> URL
          must be absolute, not a relative path, because the crawler fetches it
          from its own servers with no knowledge of your base URL. Platforms also
          cache aggressively, so after you fix a tag the old card can persist for
          days until you force a re-scrape through the platform&apos;s debugger.
          A third gotcha: crawlers do not run JavaScript the way a browser does,
          so tags added by client-side code after load are often missed. Render
          them server-side.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>My image is not showing, why?</strong> Usually a relative URL
          or a cached old version. Use an absolute URL and re-scrape via the
          platform tool.
        </p>
        <p>
          <strong>What size should the image be?</strong> A 1200x630 image is the
          safe default for the large summary card across platforms.
        </p>
        <p>
          <strong>Why does the preview differ per network?</strong> Each platform
          picks its own tags and crops differently, so LinkedIn and X can show the
          same page unalike.
        </p>
      </>
    ),
  },

  'curl-to-code': {
    body: (
      <>
        <h2>Turning a curl command into code</h2>
        <p>
          This converter reads a <code>curl</code> command, the kind you copy
          straight out of browser dev tools or API docs, and rewrites it as
          equivalent code in JavaScript, Python, or PHP. It parses the method,
          URL, headers, and body, then maps them onto the target language&apos;s
          HTTP client so you can drop a working request into your project
          instead of translating flags by hand.
        </p>
        <h3>When you reach for it</h3>
        <p>
          Handy when an API vendor only documents examples as curl, when you
          grabbed a request via Chrome&apos;s &quot;Copy as cURL&quot; and want
          it in your codebase, or when porting a shell script into an
          application. It saves you from misreading which flag sets a header
          versus a form field.
        </p>
        <h3>Example</h3>
        <pre><code>{`# curl
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Ada"}'

// JavaScript (fetch)
await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Ada' }),
})`}</code></pre>
        <h3>Common pitfalls</h3>
        <p>
          The subtle one is how curl chooses a method. Adding <code>-d</code>{' '}
          implicitly switches the request to POST unless you also pass{' '}
          <code>-X</code>, and it sets a form content type by default, so a
          generated request can silently differ from what you expected if you
          assumed GET. Quoting is the other hazard: shell single and double
          quotes behave differently, and a JSON body with nested quotes copied
          from one shell may not survive in another. Finally, <code>--data</code>{' '}
          strips newlines while <code>--data-binary</code> preserves them, which
          matters for signed payloads.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why did my GET become a POST?</strong> The <code>-d</code> flag
          sets the body and flips the method to POST unless you override it with{' '}
          <code>-X GET</code>.
        </p>
        <p>
          <strong>Are cookies and auth headers included?</strong> Yes, if present
          in the command. Treat the output as sensitive, since it may embed a live
          token.
        </p>
        <p>
          <strong>Does it handle multipart file uploads?</strong> Simple{' '}
          <code>-F</code> fields convert cleanly, but complex multipart bodies may
          need manual tuning in the target client.
        </p>
      </>
    ),
  },

  'docker-run-to-compose': {
    body: (
      <>
        <h2>From a run command to a compose file</h2>
        <p>
          This tool translates a <code>docker run</code> command, with all its
          flags, into the equivalent <code>docker-compose.yml</code> service.
          Ports, volumes, environment variables, the restart policy, and the
          image name each map to a key under the service, so a one-off command
          you have been pasting into a terminal becomes a declarative file you
          can commit and reuse.
        </p>
        <h3>When you reach for it</h3>
        <p>
          Useful when a project&apos;s README documents only a long{' '}
          <code>docker run</code> line and you want it version-controlled, when
          combining several containers that must talk to each other, or when
          moving from ad-hoc commands to a reproducible local stack.
        </p>
        <h3>Example</h3>
        <pre><code>{`# docker run
docker run -d --name db \\
  -p 5432:5432 \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16

# docker-compose.yml
services:
  db:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:`}</code></pre>
        <h3>Common pitfalls</h3>
        <p>
          Named volumes need a top-level <code>volumes:</code> declaration or
          Compose errors out, which the run command never required. The port
          mapping order also matters: in <code>&quot;5432:5432&quot;</code> the
          host port is on the left and the container port on the right, and
          swapping them silently binds the wrong port. Quote any mapping where
          the host port is omitted, like <code>&quot;:80&quot;</code>, so YAML
          does not misread the colon. One more: <code>--link</code> has no direct
          Compose equivalent; containers on the same Compose network already
          reach each other by service name, so drop the link entirely.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does Compose complain about my volume?</strong> A named
          volume must also appear under the top-level <code>volumes:</code> key.
          Bind mounts with a host path do not.
        </p>
        <p>
          <strong>How do containers reach each other?</strong> By service name on
          the shared network. The <code>db</code> service is reachable at the
          host <code>db</code> from other services.
        </p>
        <p>
          <strong>Do I keep --name?</strong> Compose derives container names from
          the service, so an explicit name is optional and often omitted.
        </p>
      </>
    ),
  },

  'sql-to-mongodb': {
    body: (
      <>
        <h2>Translating a query to the Mongo shell</h2>
        <p>
          This converter maps a SQL statement onto the MongoDB shell equivalent.
          A table becomes a collection, a row a document, a <code>WHERE</code>{' '}
          clause a filter object, and <code>SELECT</code>ed columns a projection.
          It helps when you know relational SQL fluently but are new to Mongo&apos;s
          method-and-document style, so you can see the shape of the same question
          in both languages.
        </p>
        <h3>When you reach for it</h3>
        <p>
          Useful when migrating a feature from a SQL store to Mongo, when
          prototyping a query you already wrote in SQL, or when reading a Mongo
          codebase and wanting to anchor each find call against the SQL you
          already understand.
        </p>
        <h3>Example</h3>
        <pre><code>{`-- SQL
SELECT name, email
FROM users
WHERE age > 21 AND active = true
ORDER BY name
LIMIT 10;

// MongoDB
db.users.find(
  { age: { $gt: 21 }, active: true },
  { name: 1, email: 1, _id: 0 }
).sort({ name: 1 }).limit(10)`}</code></pre>
        <p>
          Comparison operators become <code>$gt</code>, <code>$lt</code>, and
          friends, and the second argument to <code>find</code> is the projection.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          Projection surprises people: Mongo returns <code>_id</code> by default,
          so you must explicitly set <code>_id: 0</code> to match a SQL{' '}
          <code>SELECT</code> that never asked for it. SQL <code>JOIN</code>s have
          no one-line equivalent; you either denormalize or use an aggregation{' '}
          <code>$lookup</code>, which is far more verbose than a join. And NULL
          semantics differ: a SQL <code>column IS NULL</code> is not the same as a
          field being absent in Mongo, where a document may simply omit the key,
          so <code>$exists</code> and equality to <code>null</code> mean different
          things.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does _id keep appearing?</strong> Mongo includes it unless
          you suppress it with <code>_id: 0</code> in the projection.
        </p>
        <p>
          <strong>How do I convert a JOIN?</strong> There is no direct form. Use{' '}
          <code>$lookup</code> in an aggregation pipeline, or rethink the schema
          toward embedding.
        </p>
        <p>
          <strong>Is COUNT(*) the same?</strong> Close:{' '}
          <code>db.users.countDocuments(&#123;&#125;)</code> counts matching
          documents, and an empty filter counts everything.
        </p>
      </>
    ),
  },

  'sql-explain-formatter': {
    body: (
      <>
        <h2>Making an EXPLAIN plan readable</h2>
        <p>
          A query planner outputs the steps it will take to run a query, but raw
          EXPLAIN output is dense and often one flat block. This formatter indents
          the plan into a tree so parent and child operations are obvious, and it
          flags the expensive steps, sequential scans, large sorts, nested loops
          over big row counts, so you can see where time actually goes.
        </p>
        <h3>When you reach for it</h3>
        <p>
          You use it when a query is slow and you need to know why, when deciding
          whether an index would help, or when a change in data volume suddenly
          makes a previously fast query crawl. Reading the tree tells you whether
          the planner chose an index scan or fell back to reading the whole table.
        </p>
        <h3>Example</h3>
        <pre><code>{`Limit  (cost=0.42..8.44 rows=10)
  -> Index Scan using users_name_idx on users
       (cost=0.42..812.00 rows=10)
       Filter: (active = true)

Seq Scan on orders  (cost=0.00..18234.00 rows=1000000)   <-- costly`}</code></pre>
        <p>
          The nesting shows the Limit consuming rows from the index scan beneath
          it, while the flagged sequential scan reads every row of a million-row
          table.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          The cost numbers are the planner&apos;s estimate, not milliseconds, and
          they are relative. People misread a high cost as the actual runtime; it
          is a unitless comparison the planner uses to pick a plan. Also beware
          estimated versus actual rows: a plan built from stale statistics can
          estimate ten rows and process a million, which only shows up when you
          run <code>EXPLAIN ANALYZE</code> to get real counts. A sequential scan
          is not always bad either; for a small table or a query touching most
          rows it can beat an index. Judge by row count and context, not the word
          alone.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Are the cost values in milliseconds?</strong> No, they are
          abstract units for comparing plans. Use <code>EXPLAIN ANALYZE</code> for
          real timing.
        </p>
        <p>
          <strong>Is a Seq Scan always a problem?</strong> No. On a small table or
          when most rows match, scanning can be the fastest choice.
        </p>
        <p>
          <strong>Why do estimated and actual rows differ so much?</strong> Stale
          table statistics. Running <code>ANALYZE</code> refreshes them so the
          planner estimates better.
        </p>
      </>
    ),
  },

  'cron-next-runs': {
    body: (
      <>
        <h2>What the next-run calculation does</h2>
        <p>
          Given a cron expression, this tool computes the upcoming fire times so
          you can confirm a schedule means what you think. A standard cron line
          has five fields, minute, hour, day of month, month, and day of week, and
          the tool walks forward from now, matching each field, to list the next
          several moments the job would run.
        </p>
        <h3>When you reach for it</h3>
        <p>
          You use it before deploying a scheduled job, when a job fired at an
          unexpected time, or when translating a plain-English schedule like
          &quot;every weekday at 6am&quot; into fields you can trust. Seeing three
          or four concrete timestamps catches mistakes an expression alone hides.
        </p>
        <h3>Example</h3>
        <pre><code>{`30 6 * * 1-5    "At 06:30 on Mon-Fri"

Next runs:
  Mon 2024-06-03 06:30
  Tue 2024-06-04 06:30
  Wed 2024-06-05 06:30`}</code></pre>
        <p>
          Fields are minute, hour, day-of-month, month, day-of-week. Here minute
          30, hour 6, any day, any month, weekdays 1 through 5.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          The notorious trap is the day-of-month and day-of-week relationship.
          When both fields are restricted (neither is <code>*</code>), cron treats
          them as an OR, not an AND. So <code>0 0 1 * 1</code> runs on the 1st of
          the month and on every Monday, not only on a Monday that happens to be
          the 1st. People expect AND and get surprised by extra runs. The second
          pitfall is timezone: plain cron fires in the server&apos;s local time, so
          a daylight saving shift can make a job skip or double a run around the
          changeover. For a cloud scheduler, note the different format in the{' '}
          <a href="/tools/cron-aws-eventbridge">EventBridge converter</a>, and for
          plain-English readings see{' '}
          <a href="/tools/crontab-describe">crontab describe</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does my job run on days I did not expect?</strong> Likely
          the day-of-month OR day-of-week rule firing on both conditions. Leave one
          field as <code>*</code> to avoid it.
        </p>
        <p>
          <strong>What timezone are the runs in?</strong> Standard cron uses the
          host&apos;s local time unless the daemon is configured otherwise, so
          confirm the server clock.
        </p>
        <p>
          <strong>What does <code>*/15</code> mean?</strong> A step: every 15
          units from zero, so minutes 0, 15, 30, 45.
        </p>
      </>
    ),
  },

  'cron-aws-eventbridge': {
    body: (
      <>
        <h2>Converting Unix cron to EventBridge</h2>
        <p>
          AWS EventBridge (and the older CloudWatch Events) uses its own cron
          dialect that is not quite standard Unix cron. This converter maps a
          familiar five-field expression onto the six-field EventBridge form and
          handles the quirks, so a schedule that works on a Linux box translates
          correctly into a scheduled rule.
        </p>
        <h3>When you reach for it</h3>
        <p>
          You use it when moving a scheduled job from a server crontab to a
          serverless Lambda trigger, when an EventBridge rule rejects an
          expression you copied from Unix cron, or when you want to confirm the AWS
          form before wiring it into infrastructure code.
        </p>
        <h3>Example</h3>
        <pre><code>{`# Unix cron: 30 6 * * 1-5 (06:30 Mon-Fri)
# EventBridge wants six fields and UTC:
cron(30 6 ? * MON-FRI *)`}</code></pre>
        <p>
          Note the extra year field at the end and the <code>?</code> where Unix
          would write <code>*</code> for day-of-month.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          The defining difference is the six fields: EventBridge adds a year field
          that Unix cron lacks, so a five-field expression is simply invalid.
          Worse, EventBridge forbids specifying both day-of-month and day-of-week
          at once, exactly the opposite of Unix flexibility. One of the two must be
          a <code>?</code> (meaning no specific value) while the other carries the
          rule. Writing <code>*</code> in both day fields is rejected. The last
          trap is time zone: EventBridge cron expressions are evaluated in UTC, so
          a 6am local job must be offset to the matching UTC hour. Validate the
          underlying schedule with the{' '}
          <a href="/tools/cron-next-runs">next-run calculator</a> first.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is my five-field expression rejected?</strong> EventBridge
          requires six fields including year. Add the trailing year field, usually{' '}
          <code>*</code>.
        </p>
        <p>
          <strong>What is the <code>?</code> for?</strong> It means &quot;no
          specific value&quot; and must be used in exactly one of the day fields,
          since you cannot specify both.
        </p>
        <p>
          <strong>Does EventBridge use my local time?</strong> No, cron expressions
          run in UTC. Convert your local hour to UTC before entering it.
        </p>
      </>
    ),
  },

  'api-mock-generator': {
    body: (
      <>
        <h2>Generating mock JSON from field names</h2>
        <p>
          This generator looks at the field names you provide and produces
          realistic sample values: a field called <code>email</code> gets a
          plausible address, <code>createdAt</code> gets a timestamp,{' '}
          <code>price</code> gets a number. It builds an array of such objects so
          you have a believable payload to feed a frontend or test a client
          against, instead of hand-typing fake records.
        </p>
        <h3>When you reach for it</h3>
        <p>
          Useful when the backend is not ready but the UI needs data to render,
          when writing tests that need a representative response, or when demoing a
          feature and real data is sensitive. Realistic values catch layout and
          formatting bugs that uniform placeholders like &quot;test&quot; would
          hide.
        </p>
        <h3>Example</h3>
        <pre><code>{`Fields: id, name, email, createdAt

[
  {
    "id": 1,
    "name": "Dewi Lestari",
    "email": "dewi.lestari@example.com",
    "createdAt": "2024-05-18T09:24:00Z"
  },
  { "id": 2, "name": "Budi Santoso", "email": "budi@example.com", "createdAt": "2024-05-19T14:02:00Z" }
]`}</code></pre>
        <h3>Common pitfalls</h3>
        <p>
          Mock data is only as good as its edge cases. Generators tend to produce
          tidy, mid-length values, so your UI looks perfect until a real record has
          an empty name, a 200-character title, or a null field, and the layout
          breaks. Deliberately include empty strings, very long values, and nulls
          in your mocks. Another trap is shape drift: if the mock does not match the
          real API&apos;s nesting and types exactly, code written against it fails
          the moment the real endpoint arrives. Keep the mock schema in sync with
          the contract, and prefer generating from the same spec both sides share.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Will the data be the same each time?</strong> Values are random
          per run unless a seed is used. Seed it when a test needs stable,
          repeatable output.
        </p>
        <p>
          <strong>Can it match my exact schema?</strong> It infers types from field
          names, so rename ambiguous fields or adjust the output to match nested
          structures the inference misses.
        </p>
        <p>
          <strong>Is generated data safe to commit?</strong> Yes, it is synthetic,
          but double-check nothing resembles real customer PII before sharing
          fixtures publicly.
        </p>
      </>
    ),
  },

  'epoch-countdown': {
    body: (
      <>
        <h2>A live epoch clock and countdown</h2>
        <p>
          This tool shows the current Unix epoch second ticking live and counts
          down the time remaining to any date you pick. The epoch is the number of
          seconds since midnight UTC on 1 January 1970, so watching it increment is
          a direct view of system time, and the countdown turns a future timestamp
          into days, hours, minutes, and seconds remaining.
        </p>
        <h3>When you reach for it</h3>
        <p>
          Handy for watching a token or cache expiry approach, timing a launch or
          maintenance window, confirming a server clock looks sane, or sanity-
          checking an <code>exp</code> claim pulled from a token. Seeing the live
          number makes it obvious when a stored timestamp is in seconds versus
          milliseconds.
        </p>
        <h3>Example</h3>
        <pre><code>{`Now:        1717400000  (live, +1 each second)
Target:     1719792000  (2024-07-01 00:00 UTC)
Remaining:  27 days, 16:33:20`}</code></pre>
        <h3>Common pitfalls</h3>
        <p>
          The perennial mistake is the seconds-versus-milliseconds mix-up. A
          current epoch second is a 10-digit number; JavaScript&apos;s{' '}
          <code>Date.now()</code> returns 13-digit milliseconds. Feed a
          milliseconds value where seconds are expected and your countdown lands
          tens of thousands of years out; do the reverse and the target appears to
          be in 1970. The second gotcha is drift: a countdown relying on the local
          device clock inherits any skew that clock has, so a target can tick past
          slightly early or late if the machine&apos;s time is off. For converting a
          raw number into a readable date in both directions, pair this with the{' '}
          <a href="/tools/unix-timestamp-converter">timestamp converter</a>.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why is my countdown wildly wrong?</strong> You likely mixed
          seconds and milliseconds. Check the digit count: 10 for seconds, 13 for
          milliseconds.
        </p>
        <p>
          <strong>Does the epoch depend on my timezone?</strong> No, it is always
          UTC-based. Only the displayed target date is shown in a chosen zone.
        </p>
        <p>
          <strong>What happens in 2038?</strong> A 32-bit signed second counter
          overflows then; 64-bit systems are unaffected and push the limit far into
          the future.
        </p>
      </>
    ),
  },

  'timezone-converter': {
    body: (
      <>
        <h2>Converting a time across zones</h2>
        <p>
          A timezone converter takes a single moment and shows what clock time it
          is in several places at once, accounting for each region&apos;s offset
          from UTC and whether daylight saving is currently in effect. The same
          instant is 15:00 in London, 10:00 in New York, and 22:00 in Jakarta; the
          tool keeps them aligned to one real moment.
        </p>
        <h3>When you reach for it</h3>
        <p>
          Scheduling a call across continents, picking a deploy window that avoids
          peak hours everywhere, reading a log timestamp in your own time, or
          confirming when a daylight saving change will shift a recurring meeting
          by an hour.
        </p>
        <h3>Example</h3>
        <pre><code>{`Base: 2024-07-01 09:00  America/New_York (EDT, UTC-4)

Europe/London     14:00  (BST, UTC+1)
Asia/Jakarta      20:00  (WIB, UTC+7, no DST)
Australia/Sydney  23:00  (AEST, UTC+10)`}</code></pre>
        <p>
          Jakarta stays on a fixed offset year round, while New York and London
          shift with daylight saving, which is why the gap between them is not
          constant.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          The big one is daylight saving transitions. The offset between two cities
          is not fixed; it changes when one observes DST and the other does not, or
          when they switch on different dates. For a few weeks each spring and fall
          the usual gap is off by an hour, which is exactly when scheduled meetings
          mysteriously move. A related trap is naming: a zone like{' '}
          <code>America/New_York</code> encodes the DST rules, while a raw offset
          like UTC-5 does not, so always store the IANA zone name, not just the
          current offset. Some regions, like most of Indonesia, never observe DST
          at all, which can mask the problem until you convert to one that does.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why did my recurring meeting move by an hour?</strong> One of the
          regions crossed a daylight saving boundary, changing the offset between
          you and them.
        </p>
        <p>
          <strong>Should I store UTC or local time?</strong> Store UTC (or an IANA
          zone name plus the instant) and convert only when displaying, which avoids
          DST ambiguity.
        </p>
        <p>
          <strong>Is UTC the same as GMT?</strong> For everyday purposes they match,
          though UTC is the precise standard and GMT is a time zone that some regions
          use with DST on top.
        </p>
      </>
    ),
  },

  'html-minifier': {
    body: (
      <>
        <h2>What HTML minification removes</h2>
        <p>
          Minifying HTML strips out everything a browser does not need to render
          the page: comments, redundant whitespace between tags, and optional
          attributes or quotes that make no difference to the result. The markup
          shrinks, so it transfers faster and parses marginally quicker, while the
          rendered page looks identical.
        </p>
        <h3>When you reach for it</h3>
        <p>
          Part of a production build step for a static site or server-rendered
          page, a quick way to trim an email template, or a tidy-up before
          inlining HTML into another document. It pairs with gzip compression at
          the server, which already handles repeated text well; minification
          removes the content gzip never sees.
        </p>
        <h3>Example</h3>
        <pre><code>{`<!-- before -->
<p class="lead">
  Hello,   world
</p>

<!-- after -->
<p class=lead>Hello, world</p>`}</code></pre>
        <p>
          The comment and the extra spaces are gone, and the attribute quotes were
          dropped since the value has no spaces or special characters.
        </p>
        <h3>Common pitfalls</h3>
        <p>
          Whitespace is significant in more places than people expect. Inside a{' '}
          <code>&lt;pre&gt;</code> or <code>&lt;textarea&gt;</code>, every space and
          newline is content, so collapsing it changes what the user sees. Spaces
          between inline elements also matter: removing the space between two{' '}
          <code>&lt;span&gt;</code>s can join words that should stay separate,
          because inline layout treats that whitespace as a real gap. A naive
          minifier that collapses everywhere introduces visible bugs. Also be
          careful stripping comments: some, like conditional comments or build
          markers, carry meaning. For the server-side half of the speed story, see
          the <a href="/tools/nginx-config-generator">Nginx config generator</a> and
          enable gzip there.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Does minifying break my layout?</strong> It can if whitespace
          between inline elements or inside <code>pre</code> blocks is collapsed. A
          good minifier preserves those.
        </p>
        <p>
          <strong>Is it worth it when gzip is on?</strong> Gzip handles repetition
          well, but minification removes bytes gzip cannot, so you still gain a
          little, especially on inline styles and scripts.
        </p>
        <p>
          <strong>Will it change my JavaScript?</strong> HTML minifiers leave inline
          scripts mostly alone; use a dedicated JS minifier for the logic itself.
        </p>
      </>
    ),
  },

  'pomodoro-timer': {
    body: (
      <>
        <h2>How the Pomodoro rhythm works</h2>
        <p>
          The Pomodoro technique breaks work into fixed intervals: a 25-minute
          focused session followed by a 5-minute break, with a longer break after
          four sessions. The timer enforces the rhythm so you work in bounded
          sprints rather than open-ended slogs, which makes it easier to start a
          daunting task and easier to stop before burning out.
        </p>
        <h3>When you reach for it</h3>
        <p>
          Useful for deep work that keeps getting interrupted, for tasks you keep
          putting off because they feel large, or for pacing a long day so you take
          breaks you would otherwise skip. The fixed interval is also a natural unit
          for estimating: &quot;this will take about three pomodoros&quot; is a
          surprisingly honest measure.
        </p>
        <h3>Example</h3>
        <pre><code>{`Session 1  25:00  focus
Break      05:00
Session 2  25:00  focus
Break      05:00
Session 3  25:00  focus
Break      05:00
Session 4  25:00  focus
Long break 15:00`}</code></pre>
        <h3>Common pitfalls</h3>
        <p>
          The intervals are a default, not a law. For tasks that need a long runway
          to get into flow, a rigid 25-minute cutoff can interrupt you right as you
          hit your stride, so lengthening the focus block is reasonable. The break
          matters as much as the work: skipping it to &quot;keep going&quot; defeats
          the purpose, since the technique&apos;s benefit comes from the recovery.
          A browser-based timer also pauses or throttles in a backgrounded tab on
          some systems, so a timer running in an inactive tab may drift or stall;
          keep it visible or rely on a notification. For related focus tooling, the{' '}
          <a href="/tools/typing-speed-test">typing speed test</a> makes a decent
          warm-up.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why does the timer drift when the tab is hidden?</strong> Browsers
          throttle timers in background tabs to save power. Keep the tab active or
          use a notification-based timer.
        </p>
        <p>
          <strong>Can I change the 25-minute length?</strong> Yes. The ratio matters
          more than the exact number; adjust it to your attention span and task.
        </p>
        <p>
          <strong>Do breaks really help?</strong> Yes, that is the core idea. The
          scheduled rest is what keeps focus sustainable across a full day.
        </p>
      </>
    ),
  },

  'typing-speed-test': {
    body: (
      <>
        <h2>Measuring WPM and accuracy</h2>
        <p>
          A typing test measures how fast and how accurately you type by having you
          reproduce a passage, here drawn from programming quotes, and timing you.
          Speed is reported in words per minute, where a word is standardized as
          five characters, and accuracy is the share of keystrokes you got right.
          The two together describe real throughput better than speed alone.
        </p>
        <h3>When you reach for it</h3>
        <p>
          A quick benchmark of your typing, a warm-up before a long coding session,
          or a way to practice the symbol-heavy text developers actually type, since
          programming quotes include brackets, semicolons, and punctuation that
          ordinary prose tests skip.
        </p>
        <h3>Example</h3>
        <pre><code>{`Standard word = 5 characters.

Typed 300 chars correctly in 60 seconds
= 300 / 5 = 60 gross words
= 60 WPM gross

Net WPM subtracts errors:
60 gross - 4 error-words = 56 net WPM`}</code></pre>
        <h3>Common pitfalls</h3>
        <p>
          Gross and net WPM are not the same, and conflating them flatters your
          score. Gross counts every character typed; net penalizes mistakes, which
          is the number that reflects useful output, since a fast run riddled with
          corrections is not actually productive. The five-character word standard
          also means dense symbol text scores differently from plain English, so a
          developer passage full of punctuation can read as slower even when your
          hands move the same. Finally, a test only captures a short burst under
          mild pressure; sustained real-world typing with thinking in between is
          slower, so treat the number as a relative gauge, not an identity. Pair it
          with the <a href="/tools/pomodoro-timer">Pomodoro timer</a> to structure a
          practice session.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>What is a word in WPM?</strong> A fixed five characters, including
          spaces, so the metric is comparable across different passages.
        </p>
        <p>
          <strong>Why is my net WPM lower than gross?</strong> Net subtracts errors.
          It is the more honest figure because mistakes you have to fix are not real
          progress.
        </p>
        <p>
          <strong>Is 60 WPM good?</strong> It is a solid everyday pace. Many
          developers land between 50 and 80; accuracy usually matters more than
          raw speed.
        </p>
      </>
    ),
  },

  'barcode-generator': {
    body: (
      <>
        <h2>Turning text into a barcode</h2>
        <p>
          A barcode encodes a string as a pattern of bars and spaces that a scanner
          reads back into the original text. Different symbologies suit different
          data: Code 128 handles arbitrary alphanumeric strings compactly, EAN-13
          and UPC are the retail product codes with a fixed length, and Code 39 is
          older but widely supported. The generator renders your text as an image
          you can download and print.
        </p>
        <h3>When you reach for it</h3>
        <p>
          Labeling inventory or assets, generating a product code for a retail item,
          printing a ticket or shelf tag, or embedding a scannable reference into a
          document. Choosing the right symbology up front avoids a reprint later.
        </p>
        <h3>Example</h3>
        <pre><code>{`Code 128 input:  SKU-00492
Encodes any ASCII, variable length.

EAN-13 input:    5901234123457
                            ^ 13th digit is a checksum
Must be exactly 12 data digits + 1 check digit.`}</code></pre>
        <h3>Common pitfalls</h3>
        <p>
          Symbology constraints bite when you ignore them. EAN-13 is not
          free-form: it is exactly 13 digits where the last is a checksum computed
          from the first 12, so feeding it a 13-digit number with a wrong check
          digit produces a code that scanners reject. Code 39 and some others cannot
          encode lowercase letters or arbitrary symbols without an extended mode. The
          other practical trap is the quiet zone, the blank margin on each side of
          the bars; crop it too tight and scanners fail to lock on. Print size and
          contrast matter too, since a barcode scaled down past the scanner&apos;s
          resolution or printed in low contrast simply will not read.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Why won&apos;t my EAN-13 scan?</strong> Likely a bad checksum or
          wrong digit count. EAN-13 needs exactly 12 data digits plus a correct
          check digit.
        </p>
        <p>
          <strong>Can a barcode hold letters and symbols?</strong> Code 128 can
          encode full ASCII. Retail codes like EAN are digits only, so pick the
          symbology to match your data.
        </p>
        <p>
          <strong>My printed code fails to read, why?</strong> Usually too small, low
          contrast, or no quiet-zone margin. Enlarge it, print in black on white, and
          leave blank space around it.
        </p>
      </>
    ),
  },

  'code-to-image': {
    body: (
      <>
        <h2>Turning a snippet into a shareable image</h2>
        <p>
          A code-to-image tool renders source code as a styled PNG with syntax
          highlighting, a window chrome frame, and a clean background. The result
          looks like a polished screenshot of an editor but is generated from
          plain text, so you control the theme, padding, and font without
          needing a particular IDE installed.
        </p>
        <h3>Where it gets used</h3>
        <p>
          The main audience is social media, slide decks, and documentation
          where a raw code block would look flat or get mangled by the platform.
          Twitter, LinkedIn, and blog cover images all benefit from an image
          that preserves indentation and color, and the fixed aspect ratio is
          easier to lay out than a variable-height text embed.
        </p>
        <h3>Example</h3>
        <pre><code>{`Input:
  function greet(name) {
    return "Hello, " + name;
  }

Output: a PNG image with syntax-colored text,
rounded window bar, and a gradient backdrop.`}</code></pre>
        <h3>Practical limits</h3>
        <p>
          An image of code is not searchable, not copyable, and not accessible
          to screen readers. Always provide the plain text alongside the image
          when the viewer needs to use the code, not just look at it. Long
          snippets overflow the frame or shrink the font to an unreadable size,
          so keep images to 10-20 lines at most.
        </p>
        <h3>Theming tips</h3>
        <p>
          Dark themes photograph better because they reduce glare on slides and
          avoid the washed-out look light themes get under projector lights.
          Match the background gradient to your brand palette rather than
          defaulting to generic purple, it makes the image feel intentional
          rather than auto-generated.
        </p>
        <h3>FAQ</h3>
        <p>
          <strong>Can I pick the language highlighting?</strong> Yes, choose the
          language so the tokenizer applies the right colors. Without it the
          tool guesses, which can miscolor edge cases.
        </p>
        <p>
          <strong>Why does my image look blurry on retina screens?</strong>{' '}
          Export at 2x or 3x resolution. A 1x PNG on a high-DPI display is
          scaled up by the browser and loses sharpness.
        </p>
        <p>
          <strong>Is there a way to embed the original text in the PNG?</strong>{' '}
          Not natively. Some tools tuck the source into PNG metadata, but most
          viewers ignore it, so treat the image as presentation only.
        </p>
      </>
    ),
  },
}
