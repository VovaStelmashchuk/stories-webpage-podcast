<script setup lang="ts">

const { data: posts } = useFetch('/api/podcast-list');

</script>

<template>
  <div v-if="pending">
    <p class="text-black">Loading...</p>
  </div>
  <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 max-w-screen-lg mx-auto">
    <div v-for="(episode, index) in posts.posts" :key="index">
      <EpisodeCardNormal v-if="episode.type === 'public'" :episode="episode"/>
      <EpisodeCardPatreon v-if="episode.type === 'patreon'" :episode="episode"/>
    </div>
  </div>
</template>

<style scoped>
</style>
