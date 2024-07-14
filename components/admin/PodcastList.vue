<script setup lang="ts">

const store = useAdminPodcastListStore();
store.fetchPodcasts();

</script>

<template>
  <div class="grid grid-cols-1 gap-4 max-w-screen-lg mx-auto">
    <div v-for="(episode, index) in store.getPodcasts" :key="index">
      <EpisodeCardAdmin :episode="episode"/>
    </div>
  </div>
</template>

<style scoped>
</style>
