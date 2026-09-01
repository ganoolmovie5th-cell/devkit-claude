import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'JWT Tokens Explained: Decode, Validate, and Debug Like a Pro | DevKit Blog',
  description: 'Understand JSON Web Tokens from structure to security. Learn to decode, check expiry, spot common mistakes, and debug JWT authentication issues.',
  alternates: { canonical: '/blog/jwt-tokens-explained/' },
  keywords: 'jwt explained, jwt tutorial, json web token guide, jwt authentication, jwt decode',
}

export default function JwtBlogPost() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">JWT Tokens Explained: Decode, Validate, and Debug Like a Pro</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>August 19, 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <p>JSON Web Tokens (JWTs) are everywhere in modern authentication. Login to almost any SPA and you will find a JWT in your localStorage or cookies. Yet many developers treat them as magic strings — paste them into headers and hope they work.</p>

      <p>This guide demystifies JWTs so you can decode, validate, and debug them confidently.</p>

      <h2>What is a JWT?</h2>
      <p>A JWT is a compact, URL-safe string that carries claims (data) between parties. It looks like this:</p>
      <pre><code>eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0In0.signature</code></pre>
      <p>Three parts separated by dots: <strong>Header</strong>.<strong>Payload</strong>.<strong>Signature</strong>. Each part is Base64URL-encoded JSON (except the signature which is a hash).</p>

      <h2>The Three Parts</h2>

      <h3>Header</h3>
      <p>Declares the token type and signing algorithm:</p>
      <pre><code>{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code></pre>
      <p>Common algorithms: HS256 (HMAC + SHA256, symmetric), RS256 (RSA + SHA256, asymmetric), ES256 (ECDSA, asymmetric). The algorithm choice affects security architecture — symmetric keys are simpler but must stay secret on both sides.</p>

      <h3>Payload</h3>
      <p>Contains the claims — the actual data you want to transmit:</p>
      <pre><code>{`{
  "sub": "user_123",
  "name": "John Doe",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516242622
}`}</code></pre>
      <p>Standard claims:</p>
      <ul>
        <li><code>sub</code> — subject (who the token is about)</li>
        <li><code>iss</code> — issuer (who created the token)</li>
        <li><code>aud</code> — audience (who should accept the token)</li>
        <li><code>exp</code> — expiration time (Unix timestamp)</li>
        <li><code>iat</code> — issued at time</li>
        <li><code>nbf</code> — not before (token not valid before this time)</li>
      </ul>

      <h3>Signature</h3>
      <p>Created by signing the header + payload with a secret key. This prevents tampering — if anyone modifies the payload, the signature will not match.</p>
      <pre><code>{`HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)`}</code></pre>

      <h2>Common Mistakes</h2>

      <h3>1. Storing sensitive data in the payload</h3>
      <p>The payload is encoded, not encrypted. Anyone can decode it with a Base64 decoder. Never put passwords, credit card numbers, or private keys in a JWT.</p>

      <h3>2. Not checking expiration</h3>
      <p>Always validate <code>exp</code> on the server side. A common bug: checking expiry only on the frontend (which is easily bypassed). Our <Link href="/tools/jwt-expiry-checker">JWT Expiry Checker</Link> helps you quickly verify token timing during development.</p>

      <h3>3. Using algorithm "none"</h3>
      <p>Some libraries accept tokens with <code>"alg": "none"</code> — meaning no signature verification. Always reject unsigned tokens in production. Whitelist allowed algorithms explicitly.</p>

      <h3>4. Symmetric secrets that are too short</h3>
      <p>For HS256, your secret should be at least 256 bits (32 bytes) of random data. A short string like "secret123" is brute-forceable.</p>

      <h3>5. Not rotating secrets</h3>
      <p>If your signing key is compromised, all tokens ever issued are compromised. Rotate keys periodically and support multiple valid keys during transitions.</p>

      <h2>Debugging JWT Issues</h2>

      <p>When authentication fails, decode the token first to understand what you are working with:</p>

      <ol>
        <li><strong>Decode the header</strong> — is the algorithm what you expect?</li>
        <li><strong>Decode the payload</strong> — are the claims correct? Is <code>sub</code> the right user?</li>
        <li><strong>Check <code>exp</code></strong> — is the token expired? Clock skew between servers can cause false expiry.</li>
        <li><strong>Check <code>iss</code> and <code>aud</code></strong> — do they match your expected values?</li>
        <li><strong>Verify signature</strong> — this requires the secret/public key. If verification fails, the token was tampered with or signed with a different key.</li>
      </ol>

      <h2>JWT vs Sessions</h2>
      <p>JWTs are stateless — the server does not need to store session data. This scales well but makes revocation hard (you cannot "invalidate" a token without a blacklist). Sessions are stateful but trivially revocable.</p>
      <p>For most web apps, short-lived JWTs (15 minutes) combined with a longer-lived refresh token stored in an HTTP-only cookie is a solid pattern.</p>

      <h2>Tools for JWT Work</h2>
      <p>DevKit offers three JWT-related tools for your workflow:</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/jwt-decoder" className="text-sm text-blue-600 hover:underline">JWT Decoder</Link>
          <Link href="/tools/jwt-expiry-checker" className="text-sm text-blue-600 hover:underline">JWT Expiry Checker</Link>
          <Link href="/tools/jwt-generator" className="text-sm text-blue-600 hover:underline">JWT Generator</Link>
          <Link href="/tools/base64-encode-decode" className="text-sm text-blue-600 hover:underline">Base64 Decode</Link>
        </div>
      </div>
    </article>
  )
}
