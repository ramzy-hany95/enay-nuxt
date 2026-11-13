import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'
import test from 'node:test'

const source = await readFile(new URL('../public/service-images-sw.js', import.meta.url), 'utf8')

function worker() {
  const listeners = {}
  const stores = new Map()
  let now = Date.now()
  let requests = 0
  let status = 200
  let storageDisabled = false
  class Clock extends Date {
    static now() { return now }
  }
  const key = request => typeof request === 'string' ? request : request.url
  const caches = {
    async keys() { return [...stores.keys()] },
    async delete(name) { return stores.delete(name) },
    async open(name) {
      if (storageDisabled) throw new Error('Storage disabled')
      if (!stores.has(name)) stores.set(name, new Map())
      const entries = stores.get(name)
      return {
        async match(request) { return entries.get(key(request))?.clone() },
        async put(request, response) { entries.set(key(request), response.clone()) },
        async delete(request) { return entries.delete(key(request)) },
        async keys() { return [...entries.keys()].map(url => new Request(url)) }
      }
    }
  }
  vm.runInNewContext(source, {
    URL, Response, Date: Clock, caches,
    fetch: async () => { requests++; return new Response('image', { status }) },
    self: {
      registration: { scope: 'https://clinic.test/' },
      clients: {
        get: async id => ({ url: 'https://clinic.test/' + id }),
        claim: async () => {}
      },
      skipWaiting: async () => {},
      addEventListener: (type, listener) => { listeners[type] = listener }
    }
  })
  return {
    stores,
    get requests() { return requests },
    advance: ms => { now += ms },
    setStatus: value => { status = value },
    disableStorage: () => { storageDisabled = true },
    async image(url = 'https://api.test/storage/service.png', clientId = 'services', destination = 'image') {
      let response
      listeners.fetch({
        clientId,
        request: { url, method: 'GET', destination },
        respondWith: promise => { response = promise }
      })
      return response
    },
    async evict(url) {
      let pending
      listeners.message({
        data: { type: 'service-image-error', url },
        waitUntil: promise => { pending = promise }
      })
      await pending
    },
    async activate() {
      let pending
      listeners.activate({ waitUntil: promise => { pending = promise } })
      await pending
    }
  }
}

test('reuses an image between service listing and details without another download', async () => {
  const sw = worker()
  assert.equal((await sw.image()).status, 200)
  await sw.image(undefined, 'services/neurological-rehabilitation')
  assert.equal(sw.requests, 1)
})

test('fetches a fresh image after one day', async () => {
  const sw = worker()
  await sw.image()
  sw.advance(24 * 60 * 60 * 1000 + 1)
  await sw.image()
  assert.equal(sw.requests, 2)
})

test('leaves non-image requests and other pages outside the cache', async () => {
  const sw = worker()
  assert.equal(await sw.image(undefined, 'services', 'script'), undefined)
  await sw.image(undefined, 'contact')
  await sw.image(undefined, 'services-other')
  assert.equal(sw.stores.size, 0)
})

test('does not cache failed responses or prevent loading when storage is unavailable', async () => {
  const sw = worker()
  sw.setStatus(404)
  await sw.image()
  await sw.image()
  assert.equal(sw.requests, 2)
  sw.setStatus(200)
  sw.disableStorage()
  assert.equal((await sw.image()).status, 200)
})

test('bounds the cache and evicts images reported as broken', async () => {
  const sw = worker()
  for (let i = 0; i < 32; i++) await sw.image(`https://api.test/storage/${i}.png`)
  // One image and one timestamp per entry.
  assert.equal(sw.stores.get('clinic-service-images-v1').size, 60)
  const url = 'https://api.test/storage/31.png'
  await sw.evict(url)
  await sw.image(url)
  assert.equal(sw.requests, 33)
})

test('activation removes only old versions of this feature cache', async () => {
  const sw = worker()
  sw.stores.set('clinic-service-images-v0', new Map())
  sw.stores.set('another-feature', new Map())
  await sw.activate()
  assert.equal(sw.stores.has('clinic-service-images-v0'), false)
  assert.equal(sw.stores.has('another-feature'), true)
})
