<script setup lang="ts">

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const adminPodcastList = useAdminPodcastListStore();

const isOpen = ref(false)
const router = useRouter()

const deleteEpisode = async () => {
  await adminPodcastList.deletePodcast(props.slug)
  isOpen.value = false
  await router.push('/admin/dashboard');
}

</script>

<template>
  <UButton block label="Delete" size="xl" class="my-2" color="red" @click="isOpen = true"/>
  <UModal v-model="isOpen">
    <UCard>
      <h1 class="text-2xl text-red-500">Are your sure?</h1>
      <UButton block label="Delete" size="lg" @click="deleteEpisode" class="mt-2" color="red"/>
      <UButton block label="Close" size="lg" @click="isOpen = false" class="mt-2" color="green"/>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>