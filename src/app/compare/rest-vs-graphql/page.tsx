import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'REST vs GraphQL — API Design Comparison | DevKit',
  description: 'Compare REST and GraphQL APIs: architecture, flexibility, performance, caching, and when to choose each approach.',
  alternates: { canonical: '/compare/rest-vs-graphql/' },
  keywords: 'rest vs graphql, api comparison, rest graphql difference',
}

export default function RestVsGraphql() {
  return (
    <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert max-w-none">
      <h1>REST vs GraphQL</h1>
      <p className="lead">Two dominant API paradigms with fundamentally different data fetching philosophies.</p>

      <div className="overflow-x-auto not-prose">
        <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr><th className="p-3 text-left">Aspect</th><th className="p-3 text-left">REST</th><th className="p-3 text-left">GraphQL</th></tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <tr><td className="p-3 font-medium">Architecture</td><td className="p-3">Resource-based (nouns)</td><td className="p-3">Query-based (ask for what you need)</td></tr>
            <tr><td className="p-3 font-medium">Endpoints</td><td className="p-3">Multiple (/users, /posts, /comments)</td><td className="p-3">Single (/graphql)</td></tr>
            <tr><td className="p-3 font-medium">Over-fetching</td><td className="p-3">Common (fixed response shape)</td><td className="p-3">Eliminated (client specifies fields)</td></tr>
            <tr><td className="p-3 font-medium">Under-fetching</td><td className="p-3">Requires multiple requests</td><td className="p-3">Solved (nested queries)</td></tr>
            <tr><td className="p-3 font-medium">Caching</td><td className="p-3">Easy (HTTP caching, CDN)</td><td className="p-3">Complex (custom cache layers)</td></tr>
            <tr><td className="p-3 font-medium">Versioning</td><td className="p-3">/v1/, /v2/ or headers</td><td className="p-3">No versioning needed (add fields)</td></tr>
            <tr><td className="p-3 font-medium">Error handling</td><td className="p-3">HTTP status codes</td><td className="p-3">Always 200, errors in response body</td></tr>
            <tr><td className="p-3 font-medium">File uploads</td><td className="p-3">Native (multipart/form-data)</td><td className="p-3">Not built-in (workarounds)</td></tr>
            <tr><td className="p-3 font-medium">Learning curve</td><td className="p-3">Low (HTTP knowledge)</td><td className="p-3">Medium (schema, resolvers, types)</td></tr>
            <tr><td className="p-3 font-medium">Real-time</td><td className="p-3">WebSocket/SSE (separate)</td><td className="p-3">Subscriptions (built-in)</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Choose REST when</h2>
      <ul>
        <li>Simple CRUD operations</li>
        <li>Caching is critical (CDN-friendly)</li>
        <li>Team is familiar with HTTP conventions</li>
        <li>Public APIs with many consumers</li>
        <li>File-heavy operations</li>
      </ul>

      <h2>Choose GraphQL when</h2>
      <ul>
        <li>Multiple clients need different data shapes (web, mobile, watch)</li>
        <li>Complex, nested data relationships</li>
        <li>Rapid frontend iteration without backend changes</li>
        <li>Reducing network requests matters (mobile, slow networks)</li>
        <li>Strong typing and self-documenting API desired</li>
      </ul>

      <h2>Bottom line</h2>
      <p><strong>REST</strong> is simpler, better cached, and the default choice for most APIs. <strong>GraphQL</strong> shines when clients have diverse data needs and you want to avoid over-fetching. Many teams use both — REST for simple services, GraphQL as a gateway aggregating multiple REST backends.</p>
    </div>
  )
}
