<script setup lang="ts">
import {defineProps, onMounted, ref} from 'vue';
import axios from 'axios';

interface EpisodeDetails {
  title: string;
  image: string;
  description: string;
  slug: string;
}

const props = defineProps({
  slug: String,
});

const episodeDetails = ref<EpisodeDetails | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get(`/api/podcast/${props.slug}`);
    episodeDetails.value = response.data.podcast;
  } catch (error) {
    console.error(error);
  }
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
      <div class="w-9/12 sm:w-full mx-auto px-4">
        <h2 class="text-xl font-bold mb-2 text-green-500">{{ episodeDetails.title }}</h2>
        <div v-html="episodeDetails.description" class="text-black"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>