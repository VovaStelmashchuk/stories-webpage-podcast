<template>
  <UContainer class="bg-white rounded-lg shadow-md p-4 border-green-500">
    <a href="https://www.patreon.com/androidstory" target="_blank">
      <div class="relative">
        <img :src="episode.image" alt="Podcast image" class="square-image object-cover rounded-t-lg blur-sm">
        <div
            class="absolute top-32 left-0 right-0 h-12 flex items-center justify-center bg-red-600 text-white px-2 py-1 text-lg rounded-full mx-2">
          Patreon special
        </div>
      </div>
      <div class="h-64 overflow-clip p-4">
        <h2 class="text-xl font-bold mb-2 text-green-500">{{ episode.title }}</h2>
      </div>
    </a>
  </UContainer>
</template>

<script>
export default {
  props: {
    episode: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>