<template>
  <div>
    <HeaderBar />
    <main class="content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import HeaderBar from '~/components/HeaderBar.vue'
import Footer from '~/components/Footer.vue'
</script>

<style>
.content{ min-height: calc(100vh - 140px); padding: 2rem 1rem; max-width:1100px; margin:0 auto; }
</style>
