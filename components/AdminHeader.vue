<script setup lang="ts">
import { useCustomFetch } from "~/composables/useCustomFetch";

const router = useRouter();

interface User {
  username: number;
}

const { data: user } = useCustomFetch<User>('/api/auth/me', {
  lazy: true,
})

const logout = () => {
  useCustomFetch('/api/auth/logout', {
    method: 'POST',
  })
  localStorage.removeItem('token');
  router.push('/login');
}

</script>

<template>
  <div class="h-32 bg-gray-800 flex flex-col justify-center items-center">
    <h1 class="text-4xl">Admin dashboard</h1>
    <div class="p-4 dark:bg-white/10 rounded flex flex-col justify-between items-center mt-4 absolute top-0 right-0">
      <p class="px-2 mb-2">Your login as {{ user?.username }}</p>
      <button class="px-4 py-2 bg-red-500 text-white rounded" @click="logout">Logout</button>
    </div>
  </div>
</template>

<style scoped>

</style>