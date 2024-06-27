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
  <div class="bg-gray-700">
    <UContainer
        class="flex flex-col sm:flex-row justify-around py-12">
      <UButton lable="Всі можливі RSS тут" class="mt-2" size="xl">
        <a href="https://shows.acast.com/android-story" target="_blank">Всі можливі RSS тут</a>
      </UButton>

      <UButton lable="Більше цікавого тут" class="mt-2" size="xl" gap="xl">
        <a href="https://www.patreon.com/androidstory" target="_blank">Більше цікавого тут</a>
      </UButton>

      <UButton lable="YouTube" class="mt-2" size="xl" gap="xl">
        <a href="https://www.youtube.com/channel/UC6-NFk4uOGsKvyisL1QC3rw" target="_blank">YouTube</a>
      </UButton>
    </UContainer>
    <UHorizontalNavigation :links="links" class="flex flex-col justify-between"/>
  </div>
</template>

<style scoped>
</style>
