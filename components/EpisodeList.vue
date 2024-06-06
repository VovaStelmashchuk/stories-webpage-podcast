<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 max-w-screen-lg mx-auto">
    <div v-for="(episode, index) in episodes" :key="index">
      <EpisodeCard v-if="episode.type === 'public'" :episode="episode"/>
      <PatreonCard v-if="episode.type === 'patreon'" :episode="episode"/>
    </div>
  </div>
</template>

<script lang="js">
import axios from 'axios'
import EpisodeCard from './EpisodeCard.vue'
import PatreonCard from './PatreonCard.vue'

export default {
  components: {
    EpisodeCard,
    PatreonCard,
  },
  data() {
    return {
      episodes: [],
    }
  },
  created() {
    axios.get(`/api/podcast-list`)
        .then(response => {
          this.episodes = response.data.posts
          console.log(this.episodes)
        })
        .catch(error => {
          console.error(error)
        })
  }
}
</script>

<style scoped>
</style>