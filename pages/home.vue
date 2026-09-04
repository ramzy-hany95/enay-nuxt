<template>
  <div class="home-page bg-black text-white">
    <section class="hero-section">
      <div class="hero-image"></div>
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
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <div>
          <h2 class="section-title mb-6">Technology in service of better care</h2>
          <p class="section-text mb-10 max-w-xl">
            We invest in advanced tools not for their own sake, but because they lead to more accurate diagnoses, gentler
            treatments and better outcomes.
          </p>

          <div class="feature-grid">
            <article class="feature-item" v-for="feature in features" :key="feature.title">
              <component :is="feature.icon" class="feature-icon" aria-hidden="true" />
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.text }}</p>
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
          <h2 class="section-title mb-6">Only in the Kingdom of Saudi Arabia</h2>
          <p class="section-text mb-7">
            Our clinic proudly houses the most advanced physiotherapy machine available, one very first and only one of
            its kind in all of KSA.
          </p>

          <ul class="highlight-list mb-8">
            <li v-for="item in highlights" :key="item.text">
              <component :is="item.icon" class="highlight-icon" aria-hidden="true" />
              <span>{{ item.text }}</span>
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
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1300&q=80"
              alt="Injury prevention"
            />
            <div class="article-overlay">
              <span class="article-tag">Injury Prevention</span>
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
      <div class="cta-bg"></div>
      <div class="cta-overlay"></div>
      <div class="mx-auto max-w-6xl px-4 md:px-8">
        <form class="cta-form" @submit.prevent>
          <h2>Ready to Start Your Recovery Journey?</h2>
          <div class="grid gap-3 md:grid-cols-2">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div class="grid gap-3 md:grid-cols-[90px_1fr]">
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
import {
  IconBolt,
  IconBrain,
  IconFingerprint,
  IconFingerprintScan,
  IconPrinter,
  IconRulerMeasure,
  IconScan,
  IconScanEye,
  IconTargetArrow,
  IconZoomScan
} from '@tabler/icons-vue'

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

const highlights = [
  {
    text: 'Accelerated healing through smart biomechanical support and reduced strain.',
    icon: IconBolt
  },
  {
    text: 'Enhanced therapeutic precision with real-time guided movement correction.',
    icon: IconTargetArrow
  }
]

const sidePosts = [
  {
    tag: 'Mobility',
    title: 'The Path to Recovery: Evidence-Based Approaches in Modern Physiotherapy',
    image: 'https://images.unsplash.com/photo-1576671414121-aa0c81c869bd?auto=format&fit=crop&w=700&q=80'
  },
  {
    tag: 'Strength',
    title: 'This Pain Is Temporary: Science-Backed Progressions for Lasting Relief',
    image: 'https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&w=700&q=80'
  }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Playfair+Display:wght@700;800&display=swap');

.home-page {
  font-family: 'Manrope', sans-serif;
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
  font-family: 'Playfair Display', serif;
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
