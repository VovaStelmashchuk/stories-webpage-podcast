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
  });
  localStorage.removeItem('sessionId');
  router.push('/login');
}

</script>

<template>
  <div class="h-48 flex justify-center items-center bg-gray-700">
    <h1 class="text-4xl">Admin dashboard</h1>
    <div
        class="p-4 dark:bg-white/10 rounded flex flex-col justify-center items-center mt-4 mr-4 absolute top-0 right-0">
      <p class="px-2 mb-2">Your login as {{ user?.username }}</p>
      <UButton @click="logout" color="red" size="xl">Logout</UButton>
    </div>
  </div>
</template>

<style scoped>

</style>
