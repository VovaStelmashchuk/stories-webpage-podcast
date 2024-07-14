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
  <div>
    <UContainer
        class="flex flex-col sm:flex-row justify-around py-12">
      <UButton lable="Наш RSS" class="mt-2" size="xl">
        <a href="https://androidstory.dev/files/rss.xml" target="_blank">Наш RSS тут</a>
      </UButton>

      <UButton lable="Spotify для патреонів" class="mt-2" size="xl">
        <a href="https://open.spotify.com/show/4DzbFWyfcFX5zzh6MicCfM?si=99dda8490dd942c7" target="_blank">Spotify для
          патреонів</a>
      </UButton>

      <UButton lable="Більше цікавого тут" class="mt-2" size="xl" gap="xl">
        <a href="https://www.patreon.com/androidstory" target="_blank">Більше цікавого тут</a>
      </UButton>

      <UButton lable="YouTube" class="mt-2" size="xl" gap="xl">
        <a href="https://www.youtube.com/channel/UC6-NFk4uOGsKvyisL1QC3rw" target="_blank">YouTube</a>
      </UButton>
    </UContainer>
    <UHorizontalNavigation :links="links" class="flex flex-col justify-between"/>
    <UDivider/>
  </div>
</template>

<style scoped>
</style>
