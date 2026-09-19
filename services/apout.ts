import { useApi } from '~/composables/useApi'

export async function getWebsiteAbout(lang: string) {
  const api = useApi()
  return await api('/api/v1/get_website_about', {
    method: 'GET',
    query: { lang }
  })
}