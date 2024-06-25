<script setup lang="ts">

interface User {
  username: number;
}

const router = useRouter();

const { data: user } = useFetch<User>('/api/auth/me', {
  lazy: true,
  headers: {
    Authorization: `Bearer ${ localStorage.getItem('sessionId') }`
  }
})

</script>

<template>
  <div>
    <h1 class="text-black">Dashboard</h1>
    <p class="text-black"> {{ user?.username }}</p>
  </div>
</template>

<style scoped>
</style>