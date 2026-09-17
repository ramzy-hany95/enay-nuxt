import { useApi } from '~/composables/useApi'

export interface PublicBlog {
  id: number
  slug: string
  title: string
  description: string
  content: string
  image: string | null
  published_at: string | null
  category: { id: number; name: string; slug: string } | null
}

interface ApiResponse<T> {
  response: number
  data: T
}

export interface BlogPage {
  data: PublicBlog[]
  current_page: number
  last_page: number
  total: number
}

export async function getPublicBlogs(page = 1) {
  const api = useApi()
  const result = await api<ApiResponse<BlogPage>>('/api/v1/get_public_blogs', {
    method: 'GET', query: { page }
  })
  if (result.response !== 200 || !result.data) throw new Error('Unable to load blogs')
  return result.data
}

export async function getPublicBlog(slug: string) {
  const api = useApi()
  const result = await api<ApiResponse<PublicBlog | null>>('/api/v1/get_public_blog/' + encodeURIComponent(slug), { method: 'GET' })
  if (result.response !== 200) throw new Error('Unable to load blog')
  return result
}
