<template>
  <div class="bg-white rounded-lg shadow-md p-4 border-green-500">
    <img :src="episode.image" alt="Podcast image" class="w-full h-64 object-cover rounded-t-lg">
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-2 text-green-500">{{ episode.title }}</h2>
      <p class="text-gray-700 line-clamp-5">{{ episode.description }}</p>
    </div>
  </div>
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