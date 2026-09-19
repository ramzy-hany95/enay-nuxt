import { useI18n } from 'vue-i18n'
import { getWebsiteFaqs } from '~/services/faqs'

export function useWebsiteFaqs() {
  const { locale } = useI18n({ useScope: 'global' })
  return useAsyncData(() => 'website-faqs-' + locale.value, () => getWebsiteFaqs(locale.value), {
    server: false,
    default: () => []
  })
}
