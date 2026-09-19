import { useApi } from '~/composables/useApi'

// Service fields will be typed once the API returns a populated service.
export type WebsiteService = Record<string, unknown>

export interface WebsiteServicesData {
  section: {
    id: number
    title?: string | null
    description?: string | null
    created_at?: string
    updated_at?: string
  } | null
  services: WebsiteService[]
}

interface ApiResponse<T> {
  response: number
  data: T
}

export async function getWebsiteServices(lang: string) {
  const api = useApi()
  const result = await api<ApiResponse<WebsiteServicesData>>('/api/v1/get_website_services', {
    method: 'GET',
    query: { lang }
  })
  if (result.response !== 200 || !result.data || !Array.isArray(result.data.services)) {
    throw new Error('Unable to load website services')
  }
  return result.data
}

export async function getWebsiteService(slug: string, lang: string) {
  const api = useApi()
  const result = await api<ApiResponse<WebsiteService | null>>(
    '/api/v1/get_website_service/' + encodeURIComponent(slug),
    { method: 'GET', query: { lang } }
  )
  if (result.response !== 200) throw new Error('Unable to load website service')
  return result.data
}