<template>
  <div class="contact-page bg-white text-slate-900">
    <section class="contact-hero">
      <div class="contact-hero__image" :style="{ backgroundImage: `url(${heroImage})` }"></div>
      <div class="contact-hero__overlay"></div>
      <div class="contact-hero__fade"></div>

      <div class="mx-auto flex min-h-[360px] max-w-6xl items-end px-4 pb-6 md:min-h-[460px] md:px-8 md:pb-8">
        <div class="contact-hero__content">
          <h1>Visit us</h1>
          <p>Experience modern Physiotherapy focused on precision, comfort, and long-lasting results.</p>
        </div>
      </div>
    </section>

    <section class="contact-details py-16 md:py-20">
      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div class="contact-info">
          <div class="contact-info__item" v-for="item in infoItems" :key="item.label">
            <component :is="item.icon" class="contact-info__icon" aria-hidden="true" />
            <div>
              <p class="contact-info__label">{{ item.label }}</p>
              <p class="contact-info__value">{{ item.value }}</p>
            </div>
          </div>
        </div>

        <div class="contact-map">
          <iframe
            title="Clinic map"
            src="https://www.google.com/maps?q=Saudi%20Arabia&z=12&output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>

    <section class="contact-socials pb-12 md:pb-14">
      <div class="mx-auto flex max-w-6xl flex-wrap justify-center gap-3 px-4 md:px-8">
        <a v-for="social in socials" :key="social.label" href="#" class="social-pill" :aria-label="social.label">
          <component :is="social.icon" class="social-pill__icon" aria-hidden="true" />
          <span>{{ social.label }}</span>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandSnapchat,
  IconBrandTelegram,
  IconBrandTiktok,
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone
} from '@tabler/icons-vue'
import heroImage from '../assets/img/photo.png'

const infoItems = [
  { label: 'ADDRESS', value: 'Saudi Arabia', icon: IconMapPin },
  { label: 'PHONE NUMBER', value: '(415) 857-01230', icon: IconPhone },
  { label: 'EMAIL', value: 'Mobdaoon@clinic.com', icon: IconMail },
  { label: 'HOURS', value: 'Mon, Tue, Fri — 8 am—5 pm', icon: IconClock }
]

const socials = [
  { label: 'Instagram', icon: IconBrandInstagram },
  { label: 'Telegram', icon: IconBrandTelegram },
  { label: 'Snapchat', icon: IconBrandSnapchat },
  { label: 'Tiktok', icon: IconBrandTiktok },
  { label: 'Facebook', icon: IconBrandFacebook },
  { label: 'Linkedin', icon: IconBrandLinkedin }
]
</script>

<style scoped>
.contact-page {
  background: #ffffff;
  color: #12222a;
}

.contact-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

.contact-hero__image,
.contact-hero__overlay,
.contact-hero__fade {
  position: absolute;
  inset: 0;
}

.contact-hero__image {
  background-size: cover;
  background-position: center;
  transform: scale(1.01);
}

.contact-hero__overlay {
  background: linear-gradient(180deg, rgba(0, 8, 20, 0.4) 0%, rgba(0, 8, 20, 0.15) 40%, rgba(255, 255, 255, 0) 100%);
}

.contact-hero__fade {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 58%, rgba(255, 255, 255, 0.98) 100%);
}

.contact-hero__content {
  position: relative;
  z-index: 1;
  margin: 0 auto;
  width: fit-content;
  text-align: center;
}

.contact-hero__content h1 {
  margin: 0;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(2.2rem, 4vw, 3.6rem);
  font-weight: 700;
  color: #162026;
}

.contact-hero__content p {
  margin: 10px auto 0;
  max-width: 56ch;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #5d6b72;
}

.contact-info {
  display: grid;
  gap: 22px;
}

.contact-info__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.contact-info__icon {
  width: 18px;
  height: 18px;
  margin-top: 3px;
  color: #1c7f71;
  flex: 0 0 auto;
}

.contact-info__label {
  margin: 0 0 3px;
  color: #1b7f70;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.contact-info__value {
  margin: 0;
  color: #4f5d64;
  font-size: 1rem;
  line-height: 1.45;
}

.contact-map {
  overflow: hidden;
  border-radius: 10px;
  background: #f4f6f7;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.14);
}

.contact-map iframe {
  display: block;
  width: 100%;
  min-height: 330px;
  border: 0;
}

.social-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 999px;
  border: 1px solid #d8e4e1;
  background: #edf5f3;
  padding: 10px 16px;
  color: #1f5149;
  font-size: 0.84rem;
  font-weight: 700;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.social-pill__icon {
  width: 16px;
  height: 16px;
  color: #1c7f71;
  flex: 0 0 auto;
}

.social-pill:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(28, 127, 113, 0.12);
}

@media (max-width: 1024px) {
  .contact-map iframe {
    min-height: 280px;
  }
}

@media (max-width: 767px) {
  .contact-hero__content p {
    font-size: 0.9rem;
  }

  .social-pill {
    padding: 9px 14px;
    font-size: 0.8rem;
  }
}
</style>
