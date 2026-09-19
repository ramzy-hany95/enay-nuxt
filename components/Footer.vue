<template>
  <footer class="relative overflow-hidden pt-12 pb-10 bg-gradient-to-b from-teal-800 to-teal-900 text-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="footer-top">
        <img src="/assets/css/Rectangle.png" :alt="$t('common.logoAlt')" class="footer-logo" />
        <NuxtLink to="/book-evaluation" class="footer-cta">{{ $t('footer.cta') }}</NuxtLink>
      </div>
      <div class="footer-divider"></div>

      <br />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 class="text-sm tracking-wider text-emerald-100 mb-3">{{ $t('footer.addressTitle') }}</h4>
          <p class="text-emerald-100 whitespace-pre-line">{{ configurations?.address || $t('footer.address') }}</p>
        </div>

        <div>
          <h4 class="text-sm tracking-wider text-emerald-100 mb-3">{{ $t('footer.exploreTitle') }}</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/blogs" class="text-emerald-100">{{ $t('footer.explore.blogs') }}</NuxtLink></li>
            <li><NuxtLink to="/services" class="text-emerald-100">{{ $t('footer.explore.services') }}</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-emerald-100">{{ $t('footer.explore.experts') }}</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-emerald-100">{{ $t('footer.explore.aboutUs') }}</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-emerald-100">{{ $t('footer.explore.contacts') }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm tracking-wider text-emerald-100 mb-3">{{ $t('footer.contactTitle') }}</h4>
          <div class="text-emerald-100 space-y-1">
            <p><a v-if="configurations?.phone" :href="'tel:' + configurations.phone.replace(/[^+0-9]/g, '')" dir="ltr" class="inline-block hover:underline">{{ configurations.phone }}</a><span v-else>{{ $t('footer.contact.phone') }}</span></p>
            <p><a v-if="configurations?.email" :href="'mailto:' + configurations.email" dir="ltr" class="inline-block break-all hover:underline">{{ configurations.email }}</a><span v-else>{{ $t('footer.contact.email') }}</span></p>
          </div>

          <div v-if="socials.length" class="flex flex-wrap gap-3 mt-4">
            <a v-for="social in socials" :key="social.id" :href="social.href" target="_blank" rel="noopener noreferrer" :aria-label="socialLabel(social)" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">
              <component :is="social.icon" class="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <button class="scroll-top-btn" :title="$t('common.back')" @click="scrollTop">↑</button>

    <div class="text-center mt-6 text-white/70">{{ $t('footer.copyright', { year }) }}</div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, te } = useI18n()
const { socials } = useSocialMedia()
const { configurations } = useWebsiteConfigurations()
function socialLabel(social) {
  const key = 'contact.socials.' + social.key
  return te(key) ? t(key) : social.title
}
const year = new Date().getFullYear()
function scrollTop(){ window.scrollTo({ top:0, behavior:'smooth' }) }
</script>

<style scoped>
.footer-top{ display:flex; align-items:center; justify-content:space-between; gap:18px; position:relative; padding:8px 0 }
.footer-logo{ width:140px; height:auto }
.footer-cta{ background:#ffffff; color:#0f6b60; padding:10px 18px; border-radius:999px; font-weight:700; text-decoration:none; box-shadow:0 6px 20px rgba(0,0,0,0.12) }

/* full-width divider below the header row */
.footer-divider{ width:100%; height:1px; background:rgba(255,255,255,0.25); margin:14px 0 }
footer .grid a{ color:rgba(255,255,255,0.9) }
footer h4{ color:rgba(255,255,255,0.9) }

.footer-divider{ box-shadow:0 0 0 0 rgba(255,255,255,0.03) }

/* adjust social icons style */
.flex.gap-3.mt-4 a{ background:rgba(255,255,255,0.06); width:40px; height:40px }

/* logical positioning for the scroll-to-top button so RTL works automatically */
.scroll-top-btn{ position:fixed; inset-inline-end:1.25rem; inset-block-end:1.25rem; width:2.75rem; height:2.75rem; border-radius:999px; background:white; color:#0f6b60; display:flex; align-items:center; justify-content:center; box-shadow:0 8px 22px rgba(2,6,6,0.12) }

@media (max-width:768px){
  .footer-top{ flex-direction:column; align-items:flex-start }
  .footer-cta{ margin-left:0; margin-top:8px }
}

@media (prefers-reduced-motion: no-preference) {
  .footer-logo {
    transform-origin: center;
    transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1), filter 400ms ease;
  }
}

@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .footer-logo:hover {
    transform: translateY(-5px) scale(1.06);
    filter: drop-shadow(0 10px 14px rgb(110 231 183 / 30%));
  }
}
</style>

