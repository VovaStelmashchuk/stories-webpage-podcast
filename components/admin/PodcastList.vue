<script setup lang="ts">

interface Podcast {
  slug: string; 
  title: string;
}

interface PodcastResponse {
  podcasts: Podcast[];
}

const { pending, data: podcastResponse } = useFetch('/api/auth/podcasts', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${ localStorage.getItem('sessionId') }`
  }
})

</script>
 
<template>
  <div v-if="pending">
    <p class="text-black">Loading...</p>
  </div>
  <div v-else class="grid grid-cols-1 gap-4 max-w-screen-lg mx-auto">
    <div v-for="(episode, index) in podcastResponse.podcasts" :key="index">
      <EpisodeCardAdmin :episode="episode"/>
    </div>
  </div>
</template>

<style scoped>
</style>
