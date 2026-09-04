<template>
  <div class="services-page">
    <section class="services-hero">
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:px-8 md:py-16 lg:grid-cols-[260px_1fr] lg:items-start">
        <h1>Our Services</h1>
        <p>
          Experience bespoke physical therapy designed to restore function, eliminate pain, and optimize human movement.
          Our dedicated approach ensures you recover with confidence, reclaim your daily lifestyle, and achieve sustainable,
          long-term wellness.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
      <div class="services-grid">
        <NuxtLink v-for="service in services" :key="service.id" :to="`/services/${service.id}`" class="service-card">
          <img :src="service.imageUrl" :alt="service.title" class="service-card__image" />
          <div class="service-card__body">
            <h2>{{ service.title }}</h2>
            <p>{{ service.shortDescription }}</p>
          </div>
        </NuxtLink>
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
</template>

<script setup lang="ts">
import { serviceItems } from '~/data/services'

const imageModules = import.meta.glob('~/assets/img/*', {
  eager: true,
  import: 'default'
}) as Record<string, string>

const services = serviceItems.map((service) => ({
  ...service,
  imageUrl: imageModules[`/assets/img/${service.image}`] || imageModules['/assets/img/background-paint.png']
}))

const faqItems = [
  {
    question: 'What should I expect during my initial assessment?',
    answer:
      'Your first visit includes a full diagnostic session focused on movement analysis, symptom triggers, and practical recovery planning tailored to your condition.'
  },
  {
    question: 'How will my treatment plan be developed?',
    answer:
      'We create your treatment plan around your clinical assessment, goals, daily demands, and how your body responds to therapy over time.'
  },
  {
    question: 'What types of treatments can I expect?',
    answer:
      'Depending on the service, your care may include manual therapy, guided exercise, neuromuscular re-education, pain management, or technology-assisted rehabilitation.'
  },
  {
    question: 'How often will I need to attend sessions?',
    answer:
      'Session frequency varies depending on severity, service type, and recovery goals. Your therapist will recommend a schedule after the initial evaluation.'
  },
  {
    question: 'What is the role of home exercises in my recovery?',
    answer:
      'Home exercises help reinforce clinical progress, improve consistency between sessions, and support long-term recovery results.'
  }
]
</script>

<style scoped>
.services-page {
  background: #ffffff;
  color: #142229;
}

.services-hero h1,
.faq-section h2 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
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
  gap: 22px;
}

.service-card {
  overflow: hidden;
  border-radius: 14px;
  border: 1px solid #d8e4e1;
  background: #ffffff;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.service-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.26);
}

.service-card__image {
  width: 100%;
  aspect-ratio: 1 / 0.92;
  object-fit: cover;
  display: block;
}

.service-card__body {
  padding: 14px 12px 16px;
}

.service-card__body h2 {
  margin: 0;
  color: #1b1b1b;
  font-family: Georgia, 'Times New Roman', serif;
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
</style>