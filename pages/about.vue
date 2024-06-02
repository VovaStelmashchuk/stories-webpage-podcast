<template>
  <div class="about bg-white">
    <PodcastInfo/>
  </div>
</template>

<script>
import PodcastInfo from '@/components/PodcastInfo.vue'

export default {
  components: {
    PodcastInfo
  }
}
</script>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>