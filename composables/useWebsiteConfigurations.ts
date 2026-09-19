import { computed } from 'vue'

export function useWebsiteConfigurations() {
  const base = useRuntimeConfig().public.apiBaseUrl.replace(/\/+$/, '')
  const { data: configurations } = useFetch('/api/website-configurations', { key: 'website-configurations', server: false })
  const logoUrl = computed(() => {
    const path = configurations.value?.logo
    if (!path) return '/assets/css/logo.png'
    if (/^https?:\/\//i.test(path)) return path
    const relative = path.replace(/^\/+/, '')
    return base + '/' + (relative.startsWith('storage/') ? relative : 'storage/' + relative)
  })
  const mapUrl = computed(() => {
    const data = configurations.value
    const lat = Number(data?.latitude)
    const lng = Number(data?.longitude)
    const valid = data?.latitude && data?.longitude && Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180
    const query = valid ? lat + ',' + lng : data?.address || 'Saudi Arabia'
    return 'https://www.google.com/maps?q=' + encodeURIComponent(query) + '&z=15&output=embed'
  })
  return { configurations, logoUrl, mapUrl }
}
