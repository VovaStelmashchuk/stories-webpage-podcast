<script setup>
useSeoMeta({
  title: 'Meet Nuxt',
  description: 'The Intuitive Vue Framework.'
})
</script>

<template>
  <div id="app" class="h-full">
    <AppHeader/>
    <NuxtPage/>
  </div>
</template>

<style>
#app {
  background-color: #f7fafc;
  color: #00DC82;
}
</style>