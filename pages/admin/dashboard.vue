<script setup lang="ts">

const isOpen = ref(false)
const name = ref('')

</script>

<template>
  <AdminHeader/>
  <UContainer class="min-h-screen">
    <div class="m-4">
      <UButton block label="Create podcast" @click="isOpen = true" class="h-32 text-4xl"/>
    </div>
  </UContainer>
  <UModal v-model="isOpen">
    <UCard>
      <UInput color="primary" variant="outline" placeholder="Name..." v-model="name" name="name" size="xl" gap="xl"/>
      <UButton block label="Create podcast" class="mt-2" size="xl" gap="xl"/>
    </UCard>
  </UModal>
</template>

<style scoped>
</style>
