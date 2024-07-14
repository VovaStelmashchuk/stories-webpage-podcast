<script setup lang="ts">
const props = defineProps({
  slug: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },

});

const editPodcastStore = useEditPodcastStore();

const link = computed(() => {
  return editPodcastStore.getPodcastLink(props.slug, props.index);
});


</script>

<template>
  <div class="flex-row flex gap-3">
    <UInput color="gray" v-model="link.link" label="URL" size="lg" class="w-full"/>
    <UInput color="gray" v-model="link.title" label="Description" size="lg" class="w-full"/>
  </div>
</template>

<style scoped>

</style>