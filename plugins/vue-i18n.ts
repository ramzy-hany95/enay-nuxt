import { createI18n } from 'vue-i18n'

import en from '~/locales/en.json'
import ar from '~/locales/ar.json'

export default defineNuxtPlugin((nuxtApp) => {
  const messages = {
    en,
    ar
  }

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages
  })

  nuxtApp.vueApp.use(i18n)
  nuxtApp.provide('i18n', i18n)
})
