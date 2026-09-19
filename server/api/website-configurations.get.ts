export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  try {
    const result = await $fetch<{ response: number; data: Record<string, unknown> }>('/api/v1/get_configurations_all', {
      baseURL: config.public.apiBaseUrl, method: 'GET'
    })
    if (result.response !== 200 || !result.data) throw new Error('Invalid response')
    const text = (key: string) => typeof result.data[key] === 'string' ? result.data[key].trim() : ''
    return {
      logo: text('logo'), clinic_name: text('clinic_name'), address: text('address'),
      phone: text('phone'), phone_second: text('phone_second'), email: text('email'),
      latitude: text('clinic_location_latitude'), longitude: text('clinic_location_longitude')
    }
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Unable to load website configurations' })
  }
})
