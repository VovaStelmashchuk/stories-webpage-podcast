<script setup lang="ts">
import {storeToRefs} from 'pinia';

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const store = useEditPodcastStore();

const {getPodcastBySlug} = storeToRefs(store);

const links = computed(() => getPodcastBySlug.value(props.slug).links);

const addLink = () => {
  store.addLocalLink(props.slug)
}

</script>

<template>
  <h1 class="text-xl">Links</h1>
  <div v-for="(link, index) in links" class="flex flex-col gap-3 my-2">
    <EpisodeEditLinkItem :slug="props.slug" :index="index"/>
  </div>

  <UButton block label="More" color="primary" variant="outline" size="xl" class="my-2" @click="addLink"/>
</template>

<style scoped>

</style>