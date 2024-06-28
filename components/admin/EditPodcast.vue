<script setup lang="ts">
const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const {data: podcast} = useFetch('/api/auth/podcast/', {
  lazy: true,
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('sessionId'),
  },
})
</script>

<template>
  <div>
    <h1>Edit Podcast {{ slug }}</h1>
  </div>
</template>
