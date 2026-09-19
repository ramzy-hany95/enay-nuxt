<template>
  <div v-if="status === 'pending' || status === 'idle'" class="mx-auto max-w-4xl px-4 py-16" role="status">{{ $t('blog.loading') }}</div>
  <div v-else-if="error" class="mx-auto max-w-4xl px-4 py-16" role="alert">
    <p>{{ $t('blog.loadError') }}</p>
    <button type="button" class="blog-back" @click="refresh()">{{ $t('blog.retry') }}</button>
  </div>
  <div class="blog-details" v-else-if="post">
    <section class="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <NuxtLink to="/blogs" class="blog-back">{{ $t('blog.backToList') }}</NuxtLink>

      <div class="blog-meta">
        <span v-if="post.category" class="blog-tag">{{ post.category?.name }}</span>
        <p>{{ blogDate(post.published_at) }}</p>
      </div>

      <h1>{{ post.title }}</h1>
      <p class="blog-lead">{{ post.description }}</p>

      <img :src="blogImage(post.image)" :alt="post.title" class="blog-cover" />

      <div class="blog-content">
        <p v-for="(paragraph, idx) in paragraphs" :key="idx">{{ paragraph }}</p>
      </div>
    </section>
  </div>

  <div v-else class="mx-auto max-w-4xl px-4 py-16 md:px-8">
    <h1>{{ $t('blog.notFound') }}</h1>
    <NuxtLink to="/blogs" class="blog-back">{{ $t('blog.returnToList') }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })
import { getPublicBlog } from '~/services/blogs'

const route = useRoute()
// The existing dynamic route is named [id], but its value is the API slug.
const slug = computed(() => String(route.params.id || ''))
const { blogImage, blogDate } = useBlogPresentation()
const { data: result, status, error, refresh } = await useAsyncData(
  () => 'public-blog-' + locale.value + '-' + slug.value,
  () => getPublicBlog(slug.value, locale.value),
  { server: false }
)
const post = computed(() => result.value?.data)
const paragraphs = computed(() => post.value?.content?.split(/\r?\n\s*\r?\n/).filter(Boolean) || [])
</script>

<style scoped>
.blog-details {
  background: #ffffff;
  color: #142229;
}

.blog-back {
  color: #157468;
  font-weight: 700;
}

.blog-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 20px;
}

.blog-meta p {
  margin: 0;
  color: #7c8c91;
  font-size: 0.82rem;
  text-transform: uppercase;
}

.blog-tag {
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 999px;
  background: #e8f4f2;
  color: #157468;
  font-size: 0.78rem;
  font-weight: 800;
}

.blog-details h1 {
  margin: 18px 0 0;
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3.8vw, 3.3rem);
  line-height: 1.15;
}

.blog-lead {
  margin: 14px 0 0;
  color: #5c6d73;
  line-height: 1.8;
  font-size: 1.02rem;
}

.blog-cover {
  width: 100%;
  margin-top: 28px;
  border-radius: 18px;
  object-fit: cover;
  max-height: 520px;
}

.blog-content {
  margin-top: 28px;
  display: grid;
  gap: 16px;
}

.blog-content p {
  margin: 0;
  color: #32464d;
  line-height: 1.9;
}
</style>