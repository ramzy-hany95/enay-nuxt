import { useI18n } from 'vue-i18n'
import { getWebsiteServices } from '~/services/websiteServices'

export function useWebsiteServices() {
  const { locale } = useI18n({ useScope: 'global' })
  return useAsyncData(
    () => 'website-services-' + locale.value,
    () => getWebsiteServices(locale.value),
    { server: false }
  )
}