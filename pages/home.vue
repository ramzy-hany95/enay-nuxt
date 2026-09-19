<template>
  <div class="home-page bg-black text-white">
    <section class="hero-section">
      <div class="hero-image" :style="{ backgroundImage: `url(${heroImage})` }"></div>
      <div class="hero-overlay"></div>
      <div class="hero-bottom-fade"></div>

      <div class="hero-content mx-auto max-w-6xl px-4 md:px-8">
        <p class="hero-chip">{{ content?.hero_sub_description || $t('home.hero.chip') }}</p>
        <h1 class="hero-title">{{ content?.hero_title || $t('home.hero.title') }}</h1>
        <p class="hero-subtitle">{{ content?.hero_description || $t('home.hero.subtitle') }}</p>
        <NuxtLink :to="homeButtonHref(content?.hero_button_href, '/book-evaluation')" class="hero-button">{{ content?.hero_button_text || $t('home.hero.cta') }}</NuxtLink>
      </div>
    </section>

    <section class="technology-section py-20 md:py-24">
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div>
          <h2 class="section-title mb-6">{{ content?.features_title || $t('home.tech.title') }}</h2>
          <p class="section-text mb-10 max-w-xl">{{ content?.features_description || $t('home.tech.text') }}</p>

          <div v-if="features.length" class="feature-grid">
            <article class="feature-item" v-for="feature in features" :key="feature.id ?? feature.title">
              <IconScanEye class="feature-icon" aria-hidden="true" />
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </article>
          </div>
        </div>

        <div class="tech-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1200&q=80"
            alt="Modern treatment room"
            class="tech-image"
          />
        </div>
      </div>
    </section>

    <section class="kingdom-section py-20 md:py-24">
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
        <img
          src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80"
          alt="Rehabilitation system"
          class="rounded-[18px] shadow-[0_24px_55px_rgba(0,0,0,0.45)]"
        />

        <div>
          <h2 class="section-title mb-6">{{ content?.cta_title || $t('home.kingdom.title') }}</h2>
          <p class="section-text mb-7">{{ content?.cta_description || $t('home.kingdom.text') }}</p>

          <ul class="highlight-list mb-8">
            <li v-for="item in highlights" :key="item.text">
              <component :is="item.icon" class="highlight-icon" aria-hidden="true" />
              <span>{{ item.text }}</span>
            </li>
          </ul>

          <NuxtLink :to="homeButtonHref(content?.cta_button_href, '/services')" class="hero-button">{{ content?.cta_button_text || $t('home.kingdom.learn') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section class="articles-section py-20 md:py-24">
      <div class="mx-auto max-w-6xl px-4 md:px-8">
        <div class="mb-8 flex items-end justify-between">
          <h2 class="section-title">{{ $t('home.articles.latest') }}</h2>
          <NuxtLink to="/blogs" class="view-all">{{ $t('home.articles.viewAll') }}</NuxtLink>
        </div>

        <p v-if="status === 'pending' || status === 'idle'" role="status">{{ $t('home.loading') }}</p>
        <div v-else-if="error" role="alert">
          <p>{{ $t('home.loadError') }}</p>
          <button type="button" class="view-all" @click="refresh()">{{ $t('home.retry') }}</button>
        </div>
        <p v-else-if="!mainPost">{{ $t('blog.empty') }}</p>
        <div v-else class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <NuxtLink :to="`/blogs/${encodeURIComponent(mainPost.slug)}`" class="article-card article-card-large">
            <img :src="blogImage(mainPost.image)" :alt="mainPost.title" />
            <div class="article-overlay">
              <span v-if="mainPost.category" class="article-tag">{{ mainPost.category.name }}</span>
              <p class="article-date">{{ blogDate(mainPost.published_at) }}</p>
              <h3>{{ mainPost.title }}</h3>
            </div>
          </NuxtLink>
          <div class="space-y-5">
            <NuxtLink v-for="post in sidePosts" :key="post.id" :to="`/blogs/${encodeURIComponent(post.slug)}`" class="article-mini">
              <img :src="blogImage(post.image)" :alt="post.title" />
              <div>
                <span v-if="post.category" class="article-tag">{{ post.category.name }}</span>
                <p class="article-date">{{ blogDate(post.published_at) }}</p>
                <h3>{{ post.title }}</h3>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-cta py-20 md:py-24">
      <div class="cta-bg"></div>
      <div class="cta-overlay"></div>
      <div class="mx-auto max-w-6xl px-4 md:px-8">
        <form class="cta-form" @submit.prevent>
          <h2>{{ $t('home.contactCta.title') }}</h2>
          <div class="grid gap-3 md:grid-cols-2">
            <input type="text" :placeholder="$t('home.contactCta.firstName')" />
            <input type="text" :placeholder="$t('home.contactCta.lastName')" />
          </div>
          <div class="grid gap-3 md:grid-cols-[90px_1fr]">
            <input type="text" :placeholder="$t('home.contactCta.countryCode')" />
            <input type="tel" :placeholder="$t('home.contactCta.phone')" />
          </div>
          <textarea rows="4" :placeholder="$t('home.contactCta.message')"></textarea>
          <button type="submit">{{ $t('home.contactCta.submit') }}</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import heroImg from '~/assets/img/Headenglish.png'
import techImg from '~/assets/img/Container.png'
import kingdomImg from '~/assets/img/WithFallback.png'
import ctaImg from '~/assets/img/Section1.png'
import { IconBolt, IconScanEye, IconTargetArrow } from '@tabler/icons-vue'
import { useI18n } from 'vue-i18n'
import { homeButtonHref } from '~/composables/useWebsiteHome'

const { t } = useI18n()
const { blogImage, blogDate } = useBlogPresentation()
const imageRoutes = { tech: techImg, kingdom: kingdomImg, cta: ctaImg }
const { data: home, status, error, refresh } = await useWebsiteHome()
const content = computed(() => home.value?.content)
const heroImage = computed(() => content.value?.hero_banner ? blogImage(content.value.hero_banner) : heroImg)
const features = computed(() => home.value?.features?.filter(feature => feature.title) || [])
const mainPost = computed(() => home.value?.latest_blogs?.[0])
const sidePosts = computed(() => home.value?.latest_blogs?.slice(1) || [])

function ctaIcon(name: string | undefined, fallback: typeof IconBolt) {
  if (name === 'icon1') return IconBolt
  if (name === 'icon2') return IconTargetArrow
  return fallback
}
const highlights = computed(() => [
  { text: content.value?.cta_first_title || t('home.kingdom.highlight1'), icon: ctaIcon(content.value?.cta_first_icon, IconBolt) },
  { text: content.value?.cta_second_title || t('home.kingdom.highlight2'), icon: ctaIcon(content.value?.cta_second_icon, IconTargetArrow) }
])
</script>

<style scoped>

.home-page {
  font-family: var(--font-body);
  background: #040608;
  color: #eef5f5;
}

.hero-section {
  position: relative;
  min-height: 620px;
  display: flex;
  align-items: flex-end;
  isolation: isolate;
}

.hero-image,
.cta-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.hero-image {
  background-image: url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1800&q=80');
}

.hero-overlay,
.cta-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(102deg, rgba(6, 36, 39, 0.76) 0%, rgba(9, 21, 28, 0.42) 47%, rgba(7, 7, 7, 0.58) 100%);
}

.hero-bottom-fade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 185px;
  background: linear-gradient(to bottom, rgba(7, 14, 18, 0), #040608 88%);
}

.hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding-bottom: 84px;
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  line-height: 1;
  letter-spacing: 0.06em;
  color: #d3e4e5;
  background: rgba(213, 244, 244, 0.16);
  border: 1px solid rgba(205, 233, 237, 0.35);
  padding: 8px 10px;
  border-radius: 999px;
  margin-bottom: 16px;
}

.hero-chip::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: #74ecdd;
}

.hero-title,
.section-title,
.cta-form h2 {
  font-family: var(--font-heading);
}

.hero-title {
  font-size: clamp(2.2rem, 6vw, 4rem);
  line-height: 1.05;
  margin: 0;
}

.hero-subtitle {
  margin-top: 14px;
  max-width: 38ch;
  color: #deecec;
  font-size: 1.05rem;
  line-height: 1.45;
}

.hero-button {
  display: inline-flex;
  margin-top: 26px;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 22px;
  border-radius: 999px;
  background: linear-gradient(90deg, #2ac4b8, #1f9f97);
  color: #f4f9f9;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  font-weight: 700;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.hero-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 9px 24px rgba(34, 181, 168, 0.35);
}

.technology-section {
  position: relative;
  background:
    radial-gradient(circle at 18% 14%, rgba(52, 219, 207, 0.16), transparent 42%),
    radial-gradient(circle at 82% 88%, rgba(72, 170, 240, 0.11), transparent 40%),
    #050a0d;
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.1;
}

.section-text {
  color: #adbbbf;
  line-height: 1.6;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 24px;
}

.feature-item {
  position: relative;
  min-width: 0;
  padding: 28px 24px;
  border-radius: 20px;
  overflow: hidden;
  transition: background-color 240ms ease;
}

.feature-item::before {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #008577;
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 320ms ease;
}

.feature-item .feature-icon {
  box-sizing: content-box;
  padding: 12px;
  border-radius: 16px;
  transition: color 240ms ease, background-color 240ms ease;
}

.feature-item h3,
.feature-item p {
  transition: color 240ms ease;
}

@media (hover: hover) {
  .feature-item:hover {
    background-color: #eaf2f1;
  }

  .feature-item:hover::before {
    transform: scaleY(1);
  }

  .feature-item:hover .feature-icon {
    color: #008577;
    background-color: #d4e6e4;
    filter: none;
  }

  .feature-item:hover h3 {
    color: #182328;
  }

  .feature-item:hover p {
    color: #62696d;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-item,
  .feature-item::before,
  .feature-item .feature-icon,
  .feature-item h3,
  .feature-item p {
    transition: none;
  }
}

.feature-icon,
.highlight-icon {
  display: inline-flex;
  width: 28px;
  height: 28px;
  color: #5ef0e2;
  stroke-width: 2;
  filter: drop-shadow(0 0 10px rgba(56, 216, 204, 0.22));
}

.feature-icon svg,
.highlight-icon svg {
  width: 28px;
  height: 28px;
  stroke: currentColor;
  fill: none;
  display: block;
}

.feature-item h3 {
  margin-top: 13px;
  margin-bottom: 9px;
  font-weight: 700;
  font-size: 1rem;
  color: #e6f1f1;
}

.feature-item p {
  color: #a6b5ba;
  line-height: 1.5;
  font-size: 0.95rem;
}

.tech-image-wrap {
  padding-top: 42px;
}

.tech-image {
  border-radius: 15px;
  border: 1px solid rgba(229, 249, 248, 0.18);
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.52);
}

.kingdom-section,
.articles-section {
  background: #060709;
}

.highlight-list {
  display: grid;
  gap: 15px;
  list-style: none;
  padding-left: 0;
}

.highlight-list li {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 13px;
  align-items: center;
  color: #c8d5d8;
}

.view-all {
  color: #afbbbf;
  font-size: 0.9rem;
  transition: color 160ms ease;
}

.view-all:hover {
  color: #f0fcfc;
}

.article-card,
.article-mini {
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.article-card-large {
  min-height: 430px;
}

.article-card-large > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-overlay {
  position: absolute;
  inset: auto 0 0;
  padding: 22px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0));
}

.article-tag {
  color: #7cbaff;
  font-size: 0.76rem;
  font-weight: 700;
}

.article-date {
  margin-top: 10px;
  color: #d3d9dd;
  font-size: 0.72rem;
  letter-spacing: 0.03em;
}

.article-overlay h3 {
  margin-top: 8px;
  font-size: 1.6rem;
  line-height: 1.2;
  max-width: 24ch;
}

.article-mini {
  display: grid;
  grid-template-columns: 150px 1fr;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.article-mini img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 170px;
}

.article-mini > div {
  padding: 18px 18px 14px;
}

.article-mini h3 {
  margin-top: 10px;
  font-size: 1.15rem;
  line-height: 1.3;
  color: #dce5e7;
}

.contact-cta {
  position: relative;
  min-height: 550px;
  display: flex;
  align-items: center;
}

.cta-bg {
  background-image: url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1800&q=80');
}

.cta-overlay {
  background: linear-gradient(95deg, rgba(10, 17, 22, 0.18) 8%, rgba(240, 245, 247, 0.62) 100%);
}

.cta-form {
  position: relative;
  z-index: 1;
  margin-left: auto;
  width: min(100%, 540px);
  background: rgba(252, 252, 252, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(4px);
  border-radius: 12px;
  padding: 26px;
  box-shadow: 0 14px 44px rgba(0, 0, 0, 0.24);
}

.cta-form h2 {
  color: #1d2a2a;
  font-size: clamp(1.45rem, 2.6vw, 2rem);
  margin-bottom: 14px;
}

.cta-form input,
.cta-form textarea {
  width: 100%;
  border: 1px solid #d7e0e1;
  border-radius: 4px;
  padding: 10px 11px;
  font-size: 0.92rem;
  color: #273637;
  background: rgba(255, 255, 255, 0.9);
}

.cta-form textarea {
  margin-top: 12px;
  resize: vertical;
}

.cta-form button {
  width: 100%;
  margin-top: 16px;
  min-height: 46px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, #2ac4b8, #1f9f97);
  color: white;
  font-weight: 700;
  letter-spacing: 0.03em;
}

@media (min-width: 760px) {
  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1024px) {
  .tech-image-wrap {
    padding-top: 0;
  }

  .contact-cta {
    min-height: 620px;
  }
}

@media (max-width: 767px) {
  .hero-content {
    padding-bottom: 54px;
  }

  .article-card-large {
    min-height: 345px;
  }

  .article-mini {
    grid-template-columns: 1fr;
  }

  .article-mini img {
    min-height: 220px;
  }

  .cta-form {
    padding: 20px;
  }
}
</style>
