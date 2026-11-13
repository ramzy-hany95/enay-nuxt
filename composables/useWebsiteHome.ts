import { useI18n } from 'vue-i18n'
import { getWebsiteHome } from '~/services/home'

export function useWebsiteHome() {
  const { locale } = useI18n({ useScope: 'global' })
  // Refresh the same data entry so the current layout stays visible while
  // the next language is loading. Nuxt cancels superseded refreshes.
  return useAsyncData('website-home', () => getWebsiteHome(locale.value), {
    server: false,
    watch: [locale],
    dedupe: 'cancel'
  })
}

export function homeButtonHref(value: string | undefined, fallback: string) {
  if (!value) return fallback
  const href = value.trim()
  if (/^https?:\/\//i.test(href) || /^\/(?![\/\\])/.test(href)) return href
  return fallback
}
