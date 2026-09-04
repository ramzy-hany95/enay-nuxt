<template>
  <div class="auth-page">
    <div class="auth-card">
      <img src="/assets/css/logo.png" alt="logo" class="logo" />
      <h1 class="title">VERIFY YOUR EMAIL</h1>
      <p class="subtitle">We sent the verification email<br/>to {{ maskedEmail }}</p>

      <div class="code-row">
        <input v-for="(c, i) in codes" :key="i" ref="inputs" v-model="codes[i]" maxlength="1" class="code-input"
               @input="onInput($event, i)" @keydown="onKeydown($event, i)" @paste="onPaste($event)" />
      </div>

      <button class="primary-btn" :disabled="!isComplete" @click="onVerify">VERIFY EMAIL</button>

      <p class="muted">Didn't Receive the code? <button class="resend" @click="onResend">Resend</button></p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

// try get email from query, fallback to placeholder
const email = route.query.email || 's****************@gmail.com'
function maskEmail(e) {
  if (!e || typeof e !== 'string') return e
  const parts = e.split('@')
  if (parts.length < 2) return e
  const name = parts[0]
  const domain = parts[1]
  const visible = name[0] || ''
  return `${visible}${'*'.repeat(Math.max(6, name.length - 1))}@${domain}`
}
const maskedEmail = maskEmail(email)

const codes = ref(new Array(6).fill(''))
const inputs = ref([])

const isComplete = computed(() => codes.value.every(ch => ch && ch.trim() !== ''))

function focusIndex(i) {
  const el = inputs.value[i]
  if (el) el.focus()
}

function onInput(e, i) {
  const val = e.target.value.replace(/[^0-9a-zA-Z]/g, '')
  codes.value[i] = val.slice(-1)
  if (val && i < 5) focusIndex(i + 1)
}

function onKeydown(e, i) {
  if (e.key === 'Backspace' && !codes.value[i] && i > 0) {
    focusIndex(i - 1)
  }
}

function onPaste(e) {
  const text = (e.clipboardData || window.clipboardData).getData('text')
  const chars = text.replace(/\s+/g, '').slice(0, 6).split('')
  chars.forEach((ch, idx) => { codes.value[idx] = ch })
  // focus last filled
  const last = Math.min(chars.length - 1, 5)
  focusIndex(last + 1 < 6 ? last + 1 : last)
  e.preventDefault()
}

function onVerify() {
  const code = codes.value.join('')
  console.log('verify code', code)
  // TODO: call verify API
  router.push('/')
}

function onResend() {
  console.log('resend code')
  // TODO: call resend API and show toast
}

onMounted(() => {
  // populate inputs refs
  inputs.value = document.querySelectorAll('.code-input')
  focusIndex(0)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Playfair+Display:wght@700;800&display=swap');

.auth-page{ display:flex; align-items:center; justify-content:center; padding:48px 16px }
.auth-card{ width:100%; max-width:640px; background:#ffffff; padding:48px 36px; border-radius:12px; box-shadow:0 20px 60px rgba(0,0,0,0.06); text-align:center }
.logo{ width:120px; margin:0 auto 8px auto; display:block }
.title{ font-family:'Playfair Display', serif; font-size:28px; margin:6px 0 8px; color:#153233 }
.subtitle{ color:#6b7b7b; margin-bottom:28px }

.code-row{ display:flex; gap:14px; justify-content:center; margin-bottom:20px }
.code-input{ width:56px; height:56px; border-radius:8px; border:1px solid #d8d8d8; font-size:22px; text-align:center }

.primary-btn{ width:100%; max-width:420px; margin:0 auto 12px; background:#2c8b71; color:white; border:0; padding:14px; border-radius:999px; font-weight:700 }
.primary-btn:disabled{ opacity:0.5 }

.muted{ color:#4a5b5a }
.resend{ background:none; border:0; color:#153233; font-weight:700; cursor:pointer }

@media (max-width:520px){ .code-input{ width:44px; height:44px; font-size:18px } .auth-card{ padding:28px 18px } }
</style>
