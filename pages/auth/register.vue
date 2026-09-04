<template>
  <div class="auth-page">
    <div class="auth-card">
      <img src="/assets/css/logo.png" alt="logo" class="logo" />
      <h1 class="title">SIGN UP</h1>
      <p class="subtitle">Create your account to start your wellness journey</p>

      <form @submit.prevent="onSubmit" class="form">
        <div class="name-row">
          <input v-model="firstName" type="text" class="name-input" placeholder="First Name" required />
          <input v-model="lastName" type="text" class="name-input" placeholder="Last Name" required />
        </div>

        <div class="phone-row">
          <select v-model="country" class="country-select">
            <option value="+20">+20</option>
            <option value="+966">+966</option>
            <option value="+1">+1</option>
          </select>
          <input v-model="phone" type="tel" class="phone-input" placeholder="Phone Number" required />
        </div>

        <input v-model="email" type="email" class="full-input" placeholder="Email Address ( optional )" />

        <div class="password-row">
          <input :type="show ? 'text' : 'password'" v-model="password" class="password-input" placeholder="Password" required />
          <button type="button" class="eye-btn" @click="toggleShow" aria-label="toggle password">
            <IconEye v-if="show" />
            <IconEyeOff v-else />
          </button>
        </div>

        <label class="terms"><input type="checkbox" v-model="agree" /> I agree to the Terms &amp; Conditions</label>

        <button type="submit" class="primary-btn" :disabled="!agree">SIGN UP</button>

        <p class="muted">Already have an account? <NuxtLink to="/auth/login">Log in</NuxtLink></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { IconEye, IconEyeOff } from '@tabler/icons-vue'

const firstName = ref('')
const lastName = ref('')
const country = ref('+20')
const phone = ref('')
const email = ref('')
const password = ref('')
const agree = ref(false)
const show = ref(false)
const router = useRouter()

function toggleShow() { show.value = !show.value }

function onSubmit() {
  if (!agree.value) return
  // TODO: call registration API
  console.log('register', { firstName: firstName.value, lastName: lastName.value, phone: phone.value, email: email.value })
  router.push('/auth/verify-email')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Playfair+Display:wght@700;800&display=swap');

.auth-page{ display:flex; align-items:center; justify-content:center; padding:48px 16px }
.auth-card{ width:100%; max-width:520px; background:#ffffff; padding:48px 36px; border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,0.06); text-align:center }
.logo{ width:120px; margin:0 auto 18px auto; display:block }
.title{ font-family:'Playfair Display', serif; font-size:26px; margin:6px 0 8px; color:#153233 }
.subtitle{ color:#6b7b7b; margin-bottom:22px }

.form{ display:flex; flex-direction:column; gap:14px }
.name-row{ display:flex; gap:12px }
.name-input{ flex:1; padding:12px; border-radius:8px; border:1px solid #e6ecec }
.phone-row{ display:flex; gap:12px }
.country-select{ width:100px; padding:12px; border-radius:8px; border:1px solid #e6ecec }
.phone-input, .full-input{ padding:12px; border-radius:8px; border:1px solid #e6ecec }

.password-row{ position:relative }
.password-input{ width:100%; padding:12px 44px 12px 12px; border-radius:8px; border:1px solid #e6ecec }
.eye-btn{ position:absolute; right:8px; top:50%; transform:translateY(-50%); background:transparent; border:0; padding:6px }

.terms{ display:flex; align-items:center; gap:8px; font-size:0.9rem }
.primary-btn{ margin-top:6px; background:#2c8b71; color:white; border:0; padding:14px; border-radius:999px; font-weight:700 }
.muted{ margin-top:8px; color:#4a5b5a }

@media (max-width:520px){ .name-row{ flex-direction:column } .country-select{ width:86px } }
</style>
