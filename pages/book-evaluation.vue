<template>
  <div class="booking-page">
    <section class="booking-form-view">
      <div class="booking-card">
        <img :src="logoImage" alt="Mobdaoon logo" class="booking-logo" />

        <h1>{{ $t('booking.title') }}</h1>
        <p class="booking-subtitle">{{ $t('booking.subtitle') }}</p>

        <form class="booking-form" @submit.prevent="submitBooking">
          <div class="booking-grid booking-grid--two">
            <input v-model="form.first_name" type="text" :placeholder="$t('booking.form.first_name')" required />
            <input v-model="form.last_name" type="text" :placeholder="$t('booking.form.last_name')" required />
          </div>

          <div class="booking-grid booking-grid--phone">
            <select v-model="form.country_code" aria-label="Country code">
              <option value="+20">+20</option>
              <option value="+966">+966</option>
              <option value="+971">+971</option>
            </select>
            <input v-model="form.phone" type="tel" :placeholder="$t('booking.form.phone')" required />
          </div>

          <div class="date-field-wrap">
            <input v-model="form.date" type="date" required />
          </div>

          <textarea v-model="form.message" rows="5" :placeholder="$t('booking.form.message')"></textarea>

          <p v-if="failed" role="alert" class="text-red-700">{{ $t('contactForm.error') }}</p>
          <div class="booking-actions">
            <NuxtLink to="/" class="btn btn--ghost">{{ $t('common.back') }}</NuxtLink>
            <button type="submit" :disabled="sending" :aria-busy="sending" class="btn btn--primary disabled:opacity-60">{{ sending ? $t('contactForm.sending') : $t('booking.form.submit') }}</button>
          </div>
        </form>
      </div>
    </section>

    <section v-if="isSubmitted" class="booking-modal" @click.self="closePopup">
      <div class="success-card">
        <button type="button" class="success-close" @click="closePopup" aria-label="Close confirmation">×</button>
        <span class="success-dot" aria-hidden="true"></span>

        <p class="success-date">
          <span class="success-calendar" aria-hidden="true"></span>
          {{ formattedDate }}
        </p>

        <h2>{{ $t('contactForm.success') }}</h2>
        <p class="success-text">{{ $t('contactForm.successDetails') }}</p>

        <div class="success-actions">
          <button type="button" class="success-secondary-btn" @click="closePopup">{{ $t('booking.success.close') }}</button>
          <NuxtLink to="/" class="success-home-btn">{{ $t('booking.success.returnHome') }}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import logoImage from '../assets/css/logo.png'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const isSubmitted = ref(false)
const { form, sending, failed, submitContact } = useContactMessage()

const formattedDate = computed(() => {
  const value = form.date

  if (!value) {
    return t('booking.form.dateNotSelected')
  }

  const parsed = new Date(value)
  return parsed.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

async function submitBooking() {
  isSubmitted.value = await submitContact()
}

function closePopup() {
  isSubmitted.value = false
}
</script>

<style scoped>
.booking-page {
  min-height: 100vh;
  background: #f4f6f7;
}

.booking-form-view {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 30px 14px;
}

.booking-card {
  width: min(100%, 640px);
  text-align: center;
}

.booking-logo {
  width: 290px;
  max-width: 100%;
  margin: 0 auto 10px;
  display: block;
}

.booking-card h1 {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(2.1rem, 4vw, 3.2rem);
  color: #171d24;
}

.booking-subtitle {
  margin: 12px auto 0;
  max-width: 38ch;
  color: #7d868c;
  font-size: 1.02rem;
  line-height: 1.5;
}

.booking-form {
  margin-top: 26px;
  display: grid;
  gap: 16px;
}

.booking-grid {
  display: grid;
  gap: 10px;
}

.booking-grid--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.booking-grid--phone {
  grid-template-columns: 92px 1fr;
}

.booking-form input,
.booking-form select,
.booking-form textarea {
  width: 100%;
  border: 1px solid #d3dade;
  border-radius: 6px;
  padding: 12px 10px;
  font-size: 0.96rem;
  color: #1e2c31;
  background: #f5f7f8;
}

.booking-form input:focus,
.booking-form select:focus,
.booking-form textarea:focus {
  outline: 2px solid #6db6ad;
  outline-offset: 1px;
}

.date-field-wrap {
  position: relative;
}

.booking-form textarea {
  resize: vertical;
  min-height: 120px;
}

.booking-actions {
  margin-top: 8px;
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 16px;
}

.btn {
  min-height: 48px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.84rem;
  font-weight: 800;
  letter-spacing: 0.03em;
}

.btn--ghost {
  border: 0;
  background: #a9adb3;
  color: #ffffff;
}

.btn--primary {
  border: 0;
  background: #328978;
  color: #ffffff;
  transition: background-color 180ms ease, transform 180ms ease;
}

.btn--primary:hover {
  background: #2b7467;
  transform: translateY(-1px);
}

.booking-modal {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(5, 17, 23, 0.45);
  backdrop-filter: blur(3px);
}

.success-card {
  position: relative;
  width: min(100%, 560px);
  border-radius: 22px;
  background: #f1f8f8;
  text-align: center;
  padding: 24px 18px 20px;
}

.success-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  background: rgba(12, 53, 50, 0.1);
  color: #1d3f42;
  font-size: 1.4rem;
  line-height: 1;
}

.success-dot {
  width: 18px;
  height: 8px;
  border-radius: 999px;
  background: #2a8b7d;
  display: inline-block;
}

.success-date {
  margin: 18px 0 0;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #182127;
  font-size: clamp(1rem, 1.8vw, 1.4rem);
}

.success-calendar {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 2px solid #2a8b7d;
  position: relative;
}

.success-calendar::before,
.success-calendar::after {
  content: '';
  position: absolute;
  background: #145d57;
}

.success-calendar::before {
  width: 20px;
  height: 2px;
  left: 50%;
  top: 11px;
  transform: translateX(-50%);
}

.success-calendar::after {
  width: 14px;
  height: 9px;
  left: 50%;
  top: 16px;
  transform: translateX(-50%);
  border: 2px solid #145d57;
  background: transparent;
  border-radius: 3px;
}

.success-card h2 {
  margin: 20px 0 0;
  color: #111820;
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  line-height: 1.1;
}

.success-text {
  margin: 14px auto 0;
  max-width: 34ch;
  color: #646d74;
  font-size: clamp(0.9rem, 1.4vw, 1rem);
  line-height: 1.45;
}

.success-actions {
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 10px;
}

.success-secondary-btn,
.success-home-btn {
  min-height: 46px;
  border-radius: 999px;
  border: 0;
  font-weight: 800;
  font-size: 0.82rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.02em;
}

.success-secondary-btn {
  background: #c8d4d3;
  color: #1f2f34;
}

.success-home-btn {
  background: #328978;
  color: #ffffff;
}

@media (max-width: 767px) {
  .booking-grid--two {
    grid-template-columns: 1fr;
  }

  .booking-actions {
    grid-template-columns: 1fr;
  }

  .success-actions {
    grid-template-columns: 1fr;
  }

  .success-home-btn {
    min-height: 52px;
  }
}
</style>
