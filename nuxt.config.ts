// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Enable Tailwind module and include the global CSS file
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],

  // Disable experimental app manifest to avoid unresolved virtual import during dev
  experimental: {
    appManifest: false
  },

  // PostCSS configuration moved here (remove postcss.config.cjs to silence Nuxt warning)
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.creativesksa.com'
    }
  }
})