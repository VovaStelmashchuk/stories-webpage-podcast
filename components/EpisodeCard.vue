<template>
  <UContainer class="bg-white rounded-lg shadow-md p-4 border-green-500">
    <router-link :to="{ name: 'podcast-slug', params: { slug: episode.slug } }">
      <img :src="episode.image" alt="Podcast image" class="square-image object-cover rounded-t-lg">
      <div class="h-64 overflow-clip p-4">
        <h2 class="text-xl font-bold mb-2 text-green-500">{{ episode.title }}</h2>
        <div v-html="episode.description" class="text-black"></div>
      </div>
    </router-link>
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