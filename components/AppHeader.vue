<script setup lang="ts">
const route = useRoute()

const links = [
  {
    label: 'Останні епізоди',
    labelClass: 'flex justify-around pb-4 text-2xl font-bold',
    to: '/'
  },
  {
    label: 'Хто ми такі',
    labelClass: 'flex justify-around pb-4 text-2xl font-bold',
    to: '/about'
  }
]
</script>

<template>
  <div class="h-64 bg-gray-800 flex flex-col justify-end">
    <UHorizontalNavigation :links="links" class="text-white flex flex-col justify-between"/>
  </div>
</template>

<style scoped>
</style>