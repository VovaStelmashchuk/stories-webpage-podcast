<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
</script>
<template>
  <AdminHeader />
  <AdminEditPodcast :slug="slug" />
</template>
