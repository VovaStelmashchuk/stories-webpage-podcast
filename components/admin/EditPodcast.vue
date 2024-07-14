<script setup lang="ts">
import {storeToRefs} from 'pinia';

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const store = useEditPodcastStore();
store.fetchPodcast(props.slug);

const {getPodcastBySlug} = storeToRefs(store);

const podcast = computed(() => getPodcastBySlug.value(props.slug));

const audioRef = ref();

const savePodcast = () => {
  store.savePodcast(props.slug)
}

const publishPodcast = async () => {
  await $fetch(`/api/auth/podcast/${props.slug}/publish`, {
    method: 'POST',
  });
}

</script>

<template>
  <UContainer v-if="podcast" class="my-2">
    <h1 class="text-xl">Name</h1>
    <UInput color="gray" v-model="podcast.title" label="Podcast title" size="lg" class="w-full my-2"/>

    <AudioPlayer ref="audioRef" :audioUrl="podcast.audioUrl" class="mx-auto-2"/>

    <EpisodeEditTimeCodes :slug="props.slug"/>

    <UDivider class="my-8"/>

    <EpisodeEditLinks :slug="props.slug"/>

    <UDivider class="my-8"/>

    <UButton block label="Save" size="xl" class="my-2" @click="savePodcast"/>

    <UButton block label="Publish" size="xl" class="my-2" @click="publishPodcast"/>

    <UDivider class="my-16"/>

    <EpisodeDeleteButton :slug="props.slug"/>

    <p class="text-black"> {{ podcast }} </p>
  </UContainer>
</template>
