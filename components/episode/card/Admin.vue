<script>

export default {
  props: {
    episode: {
      type: {
        slug: String,
        title: String,
        type: String
      },
      required: true
    }
  }
}
</script>

<template>
  <UContainer class="bg-white rounded-lg shadow-md p-4 border-green-500"
              v-if="episode.type === 'public' || episode.type === 'draft' ">
    <router-link :to="{ name: 'admin-podcast-slug', params: { slug: episode.slug } }">
      <div class="overflow-clip p-4">
        <h2 class="text-xl font-bold mb-2 text-green-500">{{ episode.title }}</h2>
      </div>
    </router-link>
  </UContainer>

  <UContainer aria-disabled="true" class="bg-white rounded-lg shadow-md p-4 border-green-500"
              v-if="episode.type === 'patreon' ">
    <div class="overflow-clip p-4">
      <h2 class="text-xl font-bold mb-2 text-green-500">{{ episode.title }}</h2>
    </div>
  </UContainer>
</template>

<style scoped>
</style>
