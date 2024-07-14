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

const charters = computed(() => getPodcastBySlug.value(props.slug).charters);

const addCharter = () => {
  store.addLocalCharter(props.slug)
}

</script>

<template>
  <h1 class="text-xl">Time codes</h1>
  <div v-for="(charter, index) in charters" class="flex flex-col gap-3 my-2">
    <EpisodeEditTimeCodeItem :slug="props.slug" :index="index" :add-new-on-enter="index === charters.length - 1"/>
  </div>

  <UButton block label="More" color="primary" variant="outline" size="xl" class="my-2" @click="addCharter"/>
</template>

<style scoped>

</style>