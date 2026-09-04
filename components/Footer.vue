<template>
  <footer class="relative overflow-hidden pt-12 pb-10 bg-gradient-to-b from-teal-800 to-teal-900 text-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="footer-top">
        <img src="/assets/css/Rectangle.png" alt="logo" class="footer-logo" />
        <NuxtLink to="/book-evaluation" class="footer-cta">BOOK EVALUATION</NuxtLink>
      </div>
              <div class="footer-divider"></div>

      <br />


      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 class="text-sm tracking-wider text-emerald-100 mb-3">ADDRESS</h4>
          <p class="text-emerald-100">2972 Westheimer Rd. Santa Ana,<br/>Illinois 85486</p>
        </div>

        <div>
          <h4 class="text-sm tracking-wider text-emerald-100 mb-3">EXPLORE</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/blogs" class="text-emerald-100">Blogs</NuxtLink></li>
            <li><NuxtLink to="/services" class="text-emerald-100">Services</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-emerald-100">Experts</NuxtLink></li>
            <li><NuxtLink to="/about" class="text-emerald-100">About us</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-emerald-100">Contacts</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm tracking-wider text-emerald-100 mb-3">CONTACT US</h4>
          <p class="text-emerald-100">+1 891 989-11-91<br/>help@logoipsum.com</p>

        <!-- <div class="mt-4">
          <NuxtLink to="/book-evaluation" class="inline-block bg-emerald-600 text-white rounded-full px-4 py-2 text-sm">BOOK EVALUATION</NuxtLink>
        </div> -->

        <div class="flex gap-3 mt-4">
          <a aria-label="instagram" href="#" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">IG</a>
          <a aria-label="facebook" href="#" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">F</a>
          <a aria-label="linkedin" href="#" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">in</a>
          <a aria-label="tiktok" href="#" class="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">t</a>
        </div>
      </div>
    </div>

    </div>

    <button class="fixed right-5 bottom-5 w-11 h-11 rounded-full bg-white text-teal-900 shadow-lg" title="Scroll to top" @click="scrollTop">↑</button>

    <div class="text-center mt-6 text-white/70">© {{ year }} MyProject. All rights reserved.</div>
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

@media (max-width:768px){
  .footer-top{ flex-direction:column; align-items:flex-start }
  .footer-cta{ margin-left:0; margin-top:8px }
}
</style>

