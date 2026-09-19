import { computed } from 'vue'
import {
  IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandSnapchat,
  IconBrandTelegram, IconBrandTiktok, IconBrandWhatsapp, IconBrandX, IconLink
} from '@tabler/icons-vue'

interface SocialMedia {
  id: number
  title: string
  url: string
  image: string | null
}

const icons = {
  facebook: IconBrandFacebook, instagram: IconBrandInstagram, linkedin: IconBrandLinkedin,
  snapchat: IconBrandSnapchat, telegram: IconBrandTelegram, tiktok: IconBrandTiktok,
  whatsapp: IconBrandWhatsapp, twitter: IconBrandX, x: IconBrandX
}

export function safeSocialUrl(value: string) {
  try {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) ? url.href : ''
  } catch {
    return ''
  }
}

export function useSocialMedia() {
  const api = useApi()
  const request = useAsyncData('website-social-media', async () => {
    const result = await api<{ response: number; data: SocialMedia[] }>('/api/v1/get_social_media', { method: 'GET' })
    if (result.response !== 200 || !Array.isArray(result.data)) throw new Error('Unable to load social media')
    return result.data
  }, { server: false, default: () => [] })

  const socials = computed(() => request.data.value.flatMap(item => {
    const href = safeSocialUrl(item.url)
    if (!href) return []
    const key = item.title.trim().toLowerCase()
    return [{ id: item.id, key, title: item.title, href, icon: icons[key as keyof typeof icons] || IconLink }]
  }))
  return { socials, status: request.status, error: request.error, refresh: request.refresh }
}
