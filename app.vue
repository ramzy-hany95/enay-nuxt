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
