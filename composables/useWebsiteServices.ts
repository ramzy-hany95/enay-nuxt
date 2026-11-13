import { useI18n } from 'vue-i18n'
import { getWebsiteServices } from '~/services/websiteServices'

export function useWebsiteServices() {
  const { locale } = useI18n({ useScope: 'global' })
  const cache = useState<Record<string, {
    data: Awaited<ReturnType<typeof getWebsiteServices>>
    expires: number
  }>>('website-services-cache', () => ({}))
  return useAsyncData(
    () => 'website-services-' + locale.value,
    async () => {
      const language = locale.value
      const data = await getWebsiteServices(language)
      cache.value[language] = { data, expires: Date.now() + 5 * 60 * 1000 }
      return data
    },
    {
      server: false,
      getCachedData: (_key, _nuxtApp, context) => {
        if (context.cause === 'refresh:manual' || context.cause === 'refresh:hook') return undefined
        const entry = cache.value[locale.value]
        return entry && entry.expires > Date.now() ? entry.data : undefined
      }
    }
  )
}
