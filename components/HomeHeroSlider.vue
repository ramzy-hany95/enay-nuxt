<template>
  <div class="hero-slider" @mouseenter="hovered = true" @mouseleave="hovered = false" @focusin="focused = true" @focusout="focused = !!($event.relatedTarget && $event.currentTarget.contains($event.relatedTarget))">
    <div v-for="(image, index) in images" :key="image" class="slide" :class="{ active: index === active }" :style="{ backgroundImage: 'url(' + image + ')' }" aria-hidden="true"></div>
    <div v-if="images.length > 1" class="controls">
      <button type="button" :aria-label="$t('home.slider.previous')" @click="select(active - 1)">?</button>
      <button v-for="(_, index) in images" :key="index" type="button" class="dot" :class="{ selected: index === active }" :aria-label="$t('home.slider.slide', { number: index + 1 })" :aria-pressed="index === active" @click="select(index)"></button>
      <button type="button" :aria-label="$t('home.slider.next')" @click="select(active + 1)">?</button>
      <button type="button" :aria-label="$t(paused ? 'home.slider.play' : 'home.slider.pause')" @click="paused = !paused">{{ paused ? '?' : '?' }}</button>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ images: string[] }>()
const active = ref(0)
const paused = ref(false)
const hovered = ref(false)
const focused = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
function select(index: number) {
  active.value = (index + props.images.length) % props.images.length
}
watch(() => props.images, () => { active.value = 0 })
onMounted(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  paused.value = reducedMotion.matches
  timer = setInterval(() => {
    if (!paused.value && !hovered.value && !focused.value && !document.hidden && props.images.length > 1) select(active.value + 1)
  }, 5000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>
<style scoped>
.hero-slider, .slide { position: absolute; inset: 0; }
.slide { background-size: cover; background-position: center; opacity: 0; transition: opacity 700ms ease; }
.slide.active { opacity: 1; }
.controls { position: absolute; bottom: 12px; inset-inline: 0; z-index: 3; display: flex; justify-content: center; align-items: center; gap: 8px; direction: ltr; }
button { display: grid; place-items: center; width: 36px; height: 36px; color: white; background: #164d50; border-radius: 50%; }
button:focus-visible { outline: 3px solid #0d7377; outline-offset: 3px; }
button.dot { width: 16px; height: 16px; border: 2px solid #164d50; background: white; }
button.selected { background: #164d50; }
@media (prefers-reduced-motion: reduce) { .slide { transition: none; } }
</style>
