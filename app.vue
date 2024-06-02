<script setup>
useSeoMeta({
  title: 'Meet Nuxt',
  description: 'The Intuitive Vue Framework.'
})
</script>

<template>
  <div id="app" class="h-screen w-screen">
    <AppHeader/>
    <NuxtPage/>
  </div>
</template>

<style scoped>
#app {
  background-color: #f7fafc;
  color: #00DC82;
}
</style>