<template>
  <div class="blog-page">
    <section class="blog-hero">
      <div class="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <p class="blog-eyebrow">{{ $t('blog.eyebrow') }}</p>
        <h1>{{ $t('blog.title') }}</h1>
        <p class="blog-intro">{{ $t('blog.intro') }}</p>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
      <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <NuxtLink v-for="post in posts" :key="post.id" :to="`/blogs/${post.id}`" class="blog-card">
          <img :src="post.imageUrl" :alt="$t(`blogs.${post.id}.title`)" class="blog-card__image" />
          <div class="blog-card__body">
            <span class="blog-card__tag">{{ $t(`blogs.${post.id}.category`) }}</span>
            <p class="blog-card__date">{{ $t(`blogs.${post.id}.date`) }}</p>
            <h2>{{ $t(`blogs.${post.id}.title`) }}</h2>
            <p class="blog-card__excerpt">{{ $t(`blogs.${post.id}.excerpt`) }}</p>
            <span class="blog-card__link">{{ $t('common.readArticle') }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="faq-section">
      <div class="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        <h2>{{ $t('common.faqTitle') }}</h2>
        <p class="faq-section__intro">{{ $t('common.faqIntro') }}</p>

            <div class="faq-list">
              <details v-for="(item, index) in $t('services.faqItems')" :key="index" class="faq-item" :open="index === 0">
            <summary>
              <span>{{ item.question }}</span>
              <span class="faq-item__icon"></span>
            </summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from '~/data/blogs'

const imageModules = import.meta.glob('~/assets/img/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const posts = blogPosts.map((post) => ({
  ...post,
  imageUrl: imageModules[`/assets/img/${post.image}`] || imageModules['/assets/img/background-paint.png']
}))

// FAQ items are provided via `$t('services.faqItems')` in the template
</script>

<style scoped>
.blog-page {
  background: #ffffff;
  color: #142229;
}

.blog-hero {
  background: #ffffff;
}

.blog-eyebrow {
  margin: 0 0 12px;
  color: #157468;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.blog-hero h1 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.4rem, 4vw, 4rem);
}

.blog-intro {
  margin: 14px 0 0;
  max-width: 60ch;
  color: #5c6d73;
  line-height: 1.7;
}

.blog-card {
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid #e1ecea;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(12, 34, 41, 0.08);
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 50px rgba(12, 34, 41, 0.14);
}

.blog-card__image {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.blog-card__body {
  padding: 18px;
}

.blog-card__tag {
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 999px;
  background: #e8f4f2;
  color: #157468;
  font-size: 0.78rem;
  font-weight: 800;
}

.blog-card__date {
  margin: 12px 0 0;
  color: #7c8c91;
  font-size: 0.78rem;
  text-transform: uppercase;
}

.blog-card h2 {
  margin: 10px 0 0;
  font-size: 1.25rem;
  line-height: 1.35;
}

.blog-card__excerpt {
  margin: 12px 0 0;
  color: #5c6d73;
  line-height: 1.65;
}

.blog-card__link {
  display: inline-flex;
  margin-top: 14px;
  color: #157468;
  font-weight: 700;
}

.faq-section {
  background: #ffffff;
  color: #142229;
}

.faq-section h2 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1.08;
}

.faq-section__intro {
  margin: 14px 0 0;
  color: #5c6d73;
  font-size: 0.98rem;
}

.faq-list {
  display: grid;
  gap: 24px;
  margin-top: 38px;
}

.faq-item {
  border: 1px solid #d8e4e1;
  border-radius: 18px;
  padding: 22px 24px;
  background: #ffffff;
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  list-style: none;
  font-size: 1.15rem;
  font-weight: 700;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item__icon {
  position: relative;
  width: 18px;
  height: 18px;
  flex: 0 0 auto;
}

.faq-item__icon::before,
.faq-item__icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 2px;
  background: #142229;
  transform: translate(-50%, -50%);
  transition: transform 180ms ease, opacity 180ms ease;
}

.faq-item__icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.faq-item[open] .faq-item__icon::after {
  opacity: 0;
}

.faq-item p {
  margin: 18px 0 0;
  max-width: 72ch;
  color: #5c6d73;
  font-size: 0.98rem;
  line-height: 1.75;
}

@media (max-width: 767px) {
  .faq-item {
    padding: 18px;
  }

  .faq-item summary {
    font-size: 1rem;
  }

  .faq-item p {
    font-size: 0.92rem;
  }
}
</style>