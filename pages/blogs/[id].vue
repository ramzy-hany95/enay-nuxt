<template>
  <div class="blog-details" v-if="post">
    <section class="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
      <NuxtLink to="/blogs" class="blog-back">Back to blog</NuxtLink>

      <div class="blog-meta">
        <span class="blog-tag">{{ post.category }}</span>
        <p>{{ post.date }}</p>
      </div>

      <h1>{{ post.title }}</h1>
      <p class="blog-lead">{{ post.excerpt }}</p>

      <img :src="post.imageUrl" :alt="post.title" class="blog-cover" />

      <div class="blog-content">
        <p v-for="paragraph in post.content" :key="paragraph">{{ paragraph }}</p>
      </div>
    </section>
  </div>

  <div v-else class="mx-auto max-w-4xl px-4 py-16 md:px-8">
    <h1>Article not found</h1>
    <NuxtLink to="/blogs" class="blog-back">Return to blog list</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '~/data/blogs'

const route = useRoute()
const imageModules = import.meta.glob('~/assets/img/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const post = computed(() => {
  const item = blogPosts.find((entry) => entry.id === route.params.id)

  if (!item) {
    return null
  }

  return {
    ...item,
    imageUrl: imageModules[`/assets/img/${item.image}`] || imageModules['/assets/img/background-paint.png']
  }
})
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
  font-family: Georgia, 'Times New Roman', serif;
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