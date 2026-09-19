<template>
  <header class="border-b bg-white">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
      <NuxtLink to="/" class="flex items-center gap-2 text-teal-800 font-bold">
        <img src="/assets/css/logo.png" :alt="$t('common.logoAlt')" class="w-24 h-14" /> 
      </NuxtLink>

      <nav class="hidden md:flex gap-8 items-center">
        <NuxtLink to="/services" class="text-gray-800 text-sm hover:underline">{{ $t('nav.services') }}</NuxtLink>
        <NuxtLink to="/blogs" class="text-gray-800 text-sm hover:underline">{{ $t('nav.blogs') }}</NuxtLink>
        <NuxtLink to="/about" class="text-gray-800 text-sm hover:underline">{{ $t('nav.about') }}</NuxtLink>
        <NuxtLink to="/contact" class="text-gray-800 text-sm hover:underline">{{ $t('nav.contact') }}</NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <NuxtLink to="/book-evaluation" class="bg-emerald-600 text-white rounded-full px-4 py-2 text-sm">{{ $t('nav.bookEvaluation') }}</NuxtLink>
        <NuxtLink to="/auth/login" class="border border-gray-300 rounded-full px-3 py-1 text-sm">{{ $t('nav.signIn') }}</NuxtLink>

        <div>
          <select v-model="currentLocale" @change="changeLocale" :aria-label="$t('nav.languageLabel')" class="text-sm border rounded px-2 py-1">
            <option value="en">{{ $t('languages.en') }}</option>
            <option value="ar">{{ $t('languages.ar') }}</option>
          </select>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })
const currentLocale = ref(locale.value)

function changeLocale() {
  locale.value = currentLocale.value
  if (process.client) localStorage.setItem('locale', currentLocale.value)
}
</script>

