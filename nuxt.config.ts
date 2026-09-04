// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Enable Tailwind module and include the global CSS file
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css']
})