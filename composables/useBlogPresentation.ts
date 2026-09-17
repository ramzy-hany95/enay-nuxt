import fallbackImage from '~/assets/img/background-paint.png'
import { useI18n } from 'vue-i18n'

export function useBlogPresentation() {
  const apiBase = useRuntimeConfig().public.apiBaseUrl.replace(/\/+$/, '')
  const { locale } = useI18n()

  function blogImage(path: string | null) {
    if (!path) return fallbackImage
    if (/^https?:\/\//i.test(path)) return path
    const relative = path.replace(/^\/+/, '')
    return apiBase + '/' + (relative.startsWith('storage/') ? relative : 'storage/' + relative)
  }

  function blogDate(value: string | null) {
    if (!value) return ''
    const date = new Date(value.slice(0, 10) + 'T00:00:00')
    if (Number.isNaN(date.getTime())) return ''
    return new Intl.DateTimeFormat(locale.value, { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
  }

  return { blogImage, blogDate }
}
