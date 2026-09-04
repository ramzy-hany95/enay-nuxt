<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="about-hero__image" :style="{ backgroundImage: `url(${heroImage})` }"></div>
      <div class="about-hero__overlay"></div>
      <div class="about-hero__fade"></div>

      <div class="mx-auto flex min-h-[360px] max-w-6xl items-end px-4 pb-6 md:min-h-[460px] md:px-8 md:pb-8">
        <div class="about-hero__content">
          <h1>About us</h1>
          <p>
            Welcome to Mobdaoon Physiotherapy Clinic, where advanced clinical expertise meets a deeply personalized
            approach to movement and recovery.
          </p>
        </div>
      </div>
    </section>

    <section class="about-story py-16 md:py-24">
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <img :src="storyImage" alt="Physiotherapy support"  />

        <div class="about-copy">
          <h2>Our Philosophy</h2>
          <p>
            We believe in structured care, evidence-based rehabilitation, and treatment plans tailored to the patient.
            Our goal is to restore strength, mobility, and confidence through precise and compassionate support.
          </p>
        </div>
      </div>
    </section>

    <section class="about-choose py-10 md:py-16">
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div class="about-reasons">
          <h2>Why Choose Mobdaoon clinic</h2>

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
            <img :src="galleryTopLeft" alt="Athlete starting position" />
            <img :src="galleryTopRight" alt="Athlete starting position" />
          </div>
          <img :src="galleryBottom" alt="Treatment support" class="about-gallery__bottom" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import heroImage from '../assets/img/photo.png'
import storyImage from '../assets/img/Container.png'
import galleryTopLeft from '../assets/img/Image.png'
import galleryTopRight from '../assets/img/Image1.png'
import galleryBottom from '../assets/img/WithFallback.png'

const reasons = [
  {
    number: '01',
    title: 'Evidence-Based, Personalized Care',
    text: 'Every rehabilitation plan is custom-built around your specific body mechanics, lifestyle, and recovery goals.'
  },
  {
    number: '02',
    title: 'Highly Skilled Specialists',
    text: 'Our dedicated team brings advanced expertise across physical therapy disciplines for precise care at every stage.'
  },
  {
    number: '03',
    title: 'Advanced Recovery Methods',
    text: 'We combine modern techniques and clinical insight to support efficient, comfortable, and lasting outcomes.'
  }
]
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
