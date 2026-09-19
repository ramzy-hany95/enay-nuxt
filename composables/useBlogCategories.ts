import { useI18n } from 'vue-i18n'
import { getBlogCategories } from '~/services/blogs'

export function useBlogCategories() {
  const { locale } = useI18n({ useScope: 'global' })
  return useAsyncData(
    () => 'blog-categories-' + locale.value,
    () => getBlogCategories(locale.value),
    { server: false, default: () => [] }
  )
}