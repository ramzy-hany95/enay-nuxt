<template>
  <div v-if="service" class="service-details">
    <section class="service-details__hero">
      <div class="service-details__hero-image" :style="{ backgroundImage: `url(${service.imageUrl})` }"></div>
      <div class="service-details__hero-fade"></div>
      <div class="mx-auto flex min-h-[300px] max-w-6xl items-end px-4 pb-6 md:min-h-[420px] md:px-8 md:pb-8">
        <h1>{{ service.title }}</h1>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
      <div class="service-content-block">
        <h2>Overview</h2>
        <p v-for="paragraph in service.overview" :key="paragraph">{{ paragraph }}</p>
      </div>

      <div class="service-two-col">
        <div class="service-content-block">
          <h2>Who is this for</h2>
          <div class="service-bullets service-bullets--two">
            <div v-for="item in service.audience" :key="item" class="service-bullet service-bullet--line">
              <span class="service-bullet__icon"></span>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="service-content-block service-content-block--full-row">
        <h2>Expected Outcomes</h2>
        <div class="service-bullets service-bullets--two">
          <div v-for="item in service.outcomes" :key="item" class="service-bullet">
            <span class="service-bullet__dot"></span>
            <span>{{ item }}</span>
          </div>
        </div>
      </div>

      <div class="duration-card">
        <div class="duration-card__label">
          <span class="duration-card__icon"></span>
          <span>Treatment duration</span>
        </div>
        <h3>{{ service.duration }}</h3>
        <p>{{ service.durationNote }}</p>
      </div>
    </section>

    <section class="faq-section">
      <div class="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
        <h2>Frequently Asked Questions</h2>
        <p class="faq-section__intro">Everything you need to know before your first visit</p>

        <div class="faq-list">
          <details v-for="(item, index) in faqItems" :key="item.question" class="faq-item" :open="index === 0">
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

  <div v-else class="mx-auto max-w-4xl px-4 py-16 md:px-8">
    <h1>Service not found</h1>
    <NuxtLink to="/services" class="service-back">Return to services</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { serviceItems } from '~/data/services'

const route = useRoute()
const imageModules = import.meta.glob('~/assets/img/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const service = computed(() => {
  const item = serviceItems.find((entry) => entry.id === route.params.id)

  if (!item) {
    return null
  }

  return {
    ...item,
    imageUrl: imageModules[`/assets/img/${item.image}`] || imageModules['/assets/img/background-paint.png']
  }
})

const faqItems = [
  {
    question: 'What should I expect during my initial assessment?',
    answer:
      'Your first session focuses on evaluation, symptom analysis, and identifying the right treatment direction for your condition and movement goals.'
  },
  {
    question: 'How will my treatment plan be developed?',
    answer:
      'Your plan is built around your assessment findings, daily function, physical capacity, and the specific service pathway most relevant to your recovery.'
  },
  {
    question: 'What types of treatments can I expect?',
    answer:
      'Treatment may include manual care, guided exercise, therapeutic technology, functional re-training, or targeted education depending on the service.'
  },
  {
    question: 'How often will I need to attend sessions?',
    answer:
      'The number of sessions depends on your condition, goals, and rate of improvement. Your therapist will define this after the first evaluation.'
  },
  {
    question: 'What is the role of home exercises in my recovery?',
    answer:
      'Home exercises help carry clinical progress into daily life, improve consistency, and often make your recovery more efficient.'
  }
]
</script>

<style scoped>
.service-details {
  background: #ffffff;
  color: #142229;
}

.service-details__hero {
  position: relative;
  overflow: hidden;
}

.service-details__hero-image,
.service-details__hero-fade {
  position: absolute;
  inset: 0;
}

.service-details__hero-image {
  background-size: cover;
  background-position: center;
}

.service-details__hero-fade {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 42%, rgba(255, 255, 255, 0.98) 100%);
}

.service-details__hero h1,
.service-content-block h2,
.faq-section h2 {
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
}

.service-details__hero h1 {
  font-size: clamp(2.4rem, 4vw, 3.8rem);
  line-height: 1.05;
  color: #131313;
}

.service-content-block {
  margin-bottom: 34px;
}

.service-content-block--full-row {
  margin-top: 4px;
}

.service-content-block h2 {
  margin-bottom: 14px;
  color: #178073;
  font-size: 0.95rem;
  font-family: Manrope, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.service-content-block p {
  margin: 0 0 12px;
  color: #5c6d73;
  line-height: 1.8;
}

.service-two-col {
  display: grid;
  gap: 30px;
}

.service-bullets {
  display: grid;
  gap: 18px;
}

.service-bullets--two {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.service-bullet {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #5c6d73;
}

.service-bullet--line {
  padding-left: 12px;
  border-left: 2px solid #178073;
}

.service-bullet__icon {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #7d8b90;
  flex: 0 0 auto;
}

.service-bullet__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #2d8a7c;
  flex: 0 0 auto;
}

.duration-card {
  margin-top: 36px;
  border-radius: 12px;
  background: #2b7768;
  padding: 26px 22px;
}

.duration-card__label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #f0fbf8;
  font-size: 0.86rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.duration-card__icon {
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 2px solid #f0fbf8;
  display: inline-block;
  position: relative;
}

.duration-card__icon::before,
.duration-card__icon::after {
  content: '';
  position: absolute;
  background: #f0fbf8;
  left: 50%;
  top: 50%;
  transform-origin: left top;
}

.duration-card__icon::before {
  width: 1.5px;
  height: 4px;
  transform: translate(-50%, -95%);
}

.duration-card__icon::after {
  width: 4px;
  height: 1.5px;
  transform: translate(0%, -50%);
}

.duration-card h3 {
  margin: 16px 0 0;
  color: #ffffff;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
}

.duration-card p {
  margin: 12px 0 0;
  color: #dceee9;
  line-height: 1.7;
}

.faq-section {
  background: #ffffff;
  color: #142229;
}

.faq-section h2 {
  font-size: clamp(2rem, 4vw, 3.6rem);
  line-height: 1.08;
  color: #131313;
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
  max-width: 760px;
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

.service-back {
  color: #178073;
  font-weight: 700;
}

@media (min-width: 900px) {
  .service-two-col {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .service-bullets--two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>