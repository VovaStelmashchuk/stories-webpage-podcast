<script setup lang="ts">
const createPodcast = () => {
  console.log('clicked')
}
</script>

<template>
  <button
      class="px-4 py-2 text-black hover:text-white bg-transparent border border-green hover:bg-green-500 rounded text-center text-3xl"
      @click="createPodcast">
    Create Podcast
  </button>
</template>

<style scoped>

</style>