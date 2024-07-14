<script setup lang="ts">
import { defineProps, ref } from 'vue';
import AudioPlayer from './AudioPlayer.vue';

interface EpisodeDetails {
  title: string;
  image: string;
  description: string;
  slug: string;
  charters: [{ time: string, description: string }];
  audioUrl: string;
  links: [{ url: string, title: string }];
}

defineProps({
  episodeDetails: Object as () => EpisodeDetails,
});

const audioRef = ref();

const seekCharters = (time: string) => {
  const timeParts = time.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const seconds = parseInt(timeParts[2]);
  const timeInSeconds = hours * 3600 + minutes * 60 + seconds;

  if (audioRef.value) {
    audioRef.value.seekTo(timeInSeconds);
  }
};

</script>

<template>
  <div class="max-w-screen px-4 flex flex-col md:flex-row" v-if="episodeDetails">
    <div class="w-full sm:w-3/12 block lg:block mx-auto lg:px-4">
      <img class="aspect-square"
           :src="episodeDetails.image"
           alt="Android story logo">
    </div>
    <div class="w-full sm:w-9/12 sm:p-0 sm:m-0 mx-auto-2 lg:px-0">
      <h2 class="text-xl font-bold mb-2 text-green-500">{{ episodeDetails.title }}</h2>
      <div v-for="chapter in episodeDetails.charters" :key="chapter.time" class="flex-none mr-5 mb-2">
        <div role="button" class="flex items-center" @click="seekCharters(chapter.time)">
          <p class="link-button inline-block px-6 py-2 mt-1 mb-1 text-white bg-green-500 text-center rounded hover:bg-green-600 active:bg-green-700 mr-2">
            {{ chapter.time }}</p>
          <p class="text-black text-lg">{{ chapter.description }}</p>
        </div>
      </div>
      <AudioPlayer ref="audioRef" :audioUrl="episodeDetails.audioUrl" class="mx-auto-2"/>
      <div class="w-full sm:w-9/12 sm:p-0 sm:m-0 mx-auto-2 lg:px-0">
        <h2 class="text-xl font-bold mb-2 text-green-500">Згадано в цьому випуску</h2>
        <ul>
          <li v-for="link in episodeDetails.links" :key="link.url">
            <a class="link-button inline-block px-6 py-2 mt-1 mb-1 text-white bg-green-500 text-center rounded hover:bg-green-600 active:bg-green-700"
               :href="link.url" target="_blank">{{ link.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>