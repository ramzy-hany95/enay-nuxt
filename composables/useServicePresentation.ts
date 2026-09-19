import fallbackImage from '~/assets/img/background-paint.png'
import type { WebsiteService } from '~/services/websiteServices'

export function useServicePresentation() {
  const base = useRuntimeConfig().public.apiBaseUrl.replace(/\/+$/, '')
  const text = (value: unknown): string => typeof value === 'string' ? value : ''
  const lines = (value: unknown): string[] => Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : text(value).split(/\r?\n/).map(item => item.trim()).filter(Boolean)

  function imageUrl(value: unknown) {
    const path = text(value).trim()
    if (!path) return fallbackImage
    if (/^https?:\/\//i.test(path)) return path
    const relative = path.replace(/^\/+/, '')
    return base + '/' + (relative.startsWith('storage/') ? relative : 'storage/' + relative)
  }

  // Optional field mapping until a populated service response is available.
  function presentService(item: WebsiteService) {
    return {
      id: String(item.id ?? item.slug ?? ''),
      slug: text(item.slug),
      title: text(item.title),
      description: text(item.short_description ?? item.shortDescription ?? item.description),
      imageUrl: imageUrl(item.image ?? item.banner),
      overview: lines(item.overview ?? item.content ?? item.description),
      audience: lines(item.audience),
      outcomes: lines(item.outcomes),
      duration: text(item.duration),
      durationNote: text(item.duration_note ?? item.durationNote)
    }
  }
  return { presentService, fallbackImage }
}
