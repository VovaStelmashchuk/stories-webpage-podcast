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
  <div class="h-72 bg-gray-800 flex flex-col justify-end">
    <div class="flex flex-col sm:flex-row justify-around pb-4 mt-12">
      <a href="https://shows.acast.com/android-story" target="_blank"
         class="bg-blue-600 text-white px-6 py-3 text-lg rounded-lg mb-2 sm:mb-0 mx-4">Всі можливі RSS тут</a>
      <a href="https://www.patreon.com/androidstory" target="_blank"
         class="bg-red-600 text-white px-6 py-3 text-lg rounded-lg mb-2 sm:mb-0 mx-4">Patreon</a>
      <a href="https://www.youtube.com/channel/UC6-NFk4uOGsKvyisL1QC3rw" target="_blank"
         class="bg-red-600 text-white px-6 py-3 text-lg rounded-lg mx-4">YouTube</a>
    </div>
    <UHorizontalNavigation :links="links" class="text-white flex flex-col justify-between"/>
  </div>
</template>

<style scoped>
</style>