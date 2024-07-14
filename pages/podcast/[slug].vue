<script lang="js">
import axios from 'axios';
import EpisodeComponent from "~/components/PodcastComponent.vue";

export default {
  components: {
    EpisodeComponent
  },
  data() {
    return {
      episodeDetails: null,
      slug: this.$route.params.slug
    };
  },
  created() {
    axios.get(`/api/podcast/${this.slug}`)
        .then(response => {
          this.episodeDetails = response.data.podcast;
        })
        .catch(error => {
          console.error(error);
        });
  },
}
</script>

<template>
  <div>
    <AppHeader></AppHeader>
    <EpisodeComponent class="mt-4" v-if="episodeDetails" :episode-details="episodeDetails"></EpisodeComponent>
  </div>
</template>
