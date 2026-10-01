import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HTTP Status Codes Guide: What Each Code Really Means | DevKit Blog',
  description: 'A practical guide to HTTP status codes. The five classes, the codes that matter, and the pairs developers confuse most: 401 vs 403 and 301 vs 302.',
  alternates: { canonical: '/blog/http-status-codes-guide/' },
  keywords: 'http status codes, 401 vs 403, 301 vs 302, http response codes, rest api status, 422 429',
}

export default function Post() {
  return (
    <article className="max-w-3xl mx-auto prose prose-gray dark:prose-invert">
      <header className="not-prose mb-8">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline">&larr; Back to Blog</Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">HTTP Status Codes Guide: What Each Code Really Means</h1>
        <div className="flex items-center gap-3 text-sm text-gray-400 mt-2">
          <time>September 2026</time>
          <span>8 min read</span>
        </div>
      </header>

      <p>Every HTTP response carries a three-digit status code, and that number is the server telling the client how things went in one glance. Returning the right one makes an API predictable: clients, caches, and browsers all change behavior based on it. Returning the wrong one causes bugs that are maddening to trace, because the body says one thing and the status says another.</p>

      <p>This guide walks through the five classes, the codes that actually come up, and the pairs people mix up most.</p>

      <h2>The five classes</h2>
      <p>The first digit groups every code into a class:</p>
      <ul>
        <li><strong>1xx informational</strong> — the request was received and the process continues. Rare in everyday app code.</li>
        <li><strong>2xx success</strong> — the request succeeded.</li>
        <li><strong>3xx redirection</strong> — further action is needed, usually following a different URL.</li>
        <li><strong>4xx client error</strong> — the request was malformed or not allowed. The caller should change something.</li>
        <li><strong>5xx server error</strong> — the server failed to fulfill a valid request. The caller did nothing wrong.</li>
      </ul>
      <p>That 4xx vs 5xx split is the one to internalize. A 4xx says the problem is on the caller side, a 5xx says the problem is on yours. Returning a 500 for bad user input, or a 400 for a crashed database, sends monitoring and clients down the wrong path.</p>

      <h2>Success codes</h2>
      <ul>
        <li><strong>200 OK</strong> — the standard success. A GET returns the resource, and the body carries data.</li>
        <li><strong>201 Created</strong> — a new resource was created, typically after a POST. Include a Location header pointing to the new resource.</li>
        <li><strong>204 No Content</strong> — success with no body to return. Common for DELETE, or a PUT where the client already has the data. Do not send a body with a 204.</li>
      </ul>

      <h2>Redirection codes</h2>
      <ul>
        <li><strong>301 Moved Permanently</strong> — the resource has a new permanent URL. Browsers and search engines update their records, and clients may cache the redirect indefinitely.</li>
        <li><strong>302 Found</strong> — a temporary redirect. The original URL is still the right one; the client should keep using it next time.</li>
        <li><strong>304 Not Modified</strong> — used with caching. The client sent a validator such as an ETag, and the resource has not changed, so the server skips the body and the client reuses its cached copy.</li>
      </ul>

      <h2>Client error codes</h2>
      <ul>
        <li><strong>400 Bad Request</strong> — the request is malformed in a way the server cannot process, such as broken JSON.</li>
        <li><strong>401 Unauthorized</strong> — authentication is missing or invalid. The server does not know who you are.</li>
        <li><strong>403 Forbidden</strong> — authentication succeeded, but you are not allowed to do this. The server knows who you are and the answer is still no.</li>
        <li><strong>404 Not Found</strong> — no resource exists at this URL.</li>
        <li><strong>409 Conflict</strong> — the request clashes with the current state, such as creating a user whose email already exists.</li>
        <li><strong>422 Unprocessable Entity</strong> — the syntax is fine but the content fails validation, such as an email field that is a valid string but not a valid address.</li>
        <li><strong>429 Too Many Requests</strong> — the client is rate limited. Pair it with a Retry-After header so the client knows when to try again.</li>
      </ul>

      <h2>Server error codes</h2>
      <ul>
        <li><strong>500 Internal Server Error</strong> — a generic failure. Something threw an exception that was not handled. Avoid using it for things the caller could fix.</li>
        <li><strong>502 Bad Gateway</strong> — a server acting as a proxy got an invalid response from an upstream server.</li>
        <li><strong>503 Service Unavailable</strong> — the server is temporarily down, overloaded, or in maintenance. Like 429, a Retry-After header helps clients back off gracefully.</li>
      </ul>

      <h2>401 vs 403, the pair everyone confuses</h2>
      <p>These two sound similar and are routinely swapped. The distinction is about identity versus permission.</p>
      <p>Return <strong>401</strong> when the server does not know who the caller is: no token, an expired token, or bad credentials. The implied message is authenticate and try again. Return <strong>403</strong> when the caller is authenticated but lacks rights for this action: a logged-in user hitting an admin-only endpoint. The implied message is you are known, and you still cannot do this.</p>
      <p>A quick test: would logging in with different credentials fix it? If yes, it is 401. If the user is already correctly logged in and simply lacks permission, it is 403.</p>

      <h2>301 vs 302, the other common mix-up</h2>
      <p>The difference is permanence, and it has real consequences. A <strong>301</strong> tells clients and search engines the move is permanent. They cache it hard and update bookmarks and indexes, so reverting later is painful because clients keep following the old redirect from cache.</p>
      <p>A <strong>302</strong> says the move is temporary, so clients keep requesting the original URL. Reach for 302 during maintenance pages, A/B tests, or any redirect you intend to remove. Use 301 only when you are confident the change is forever, such as a retired domain. Using 301 by accident for a temporary redirect is a frequent and hard-to-undo mistake.</p>

      <h2>Choosing the right code</h2>
      <p>A short mental checklist covers most cases. Did it succeed with data? 200. Did it create something? 201. Succeed with nothing to return? 204. Is the caller unauthenticated? 401. Authenticated but not allowed? 403. Does the resource not exist? 404. Did validation fail? 422. Did your code break? 500. Getting these right turns your API responses into an accurate signal instead of a guessing game.</p>

      <div className="not-prose mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Related tools:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link href="/tools/http-status-codes" className="text-sm text-blue-600 hover:underline">HTTP Status Codes</Link>
        </div>
      </div>
    </article>
  )
}
