<script setup lang="ts">
import {useRouter} from 'vue-router';
import EpisodeComponent from "~/components/PodcastComponent.vue";

const router = useRouter();
let slug = router.currentRoute.value.params.slug;

if (Array.isArray(slug)) {
  slug = slug[0];
}

</script>

<template>
  <div class="p-8 m-4">
    <EpisodeComponent :slug="slug"></EpisodeComponent>
  </div>
</template>