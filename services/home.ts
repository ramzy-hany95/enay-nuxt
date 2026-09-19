import { useApi } from '~/composables/useApi'
import type { PublicBlog } from '~/services/blogs'

export interface WebsiteHomeContent {
  id: number
  hero_banner: string | null
  hero_title: string
  hero_description: string
  hero_sub_description: string
  hero_button_text: string
  hero_button_href: string
  features_title: string
  features_description: string
  cta_title: string
  cta_description: string
  cta_first_icon: string
  cta_first_title: string
  cta_second_icon: string
  cta_second_title: string
  cta_button_text: string
  cta_button_href: string
}

// Optional fields until the API supplies a non-empty features collection.
export interface HomeFeature {
  id?: number
  title?: string
  description?: string
}

export interface WebsiteHome {
  content: WebsiteHomeContent | null
  features: HomeFeature[]
  latest_blogs: PublicBlog[]
}

export async function getWebsiteHome(lang: string) {
  const api = useApi()
  const result = await api<{ response: number; data: WebsiteHome }>('/api/v1/get_website_home', { method: 'GET', query: { lang } })
  if (result.response !== 200 || !result.data) throw new Error('Unable to load homepage')
  return result.data
}
