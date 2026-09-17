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
          <h2>{{ $t('about.whyTitle') }}</h2>

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
import heroImageStatic from '../assets/img/photo.png'
import storyImageStatic from '../assets/img/Container.png'
import galleryTopLeftStatic from '../assets/img/Image.png'
import galleryTopRightStatic from '../assets/img/Image1.png'
import galleryBottomStatic from '../assets/img/WithFallback.png'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRuntimeConfig, useAsyncData } from '#imports'
import { getWebsiteAbout } from '~/services/apout'

const { t } = useI18n()

// Fetch about content server-side to avoid CORS and use API-provided text/images when available
const { data: aboutData } = await useAsyncData('websiteAbout', () => getWebsiteAbout(), { server: true })
const apiBase = useRuntimeConfig().public.apiBaseUrl.replace(/\/$/, '')

const heroImage = computed(() => {
  const path = aboutData.value?.data?.section_one_images?.[0]
  return path ? `${apiBase}/${path}` : heroImageStatic
})

const storyImage = computed(() => {
  const path = aboutData.value?.data?.section_two_image_one
  return path ? `${apiBase}/${path}` : storyImageStatic
})

const galleryTopLeft = computed(() => {
  const path = aboutData.value?.data?.section_two_image_two
  return path ? `${apiBase}/${path}` : galleryTopLeftStatic
})

const galleryTopRight = computed(() => {
  const path = aboutData.value?.data?.section_two_image_three
  return path ? `${apiBase}/${path}` : galleryTopRightStatic
})

const galleryBottom = computed(() => {
  const path = aboutData.value?.data?.section_one_images?.[0]
  return path ? `${apiBase}/${path}` : galleryBottomStatic
})

const description = computed(() => aboutData.value?.data?.description || t('about.lead'))

const philosophyTitle = computed(() => aboutData.value?.data?.section_one_title || t('about.philosophyTitle'))
const philosophyText = computed(() => aboutData.value?.data?.section_one_description || t('about.philosophyText'))

const reasons = computed(() => {
  if (aboutData.value?.data) {
    const s1 = aboutData.value.data.section_two_description_one || ''
    const s2 = aboutData.value.data.section_two_description_two || ''
    const s3 = aboutData.value.data.section_two_description_three || ''
    const def = t('about.reasons') as any
    const parse = (s: string, fallback: any) => {
      const lines = s.split(/\r?\n/).filter(Boolean)
      return {
        number: fallback?.number || '',
        title: lines[0] || fallback?.title || '',
        text: lines.slice(1).join('\n') || fallback?.text || ''
      }
    }

    return [
      parse(s1, def?.[0] || { number: '01', title: '', text: '' }),
      parse(s2, def?.[1] || { number: '02', title: '', text: '' }),
      parse(s3, def?.[2] || { number: '03', title: '', text: '' })
    ]
  }
  return t('about.reasons')
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
  font-family: Georgia, 'Times New Roman', serif;
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
  font-family: Georgia, 'Times New Roman', serif;
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
