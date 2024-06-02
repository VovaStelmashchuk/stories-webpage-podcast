<template>
  <div class="grid grid-cols-3 gap-4 max-w-screen-lg mx-auto">
    <EpisodeCard v-for="(episode, index) in episodes" :key="index" :episode="episode"/>
  </div>
</template>

<script>
import axios from 'axios'
import EpisodeCard from './EpisodeCard.vue'

export default {
  components: {
    EpisodeCard
  },
  data() {
    return {
      episodes: []
    }
  },
  created() {
    axios.get(`/api/podcast-list`)
        .then(response => {
          this.episodes = response.data.podcasts
        })
        .catch(error => {
          console.error(error)
        })
  }
}
</script>

<style scoped>
</style>