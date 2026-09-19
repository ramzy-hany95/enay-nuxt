export default defineNuxtPlugin((nuxtApp) => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const homeImageSelector = '.home-page img, .home-page .hero-image, .home-page .cta-bg'
  const selector = homeImageSelector + ', h1, h2, h3, h4, img, article, .service-card, .blog-card, .article-card, .article-mini, .feature-item, .faq-item, .contact-info__item, .booking-card, .cta-form'
  const cardSelector = 'article, .service-card, .blog-card, .article-card, .article-mini, .feature-item, .faq-item, .contact-info__item, .booking-card, .cta-form'
  const seen = new WeakSet<Element>()
  const running = new Set<Animation>()
  let observer: IntersectionObserver | undefined
  let mutations: MutationObserver | undefined

  function register(root: Element) {
    if (!observer || reducedMotion.matches) return
    const elements = [...(root.matches(selector) ? [root] : []), ...root.querySelectorAll(selector)]
    for (const element of elements) {
      if (seen.has(element) || element.closest('dialog, [role="dialog"], .booking-modal, [data-no-motion]')) continue
      // Homepage images have a dedicated reveal, including images inside cards.
      if (element.parentElement?.closest(cardSelector) && !element.matches(homeImageSelector)) continue
      seen.add(element)
      observer.observe(element)
    }
  }

  function stop() {
    observer?.disconnect()
    mutations?.disconnect()
    for (const animation of running) animation.cancel()
    running.clear()
  }

  function start() {
    stop()
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return
    observer = new IntersectionObserver(entries => {
      let delay = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer?.unobserve(entry.target)
        if (!entry.target.isConnected) continue
        const heading = /^H[1-4]$/.test(entry.target.tagName)
        // Content stays visible before observation and if JavaScript fails.
        // Individual translate does not override existing hover transforms.
        const homeImage = entry.target.matches(homeImageSelector)
        const heroImage = entry.target.matches('.home-page .hero-image')
        const frames = heroImage ? [
          { transform: 'scale(1.12) translateX(1.5%)', opacity: 0.5 },
          { transform: 'scale(1.04) translateX(0.4%)', opacity: 1, offset: 0.65 },
          { transform: 'scale(1) translateX(0)', opacity: 1 }
        ] : homeImage ? [
          { clipPath: 'inset(0 0 0 100%)' },
          { clipPath: 'inset(0 0 0 0%)' }
        ] : [
          { opacity: 0.35, translate: heading ? '0 14px' : '0 22px' },
          { opacity: 1, translate: '0 0' }
        ]
        const animation = entry.target.animate(frames, { duration: heroImage ? 2400 : homeImage ? 1100 : heading ? 500 : 600, delay: homeImage ? 0 : Math.min(delay, 180), easing: 'cubic-bezier(0.22, 1, 0.36, 1)' })
        delay += 45
        running.add(animation)
        animation.finished.then(() => running.delete(animation), () => running.delete(animation))
      }
    }, { threshold: 0.08 })
    register(document.body)
    mutations = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) if (node instanceof Element) register(node)
        for (const node of record.removedNodes) {
          if (!(node instanceof Element)) continue
          observer?.unobserve(node)
          node.querySelectorAll(selector).forEach(element => observer?.unobserve(element))
        }
      }
    })
    mutations.observe(document.body, { childList: true, subtree: true })
  }

  nuxtApp.hook('app:mounted', start)
  reducedMotion.addEventListener('change', start)
  if (import.meta.hot) import.meta.hot.dispose(() => {
    stop()
    reducedMotion.removeEventListener('change', start)
  })
})
