<template>
  <header class="border-b bg-white" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
    <div class="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 py-3">
      <NuxtLink to="/" class="shrink-0 text-teal-800 font-bold">
        <img src="/assets/css/logo.png" :alt="$t('common.logoAlt')" class="w-20 h-12 object-contain sm:w-24 sm:h-14" />
      </NuxtLink>
      <nav class="hidden lg:flex gap-6 items-center">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="text-gray-800 text-sm hover:underline">{{ $t(link.label) }}</NuxtLink>
      </nav>
      <div class="flex items-center gap-2 sm:gap-3">
        <NuxtLink to="/book-evaluation" class="hidden lg:inline-flex bg-emerald-600 text-white rounded-full px-4 py-2 text-sm whitespace-nowrap">{{ $t('nav.bookEvaluation') }}</NuxtLink>
        <NuxtLink to="/auth/login" class="hidden lg:inline-flex border border-gray-300 rounded-full px-3 py-2 text-sm whitespace-nowrap">{{ $t('nav.signIn') }}</NuxtLink>
        <button type="button" @click="changeLocale" :aria-label="$t('nav.languageLabel') + ': ' + $t('languages.' + nextLocale)" class="min-h-11 min-w-11 text-sm border rounded-lg px-2 py-1 hover:bg-gray-50">{{ nextLocale.toUpperCase() }}</button>
        <button ref="menuButton" type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-teal-800 hover:bg-gray-50 lg:hidden" :aria-label="$t('nav.openMenu')" aria-controls="mobile-menu" :aria-expanded="isMenuOpen" @click="openMenu">
          <svg aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
    </div>
    <dialog id="mobile-menu" ref="menuDialog" class="mobile-menu" :dir="locale === 'ar' ? 'rtl' : 'ltr'" :aria-label="$t('nav.menu')" @click="onBackdropClick" @cancel.prevent="closeMenu" @close="onMenuClosed">
      <div class="flex min-h-full flex-col p-6">
        <div class="mb-8 flex items-center justify-between gap-4">
          <span class="text-lg font-semibold text-teal-800">{{ $t('nav.menu') }}</span>
          <button type="button" autofocus class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50" :aria-label="$t('common.actions.close')" @click="closeMenu">
            <svg aria-hidden="true" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <nav class="flex flex-col gap-2">
          <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="rounded-xl px-4 py-3 text-gray-800 hover:bg-emerald-50 hover:text-teal-800" active-class="bg-emerald-50 text-teal-800 font-semibold" @click="closeMenu">{{ $t(link.label) }}</NuxtLink>
        </nav>
        <div class="mt-auto flex flex-col gap-3 pt-8">
          <NuxtLink to="/book-evaluation" class="rounded-full bg-emerald-600 px-4 py-3 text-center text-sm text-white" @click="closeMenu">{{ $t('nav.bookEvaluation') }}</NuxtLink>
          <NuxtLink to="/auth/login" class="rounded-full border border-gray-300 px-4 py-3 text-center text-sm" @click="closeMenu">{{ $t('nav.signIn') }}</NuxtLink>
          <button type="button" class="min-h-11 rounded-full border border-gray-300 px-4 py-3 text-sm hover:bg-gray-50" :aria-label="$t('nav.languageLabel') + ': ' + $t('languages.' + nextLocale)" @click="changeLocale">{{ nextLocale.toUpperCase() }}</button>
        </div>
      </div>
    </dialog>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' })
const route = useRoute()
const nextLocale = computed(() => locale.value === 'en' ? 'ar' : 'en')
const menuDialog = ref(null)
const menuButton = ref(null)
const isMenuOpen = ref(false)
const links = [
  { to: '/services', label: 'nav.services' },
  { to: '/blogs', label: 'nav.blogs' },
  { to: '/about', label: 'nav.about' },
  { to: '/contact', label: 'nav.contact' }
]
let desktopMedia
let previousOverflow = ''

function changeLocale() {
  locale.value = nextLocale.value
  if (process.client) localStorage.setItem('locale', locale.value)
}

function openMenu() {
  if (!menuDialog.value || isMenuOpen.value) return
  previousOverflow = document.body.style.overflow
  menuDialog.value.showModal()
  isMenuOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeMenu() {
  menuDialog.value?.close()
  onMenuClosed()
}

function onMenuClosed() {
  if (!isMenuOpen.value) return
  isMenuOpen.value = false
  document.body.style.overflow = previousOverflow
  if (!desktopMedia?.matches) menuButton.value?.focus()
}

function onBackdropClick(event) {
  if (event.target !== menuDialog.value) return
  const bounds = menuDialog.value.getBoundingClientRect()
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeMenu()
}

function onDesktopChange(event) {
  if (event.matches) closeMenu()
}

watch(() => route.fullPath, closeMenu)

onMounted(() => {
  desktopMedia = window.matchMedia('(min-width: 1024px)')
  desktopMedia.addEventListener('change', onDesktopChange)
})

onBeforeUnmount(() => {
  desktopMedia?.removeEventListener('change', onDesktopChange)
  closeMenu()
})
</script>

<style scoped>
.mobile-menu {
  position: fixed;
  inset: 0;
  margin: 0;
  margin-inline-start: auto;
  width: min(85vw, 22rem);
  max-width: none;
  height: 100%;
  height: 100dvh;
  max-height: none;
  padding: 0;
  border: 0;
  background: white;
  color: #1f2937;
  overflow-y: auto;
  overscroll-behavior: contain;
  box-shadow: 0 0 40px rgb(0 0 0 / 15%);
  --slide-from: 100%;
}
.mobile-menu[dir='rtl'] { --slide-from: -100%; }
.mobile-menu[open] { animation: menu-slide-in 220ms ease-out; }
.mobile-menu::backdrop { background: rgb(15 23 42 / 45%); }
@keyframes menu-slide-in {
  from { transform: translateX(var(--slide-from)); }
  to { transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .mobile-menu[open] { animation: none; }
}
</style>