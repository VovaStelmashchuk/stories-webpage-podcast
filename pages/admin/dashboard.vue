<script setup lang="ts">

import customFetch from "~/plugins/customFetch";

const isOpen = ref(false)
const name = ref('')

const createPodcast = async () => {
  // Create podcast via rest api Post /api/auth/podcast { name: name.value }
  console.log('Create podcast', name.value)
  isOpen.value = false
  const tes = await useCustomFetch('/api/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ name: name.value })
  });

  console.log('tes', tes)
}

</script>

<template>
  <AdminHeader/>
  <UContainer class="min-h-screen">
    <div class="m-4">
      <UButton block label="Create podcast" @click="isOpen = true" size="xl"/>
    </div>
  </UContainer>
  <UModal v-model="isOpen">
    <UCard>
      <UInput color="primary" variant="outline" placeholder="Name..." v-model="name" name="name" size="xl" gap="xl"/>
      <UButton block label="Create podcast" size="lg" @click="createPodcast" class="mt-2"/>
    </UCard>
  </UModal>
</template>

<style scoped>
</style>
