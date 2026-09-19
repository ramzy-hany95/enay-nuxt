import { toValue, type MaybeRefOrGetter } from 'vue'
import { useI18n } from 'vue-i18n'
import { getWebsiteService } from '~/services/websiteServices'

export function useWebsiteService(slug: MaybeRefOrGetter<string>) {
  const { locale } = useI18n({ useScope: 'global' })
  return useAsyncData(
    () => 'website-service-' + locale.value + '-' + toValue(slug),
    () => getWebsiteService(toValue(slug), locale.value),
    { server: false }
  )
}