<template>
  <div class="services-page">
    <section class="services-hero">
        <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:px-8 md:py-16 lg:grid-cols-[260px_1fr] lg:items-start">
        <h1>{{ serviceData?.section?.title || $t('services.title') }}</h1>
        <p>{{ serviceData?.section?.description || $t('services.subtitle') }}</p>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <div v-if="status === 'pending' || status === 'idle'" role="status">
        <p class="mb-6 text-teal-800">{{ $t('services.loading') }}</p>
        <div class="services-grid" aria-hidden="true">
          <div v-for="item in 3" :key="item" class="h-80 rounded-2xl bg-slate-100 motion-safe:animate-pulse"></div>
        </div>
      </div>
      <div v-else-if="error" class="service-state" role="alert">
        <p>{{ $t('services.loadError') }}</p>
        <button type="button" class="mt-4 rounded-full bg-teal-700 px-6 py-3 text-white" @click="refresh()">{{ $t('services.retry') }}</button>
      </div>
      <div v-else-if="!services.length" class="service-state" role="status">{{ $t('services.empty') }}</div>
      <div v-else class="services-grid">
        <NuxtLink v-for="service in services" :key="service.id" :to="`/services/${encodeURIComponent(service.slug)}`" class="service-card">
          <div class="service-card__media"><img :src="service.imageUrl" :alt="service.title" class="service-card__image" loading="lazy" @error="onImageError" /></div>
          <div class="service-card__body">
            <h2>{{ service.title }}</h2>
            <p>{{ descriptionPreview(service.description) }}</p>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="faq-section">
      <div class="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <h2>{{ $t('common.faqTitle') }}</h2>
        <p class="faq-section__intro">{{ $t('common.faqIntro') }}</p>

        <p v-if="faqStatus === 'pending' || faqStatus === 'idle'" class="mt-8" role="status">{{ $t('faq.loading') }}</p>
        <div v-else-if="faqError" class="mt-8" role="alert">
          <p>{{ $t('faq.loadError') }}</p>
          <button type="button" class="mt-3 font-semibold text-emerald-700" @click="refreshFaqs()">{{ $t('faq.retry') }}</button>
        </div>
        <p v-else-if="!faqItems.length" class="mt-8">{{ $t('faq.empty') }}</p>
        <div v-else class="faq-list">
          <details v-for="(item, index) in faqItems" :key="item.id" class="faq-item" >
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
const { presentService, fallbackImage } = useServicePresentation()
const { data: serviceData, status, error, refresh } = await useWebsiteServices()
const localServices = useLocalServices()
const services = computed(() => {
  const items = (serviceData.value?.services || []).map(presentService).filter(service => service.slug)
  return items.length ? items : localServices.value
})

function descriptionPreview(description: string) {
  const words = description.trim().split(/\s+/).filter(Boolean)
  return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : description
}

function onImageError(event: Event) {
  const image = event.target as HTMLImageElement
  image.onerror = null
  if (image.getAttribute('src') !== fallbackImage) image.src = fallbackImage
}

const { data: faqItems, status: faqStatus, error: faqError, refresh: refreshFaqs } = await useWebsiteFaqs()
</script>

<style scoped>
.services-hero { background: #fff; }
.service-state { padding: 48px 24px; text-align: center; border: 1px dashed #c5ddd7; border-radius: 20px; background: #f7fbfa; color: #526963; }
.service-card__link { display: flex; justify-content: space-between; margin-top: 24px; color: #157468; font-weight: 600; }
.service-card:focus-visible { outline: 3px solid #178073; outline-offset: 4px; }


.services-page {
  background: #ffffff;
  color: #142229;
}

.services-hero h1,
.faq-section h2 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(2.4rem, 4vw, 4.2rem);
  line-height: 0.92;
  color: #131313;
}

.services-hero p {
  margin: 0;
  max-width: 58ch;
  color: #5c6d73;
  font-size: 1rem;
  line-height: 1.65;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 64px 32px;
}

.service-card {
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #d8e4e1;
  background: #ffffff;
  transition: transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease;
}

.service-card__media {
  overflow: hidden;
}

.service-card__image {
  transition: transform 450ms cubic-bezier(0.2, 0.7, 0.3, 1);
}

.service-card__body {
  transition: background-color 300ms ease;
}

.service-card__body h2 {
  transition: color 300ms ease;
}

@media (hover: hover) and (pointer: fine) {
  .service-card:hover {
    transform: translateY(-8px);
    border-color: #178073;
    box-shadow: 0 20px 40px rgb(12 70 55 / 16%);
  }

  .service-card:hover .service-card__image {
    transform: scale(1.06);
  }

  .service-card:hover .service-card__body {
    background-color: #f0f8f5;
  }

  .service-card:hover h2 {
    color: #157468;
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-card,
  .service-card__image,
  .service-card__body,
  .service-card__body h2 {
    transition: none;
  }

  .service-card:hover,
  .service-card:hover .service-card__image {
    transform: none;
  }
}

.service-card__image {
  width: 100%;
  aspect-ratio: 1.08;
  object-fit: cover;
  display: block;
}

.service-card__body {
  padding: 18px 14px 22px;
}

.service-card__body h2 {
  margin: 0;
  color: #1b1b1b;
  font-family: var(--font-heading);
  font-size: 1.02rem;
  line-height: 1.2;
}

.service-card__body p {
  margin: 10px 0 0;
  color: #5c6d73;
  font-size: 0.88rem;
  line-height: 1.5;
}

.faq-section {
  background: #ffffff;
  color: #142229;
}

.faq-section__intro {
  margin: 14px 0 0;
  color: #5c6d73;
  font-size: 0.98rem;
}

.faq-list {
  display: grid;
  gap: 16px;
  margin-top: 34px;
  max-width: 670px;
}

.faq-item {
  border: 1px solid #d8e4e1;
  border-radius: 12px;
  padding: 16px 18px;
  background: #ffffff;
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  list-style: none;
  font-size: 1rem;
  font-weight: 700;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item__icon {
  position: relative;
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
}

.faq-item__icon::before,
.faq-item__icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 2px;
  background: #142229;
  transform: translate(-50%, -50%);
  transition: opacity 180ms ease;
}

.faq-item__icon::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.faq-item[open] .faq-item__icon::after {
  opacity: 0;
}

.faq-item p {
  margin: 14px 0 0;
  color: #5c6d73;
  line-height: 1.7;
}

@media (min-width: 760px) {
  .services-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .services-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
.services-hero h1 { max-width: 5ch; line-height: 1.05; }
.service-card { align-self: start; }
.faq-section h2 { font-size: clamp(1.7rem, 3vw, 2.5rem); line-height: 1.2; }
@media (max-width: 759px) { .services-grid { gap: 28px; } .services-hero h1 { max-width: none; } }
</style>