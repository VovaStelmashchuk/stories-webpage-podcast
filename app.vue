<script setup>
useSeoMeta({
  title: 'Android Story podcast',
  description: 'Тут є все що робить подкаст android story'
})
</script>

<template>
  <div id="app" class="max-h-full max-w-full">
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