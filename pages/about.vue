<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="about-hero__image" :style="{ backgroundImage: `url(${heroImage})` }"></div>
      <div class="about-hero__overlay"></div>
      <div class="about-hero__fade"></div>

      <div class="mx-auto flex min-h-[360px] max-w-6xl items-end px-4 pb-6 md:min-h-[460px] md:px-8 md:pb-8">
        <div class="about-hero__content">
          <h1>{{ $t('about.title') }}</h1>
          <p>{{ description }}</p>
        </div>
      </div>
    </section>

    <section class="about-story py-16 md:py-24">
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <img :src="storyImage" :alt="$t('about.images.story')"  />

        <div class="about-copy">
          <h2>{{ philosophyTitle }}</h2>
          <p>{{ philosophyText }}</p>
        </div>
      </div>
    </section>

    <section class="about-choose py-10 md:py-16">
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div class="about-reasons">
          <h2>{{ whyTitle }}</h2>

          <div class="reason-item" v-for="reason in reasons" :key="reason.number">
            <span class="reason-item__number">{{ reason.number }}</span>
            <div>
              <h3>{{ reason.title }}</h3>
              <p>{{ reason.text }}</p>
            </div>
          </div>
        </div>

        <div class="about-gallery">
          <div class="about-gallery__top">
            <img :src="galleryTopLeft" :alt="$t('about.images.galleryTopLeft')" />
            <img :src="galleryTopRight" :alt="$t('about.images.galleryTopRight')" />
          </div>
          <img :src="galleryBottom" :alt="$t('about.images.galleryBottom')" class="about-gallery__bottom" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import heroImage from '../assets/img/photo.png'
import storyImageStatic from '../assets/img/Container.png'
import galleryTopLeftStatic from '../assets/img/Image.png'
import galleryTopRightStatic from '../assets/img/Image1.png'
import galleryBottomStatic from '../assets/img/WithFallback.png'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRuntimeConfig, useAsyncData } from '#imports'
import { getWebsiteAbout } from '~/services/apout'

const { t } = useI18n()
const apiBase = useRuntimeConfig().public.apiBaseUrl.replace(/\/+$/, '')
const { data: aboutData } = await useAsyncData('websiteAbout', () => getWebsiteAbout(), { server: false })
const about = computed(() => aboutData.value?.data)

function imageUrl(path: string | undefined, fallback: string) {
  if (!path?.trim()) return fallback
  if (/^https?:\/\//i.test(path)) return path
  const relativePath = path.replace(/^\/+/, '')
  return `${apiBase}/${relativePath.startsWith('storage/') ? relativePath : `storage/${relativePath}`}`
}

const storyImage = computed(() => imageUrl(about.value?.section_one_images?.[0], storyImageStatic))
const galleryTopLeft = computed(() => imageUrl(about.value?.section_two_image_one, galleryTopLeftStatic))
const galleryTopRight = computed(() => imageUrl(about.value?.section_two_image_two, galleryTopRightStatic))
const galleryBottom = computed(() => imageUrl(about.value?.section_two_image_three, galleryBottomStatic))

const description = computed(() => about.value?.description || t('about.lead'))
const philosophyTitle = computed(() => about.value?.section_one_title || t('about.philosophyTitle'))
const philosophyText = computed(() => about.value?.section_one_description || t('about.philosophyText'))
const whyTitle = computed(() => about.value?.section_two_title || t('about.whyTitle'))

const reasons = computed(() => {
  const descriptions = [
    about.value?.section_two_description_one,
    about.value?.section_two_description_two,
    about.value?.section_two_description_three
  ]

  return descriptions.map((description, index) => {
    const lines = description?.split(/\r?\n/).map(line => line.trim()).filter(Boolean) || []
    return {
      number: String(index + 1).padStart(2, '0'),
      title: lines[0] || t(`about.reasons.${index}.title`),
      text: lines.length ? lines.slice(1).join('\n') : t(`about.reasons.${index}.text`)
    }
  })
})
</script>

<style scoped>
.about-page {
  background: #ffffff;
  color: #12222a;
}

.about-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.about-hero__image,
.about-hero__overlay,
.about-hero__fade {
  position: absolute;
  inset: 0;
}

.about-hero__image {
  background-size: cover;
  background-position: center top;
  transform: scale(1.03);
}

.about-hero__overlay {
  background: linear-gradient(180deg, rgba(6, 12, 20, 0.4) 0%, rgba(6, 12, 20, 0.16) 35%, rgba(0, 0, 0, 0) 100%);
}

.about-hero__fade {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 55%, rgba(255, 255, 255, 0.98) 100%);
}

.about-hero__content {
  position: relative;
  z-index: 1;
  width: 100%;
  text-align: center;
}

.about-hero__content h1 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 4vw, 3.8rem);
  font-weight: 700;
  color: #111111;
}

.about-hero__content h1::after {
  content: '';
  display: block;
  width: 74px;
  height: 2px;
  margin: 10px auto 0;
  background: #1c7f71;
}

.about-hero__content p {
  margin: 14px auto 0;
  max-width: 72ch;
  color: #677277;
  font-size: 0.92rem;
  line-height: 1.6;
}

.about-story__image {
  width: 100%;
  max-width: 100%;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
}

.about-copy {
  max-width: 540px;
}

.about-copy h2,
.about-reasons h2 {
  margin: 0 0 16px;
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  color: #111111;
}

.about-copy p {
  color: #5c6b71;
  font-size: 0.96rem;
  line-height: 1.8;
}

.about-reasons h2 {
  margin-bottom: 26px;
}

.reason-item {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 14px;
  margin-bottom: 26px;
}

.reason-item__number {
  color: #1c7f71;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.reason-item h3 {
  margin: 0 0 8px;
  color: #1f6f64;
  font-size: 1rem;
  font-weight: 700;
}

.reason-item p {
  margin: 0;
  color: #5c6b71;
  line-height: 1.7;
  font-size: 0.92rem;
}

.about-gallery {
  display: grid;
  gap: 16px;
}

.about-gallery__top {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.about-gallery__top img,
.about-gallery__bottom {
  width: 100%;
  border-radius: 10px;
  object-fit: cover;
  display: block;
}

.about-gallery__top img {
  aspect-ratio: 1 / 1;
}

.about-gallery__bottom {
  aspect-ratio: 16 / 7;
}

@media (max-width: 1024px) {
  .about-copy {
    max-width: 100%;
  }
}

@media (max-width: 767px) {
  .about-hero__content p {
    font-size: 0.88rem;
  }

  .about-story__image {
    min-height: 320px;
  }

  .about-gallery__bottom {
    aspect-ratio: 16 / 8;
  }
}
</style>
