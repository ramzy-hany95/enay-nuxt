import { reactive, ref } from 'vue'

export interface ContactMessagePayload {
  first_name: string
  last_name: string
  country_code: string
  phone: string
  date: string
  message: string
}

export function useContactMessage() {
  const api = useApi()
  const form = reactive<ContactMessagePayload>({
    first_name: '', last_name: '', country_code: '+20', phone: '', date: '', message: ''
  })
  const sending = ref(false)
  const sent = ref(false)
  const failed = ref(false)

  async function submitContact() {
    if (sending.value) return false
    sending.value = true
    sent.value = false
    failed.value = false
    try {
      const body = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value.trim()])) as unknown as ContactMessagePayload
      const result = await api<{ response?: number; success?: boolean }>('/api/v1/add_website_contact_message', {
        method: 'POST', body
      })
      if (result?.success === false || (result?.response !== undefined && (result.response < 200 || result.response >= 300))) {
        throw new Error('Contact message rejected')
      }
      sent.value = true
      return true
    } catch {
      failed.value = true
      return false
    } finally {
      sending.value = false
    }
  }
  return { form, sending, sent, failed, submitContact }
}
