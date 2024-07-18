<script setup lang="ts">

const isOpen = ref(false)
const isLoading = ref(false)
const name = ref('')
const store = useAdminPodcastListStore();

const createPodcast = async () => {
  isLoading.value = true
  await useFetch('/api/auth/podcast', {
    method: 'POST',
    body: JSON.stringify({name: name.value}),
  })

  await store.fetchPodcasts();

  isOpen.value = false
  isLoading.value = false
}

</script>

<template>
  <AdminHeader/>
  <UContainer>
    <UButton block label="Create podcast" @click="isOpen = true" size="xl" class="m-4"/>
  </UContainer>
  <UModal v-model="isOpen">
    <UCard>
      <UInput color="primary" variant="outline" placeholder="Name..." v-model="name" name="name" size="xl" gap="xl"/>
      <UButton block label="Create podcast" size="lg" @click="createPodcast" class="mt-2" :loading="isLoading"/>
    </UCard>
  </UModal>
  <AdminPodcastList/>
</template>

<style scoped></style>
