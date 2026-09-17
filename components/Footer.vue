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
          <p class="text-emerald-100" v-html="$t('footer.address').replace('\n','<br/>')"></p>
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
          <p class="text-emerald-100">{{ $t('footer.contact.phone') }}<br/>{{ $t('footer.contact.email') }}</p>

          <div class="flex gap-3 mt-4">
            <a :aria-label="$t('contact.socials.instagram')" href="#" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">IG</a>
            <a :aria-label="$t('contact.socials.facebook')" href="#" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">F</a>
            <a :aria-label="$t('contact.socials.linkedin')" href="#" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">in</a>
            <a :aria-label="$t('contact.socials.tiktok')" href="#" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">t</a>
          </div>
        </div>
      </div>
    </div>

    <button class="scroll-top-btn" :title="$t('common.back')" @click="scrollTop">↑</button>

    <div class="text-center mt-6 text-white/70">{{ $t('footer.copyright', { year }) }}</div>
  </footer>
</template>

<script setup>
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
</style>

