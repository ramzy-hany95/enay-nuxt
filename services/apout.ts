import { useApi } from '~/composables/useApi'

export async function getWebsiteAbout(email?: string, password?: string) {
  const api = useApi()

  // If email/password provided, send as form (backwards-compatible).
  if (email && password) {
    const body = new URLSearchParams()
    body.append('email', email)
    body.append('password', password)

    return await api('/api/v1/get_website_about', {
      method: 'POST',
      body: body.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  // Default: call without credentials (many sites expose public about data)
  return await api('/api/v1/get_website_about', {
    method: 'GET'
  })
}
