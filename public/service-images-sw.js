// Only image requests made from a services page use this cache.
const CACHE_PREFIX = 'clinic-service-images-'
const CACHE_NAME = CACHE_PREFIX + 'v1'
const MAX_AGE = 24 * 60 * 60 * 1000
const MAX_IMAGES = 30
const scopeUrl = new URL(self.registration.scope)
const metadataPrefix = new URL('__service-image-cache__/', scopeUrl).href

function metadataKey(request) {
  return metadataPrefix + encodeURIComponent(request.url)
}

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys()
    await Promise.all(names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)))
    await self.clients.claim()
  })())
})

// A cross-origin opaque response can hide a 404. Discard images that fail to decode.
self.addEventListener('message', event => {
  if (event.data?.type !== 'service-image-error' || typeof event.data.url !== 'string') return
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME)
    await Promise.all([
      cache.delete(event.data.url, { ignoreVary: true }),
      cache.delete(metadataKey({ url: event.data.url }))
    ])
  })().catch(() => {}))
})

async function serviceImage(request) {
  let cache
  try {
    cache = await caches.open(CACHE_NAME)
    const [image, metadata] = await Promise.all([
      cache.match(request), cache.match(metadataKey(request))
    ])
    const savedAt = metadata ? Number(await metadata.text()) : 0
    if (image && savedAt > Date.now() - MAX_AGE) return image
    await Promise.all([cache.delete(request), cache.delete(metadataKey(request))])
  } catch {
    // Browsing with storage disabled still uses normal network loading.
  }

  const response = await fetch(request)
  // Opaque responses are cross-origin images loaded without CORS.
  if (cache && (response.ok || response.type === 'opaque')) {
    try {
      await cache.put(request, response.clone())
      await cache.put(metadataKey(request), new Response(String(Date.now())))
      const images = (await cache.keys()).filter(key => !key.url.startsWith(metadataPrefix))
      for (const key of images.slice(0, Math.max(0, images.length - MAX_IMAGES))) {
        await Promise.all([cache.delete(key), cache.delete(metadataKey(key))])
      }
    } catch {
      // Cache quota/write failures must not break an otherwise usable image.
    }
  }
  return response
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || event.request.destination !== 'image') return
  event.respondWith((async () => {
    const client = event.clientId ? await self.clients.get(event.clientId) : undefined
    const pathname = client ? new URL(client.url).pathname : ''
    const servicesPath = scopeUrl.pathname + 'services'
    if (pathname !== servicesPath && !pathname.startsWith(servicesPath + '/')) {
      return fetch(event.request)
    }
    return serviceImage(event.request)
  })())
})
