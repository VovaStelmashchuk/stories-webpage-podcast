<script setup lang="ts">
import {defineProps} from 'vue';

interface EpisodeDetails {
  title: string;
  image: string;
  description: string;
  slug: string;
}

defineProps({
  episodeDetails: Object as () => EpisodeDetails,
});
</script>

<template>
  <div class="max-w-screen-xl mx-auto px-4" v-if="episodeDetails">
    <div class="flex">
      <div class="w-3/12 hidden lg:block mx-auto px-4">
        <img class="aspect-square"
             :src="episodeDetails.image"
             alt="Android story logo">
      </div>
      <div class="w-9/12 sm:w-full sm:p-0 sm:m-0 mx-auto-2 px-0">
        <h2 class="text-xl font-bold mb-2 text-green-500">{{ episodeDetails.title }}</h2>
        <div v-html="episodeDetails.description" class="text-black"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>