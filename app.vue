<template>
  <div>
    <HeaderBar />
    <NuxtPage />
    <Footer />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })

// Update HTML `dir` and `lang` reactively for RTL/LTR support.
useHead(
  computed(() => ({
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800&display=swap'
      }
    ],
    htmlAttrs: {
      dir: locale.value === 'ar' ? 'rtl' : 'ltr',
      lang: locale.value
    }
  }))
)

onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem('locale')
    if (saved && saved !== locale.value) locale.value = saved
  }
})
</script>
