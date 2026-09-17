import { useApi } from '~/composables/useApi'

export interface WebsiteFaq {
  id: number
  question: string
  answer: string
  sort_order: number
  is_active: number
}

interface WebsiteFaqsResponse {
  response: number
  data: WebsiteFaq[]
}

export async function getWebsiteFaqs() {
  const api = useApi()
  const result = await api<WebsiteFaqsResponse>('/api/v1/get_website_faqs', { method: 'GET' })
  if (result.response !== 200 || !Array.isArray(result.data)) {
    throw new Error('Unable to load website FAQs')
  }
  return result.data.filter(item => item.is_active === 1).sort((a, b) => a.sort_order - b.sort_order)
}
