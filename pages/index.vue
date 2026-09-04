<template>
  <div class="home-page bg-white text-slate-900">
    <section class="hero-section">
      <div class="hero-image" :style="{ backgroundImage: 'url(' + imageRoutes.hero + ')' }"></div>
      <div class="hero-overlay"></div>
      <div class="hero-bottom-fade"></div>

      <div class="hero-content mx-auto max-w-6xl px-4 md:px-8">
        <p class="hero-chip">First in Saudi Arabia</p>
        <h1 class="hero-title">Creative Care</h1>
        <p class="hero-subtitle">Medical care with a creative touch, tailored just for you</p>
        <NuxtLink to="/book-evaluation" class="hero-button">BOOK EVALUATION</NuxtLink>
      </div>
    </section>

    <section class="technology-section py-20 md:py-24">
      <div class="mx-auto max-w-6xl px-4 md:px-8">
        <div class="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <h2 class="section-title mb-6">Technology in service of better care</h2>
            <p class="section-text max-w-xl">
              We invest in advanced tools not for their own sake, but because they lead to more accurate diagnoses, gentler
              treatments and better outcomes.
            </p>
          </div>

          <div class="tech-image-wrap">
            <img :src="imageRoutes.tech" alt="Modern treatment room"  />
          </div>
        </div>

        <div class="feature-grid mt-12">
          <article class="feature-item" v-for="feature in features" :key="feature.title">
            <component :is="feature.icon" class="feature-icon" aria-hidden="true" />
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="kingdom-section py-20 md:py-24">
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
        <img :src="imageRoutes.kingdom" alt="Rehabilitation system" class="rounded-[18px] shadow-[0_24px_55px_rgba(0,0,0,0.45)]" />

        <div>
          <h2 class="section-title mb-6">Only in the Kingdom of Saudi Arabia</h2>
          <p class="section-text mb-7">
            Our clinic proudly houses the most advanced physiotherapy machine available, one very first and only one of
            its kind in all of KSA.
          </p>

          <ul class="highlight-list mb-8">
            <li>
              <IconBolt class="highlight-icon" aria-hidden="true" />
              <span>Accelerated healing through smart biomechanical support and reduced strain.</span>
            </li>
            <li>
              <IconTargetArrow class="highlight-icon" aria-hidden="true" />
              <span>Enhanced therapeutic precision with real-time guided movement correction.</span>
            </li>
          </ul>

          <NuxtLink to="/services" class="hero-button">LEARN ABOUT OUR TECHNOLOGY</NuxtLink>
        </div>
      </div>
    </section>

    <section class="articles-section py-20 md:py-24">
      <div class="mx-auto max-w-6xl px-4 md:px-8">
        <div class="mb-8 flex items-end justify-between">
          <h2 class="section-title">Latest Articles</h2>
          <NuxtLink to="/blogs" class="view-all">View all</NuxtLink>
        </div>

        <div class="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article class="article-card article-card-large">
            <img :src="imageRoutes.articleMain" alt="Injury prevention" />
            <span class="article-tag article-tag-floating">Injury Prevention</span>
            <div class="article-overlay">
              <p class="article-date">TUESDAY - JANUARY 24 2026</p>
              <h3>How Physiotherapy Safely Speeds Up Healing</h3>
            </div>
          </article>

          <div class="space-y-5">
            <article class="article-mini" v-for="post in sidePosts" :key="post.title">
              <img :src="post.image" :alt="post.tag" />
              <div>
                <span class="article-tag">{{ post.tag }}</span>
                <p class="article-date">TUESDAY - JANUARY 24 2026</p>
                <h3>{{ post.title }}</h3>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="contact-cta py-20 md:py-24">
      <div class="cta-bg" :style="{ backgroundImage: 'url(' + imageRoutes.cta + ')' }"></div>
      <div class="cta-overlay"></div>
      <div class="flex w-full justify-end px-4 md:px-8 lg:px-12">
        <form class="cta-form" @submit.prevent>
          <h3 class="py-3">Ready to Start Your Recovery Journey?</h3>
          <div class="grid gap-4 md:grid-cols-2">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div class="mt-3 grid gap-4 md:grid-cols-[90px_1fr]">
            <input type="text" placeholder="+20" />
            <input type="tel" placeholder="Phone Number" />
          </div>
          <textarea rows="4" placeholder="Message"></textarea>
          <button type="submit">BOOK YOUR FREE EVALUATION</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import heroImg from '../assets/img/Headenglish.png'
import techImg from '../assets/img/Container.png'
import kingdomImg from '../assets/img/WithFallback.png'
import articleMainImg from '../assets/img/background-paint.png'
import articleMobilityImg from '../assets/img/Image.png'
import articleStrengthImg from '../assets/img/Image1.png'
import ctaImg from '../assets/img/Section1.png'

import {
  IconBolt,
  IconBrain,
  IconFingerprintScan,
  IconPrinter,
  IconRulerMeasure,
  IconScan,
  IconScanEye,
  IconTargetArrow
} from '@tabler/icons-vue'

const imageRoutes = {
  hero: heroImg,
  tech: techImg,
  kingdom: kingdomImg,
  articleMain: articleMainImg,
  articleMobility: articleMobilityImg,
  articleStrength: articleStrengthImg,
  cta: ctaImg
}

const features = [
  {
    title: 'CBCT Imaging',
    text: '3D views of your teeth, jaw and bone structure to support precise treatment planning.',
    icon: IconScanEye
  },
  {
    title: 'Cephalometric Analysis',
    text: 'Advanced imaging technique providing detailed craniofacial measurements and treatment mapping.',
    icon: IconRulerMeasure
  },
  {
    title: 'Digital Impressions',
    text: 'Digital impressions of your teeth for accurate and comfortable custom aligner creation.',
    icon: IconFingerprintScan
  },
  {
    title: 'Intraoral Scanning',
    text: 'Instant imaging with enhanced resolution and no need for traditional impression trays.',
    icon: IconScan
  },
  {
    title: '3D Printing',
    text: 'Computer-guided model and appliance fabrication for consistency, speed, and customization.',
    icon: IconPrinter
  },
  {
    title: 'AI-Guided Planning',
    text: 'Data-assisted clinical planning to improve treatment personalization and predictability.',
    icon: IconBrain
  }
]

const sidePosts = [
  {
    tag: 'Mobility',
    title: 'The Path to Recovery: Evidence-Based Approaches in Modern Physiotherapy',
    image: imageRoutes.articleMobility
  },
  {
    tag: 'Strength',
    title: 'This Pain Is Temporary: Science-Backed Progressions for Lasting Relief',
    image: imageRoutes.articleStrength
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Playfair+Display:wght@700;800&display=swap');

.home-page {
  font-family: 'Manrope', sans-serif;
  background: #ffffff;
  color: #1a252a;
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
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff 88%);
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
  font-family: 'Playfair Display', serif;
}

.hero-title {
  font-size: clamp(2.2rem, 6vw, 4rem);
  line-height: 1.05;
  margin: 0;
  color: #ffffff;
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
    radial-gradient(circle at 18% 14%, rgba(52, 219, 207, 0.14), transparent 42%),
    radial-gradient(circle at 82% 88%, rgba(72, 170, 240, 0.1), transparent 40%),
    #f8fcfc;
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.1;
}

.section-text {
  color: #5a6b72;
  line-height: 1.6;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 24px;
}

.feature-icon,
.highlight-icon {
  display: inline-flex;
  width: 28px;
  height: 28px;
  color: #5ef0e2;
  stroke-width: 2;
  filter: drop-shadow(0 0 10px rgba(56, 216, 204, 0.14));
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
  color: #182328;
}

.feature-item p {
  color: #5f7178;
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
  background: #ffffff;
}

.highlight-list {
  display: grid;
  gap: 15px;
}

.highlight-list li {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 13px;
  align-items: center;
  color: #4f6067;
}

.view-all {
  color: #64767c;
  font-size: 0.9rem;
  transition: color 160ms ease;
}

.view-all:hover {
  color: #243137;
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

.article-tag-floating {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  background: #0367d8;
  color: #dcecff;
  border: 1px solid rgba(154, 198, 255, 0.45);
  border-radius: 999px;
  padding: 6px 10px;
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
  color: #ffffff;
}

.article-mini {
  display: grid;
  grid-template-columns: 150px 1fr;
  background: #ffffff;
  border: 1px solid #dbe6e8;
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
  color: #233238;
}

.contact-cta {
  position: relative;
  min-height: 550px;
  display: flex;
  align-items: flex-end;
  background: #ffffff;
}

.cta-overlay {
  background: linear-gradient(95deg, rgba(10, 17, 22, 0.18) 8%, rgba(240, 245, 247, 0.62) 100%);
}

.cta-form {
  position: relative;
  z-index: 1;
  margin-left: 0;
  margin-right: -8px;
  width: min(100%, 370px);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(4px);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 14px 44px rgba(0, 0, 0, 0.24);
}

.cta-form h2 {
  color: #1d2a2a;
  font-size: clamp(1.1rem, 2.1vw, 1.4rem);
  margin-bottom: 10px;
}

.cta-form input,
.cta-form textarea {
  width: 100%;
  border: 1px solid #d7e0e1;
  border-radius: 4px;
  padding: 8px 10px;
  font-size: 0.82rem;
  color: #273637;
  background: rgba(255, 255, 255, 0.9);
}

.cta-form textarea {
  margin-top: 10px;
  resize: vertical;
}

.cta-form button {
  width: 100%;
  margin-top: 12px;
  min-height: 40px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(90deg, #2ac4b8, #1f9f97);
  color: white;
  font-weight: 700;
  font-size: 0.74rem;
  letter-spacing: 0.02em;
}

@media (min-width: 760px) {
  .feature-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
  .contact-cta {
    align-items: center;
  }

  .cta-form {
    margin-right: 0;
    width: min(100%, 400px);
  }

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
