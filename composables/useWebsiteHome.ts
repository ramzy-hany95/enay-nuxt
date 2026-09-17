import { getWebsiteHome } from '~/services/home'

export function useWebsiteHome() {
  return useAsyncData('website-home', () => getWebsiteHome(), { server: false })
}

export function homeButtonHref(value: string | undefined, fallback: string) {
  if (!value) return fallback
  const href = value.trim()
  if (/^https?:\/\//i.test(href) || /^\/(?![\/\\])/.test(href)) return href
  return fallback
}
