<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
</script>
<template>
  <AdminHeader/>
  <h1>Edit Podcast page {{ slug }}</h1>
  <AdminEditPodcast slug="slug"/>
</template>
