<template>
  <div class="flex items-center justify-center w-full h-32">
    <button @click="togglePlay" class="p-2 mr-2 bg-green-500 text-white rounded-lg">
      <Icon v-if="isPlaying" name="ph:pause-fill"/>
      <Icon v-else name="material-symbols:play-circle-rounded"/>
    </button>
    <div class="relative w-full h-2 bg-gray-200 rounded" @click="seek($event)">
      <div :style="{ width: `${progress}%` }" class="absolute h-2 bg-green-500 rounded"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';

const props = defineProps({
  audioUrl: String,
});

const audio = new Audio(props.audioUrl);
const isPlaying = ref(false);
const progress = ref(0);

const updateProgress = () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
};

const togglePlay = () => {
  if (audio.paused) {
    audio.play();
    isPlaying.value = true;
  } else {
    audio.pause();
    isPlaying.value = false;
  }
};

const seek = (event: MouseEvent) => {
  const progressBar = event.currentTarget as HTMLElement;
  const rect = progressBar.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  audio.currentTime = (offsetX / progressBar.clientWidth) * audio.duration;
  updateProgress();
};

const seekTo = (timeInSeconds: number) => {
  audio.currentTime = timeInSeconds;
  updateProgress();
};

onMounted(() => {
  audio.addEventListener('timeupdate', updateProgress);
});

onUnmounted(() => {
  audio.removeEventListener('timeupdate', updateProgress);
  audio.pause();
});

defineExpose({
  seekTo,
});

</script>