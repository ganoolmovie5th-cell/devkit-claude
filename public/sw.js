const CACHE_NAME = 'devkit-v4'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // Never intercept navigations — let the browser/CDN serve fresh HTML.
  if (request.mode === 'navigate' || request.destination === 'document') return

  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Network-first for same-origin static assets: always try the latest build,
  // fall back to cache only when offline. Prevents stale JS chunks after a
  // deploy (which caused "Tool not found" for newly added tools).
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok && response.type === 'basic') {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return response
      })
      .catch(async () => (await caches.match(request)) || Response.error())
  )
})
