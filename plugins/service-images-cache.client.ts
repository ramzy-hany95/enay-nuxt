export default defineNuxtPlugin((nuxtApp) => {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) return
  const base = useRuntimeConfig().app.baseURL

  nuxtApp.hook('app:mounted', () => {
    // Registration must never delay rendering or prevent images from loading.
    void navigator.serviceWorker.register(base + 'service-images-sw.js', {
      scope: base,
      updateViaCache: 'none'
    }).catch(() => {})
  })
})
