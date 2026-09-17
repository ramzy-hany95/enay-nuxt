import { getWebsiteFaqs } from '~/services/faqs'

export function useWebsiteFaqs() {
  return useAsyncData('website-faqs', () => getWebsiteFaqs(), {
    server: false,
    default: () => []
  })
}
