<template>
  <header class="border-b bg-white">
    <div class="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
      <NuxtLink to="/" class="flex items-center gap-2 text-teal-800 font-bold">
         <img src="/assets/css/logo.png" alt="logo" /> 
      </NuxtLink>

      <nav class="hidden md:flex gap-8 items-center">
        <NuxtLink to="/services" class="text-gray-800 text-sm hover:underline">SERVICES</NuxtLink>
        <NuxtLink to="/blogs" class="text-gray-800 text-sm hover:underline">BLOGS</NuxtLink>
        <NuxtLink to="/about" class="text-gray-800 text-sm hover:underline">ABOUT US</NuxtLink>
        <NuxtLink to="/contact" class="text-gray-800 text-sm hover:underline">CONTACT</NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <NuxtLink to="/book-evaluation" class="bg-emerald-600 text-white rounded-full px-4 py-2 text-sm">BOOK EVALUATION</NuxtLink>
        <NuxtLink to="/auth/login" class="border border-gray-300 rounded-full px-3 py-1 text-sm">SIGN IN</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
// Tailwind-based header
</script>

