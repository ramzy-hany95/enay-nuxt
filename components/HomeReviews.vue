<template>
  <section v-if="images.length" class="reviews-section py-10 md:py-12" aria-labelledby="home-reviews-title">
    <div class="mx-auto max-w-6xl px-4 md:px-8">
      <h2 id="home-reviews-title" class="mb-6 text-center text-2xl font-bold">{{ $t('home.reviews.title') }}</h2>
      <div class="reviews-grid">
        <div v-for="(image, index) in images" :key="image" class="review-card">
          <img :src="image" :alt="$t('home.reviews.image', { number: index + 1 })" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{ images: string[] }>()
</script>
<style scoped>
.reviews-section { background: #f8fcfc; color: #1a252a; }
h2 { font-family: var(--font-heading); }
.reviews-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.review-card { padding: 12px; border: 1px solid #e1eceb; border-radius: 14px; background: white; }
img { display: block; width: 100%; height: auto; }
@media (max-width: 767px) { .reviews-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; } }
@media (max-width: 479px) { .reviews-grid { grid-template-columns: 1fr; } }
</style>
