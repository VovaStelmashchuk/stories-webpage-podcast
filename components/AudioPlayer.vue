<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div class="relative w-full h-2 bg-gray-200 rounded my-4" @click="seek($event)">
      <div :style="{ width: `${progress}%` }" class="absolute h-2 bg-green-500 rounded"></div>
    </div>
    <div class="flex items-center justify-center w-full my-8">
      {{ currentTime }} / {{ duration }}
    </div>
    <div class="flex items-center justify-center w-full">
      <button @click="togglePlay" class="p-4 bg-green-500 text-white rounded-lg w-15 h-15">
        <Icon v-if="isPlaying" name="ph:pause-fill"/>
        <Icon v-else name="material-symbols:play-circle-rounded"/>
      </button>
      <button @click="decreaseSpeed" class="ml-4 p-4 bg-blue-500 text-white rounded-lg w-15 h-15">
        -
      </button>
      <span class="mx-2 text-lg inline-block text-center w-12">
        {{ audio.playbackRate.toFixed(1) }}x
      </span>
      <button @click="increaseSpeed" class="mr-4 p-4 bg-blue-500 text-white rounded-lg w-15 h-15">
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';

const increaseSpeed = () => {
  audio.playbackRate += 0.1;
};

const decreaseSpeed = () => {
  audio.playbackRate = Math.max(0.1, audio.playbackRate - 0.1);
};

const props = defineProps({
  audioUrl: String,
});

const audio = new Audio(props.audioUrl);
const isPlaying = ref(false);
const progress = ref(0);

const currentTime = ref('00:00:00');
const duration = ref('');

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const parts = [hours, minutes, seconds].map(part => part.toString().padStart(2, '0'));
  return parts.join(':');
};

const updateProgress = () => {
  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTime.value = formatTime(audio.currentTime);
  duration.value = formatTime(audio.duration);
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