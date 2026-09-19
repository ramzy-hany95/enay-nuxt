import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getWebsiteHome } from '~/services/home'

export function useWebsiteHome() {
  const { locale } = useI18n({ useScope: 'global' })
  const key = computed(() => 'website-home-' + locale.value)
  return useAsyncData(key, () => getWebsiteHome(locale.value), { server: false })
}

export function homeButtonHref(value: string | undefined, fallback: string) {
  if (!value) return fallback
  const href = value.trim()
  if (/^https?:\/\//i.test(href) || /^\/(?![\/\\])/.test(href)) return href
  return fallback
}
