<script setup lang="ts">

const store = useUserStore();
const router = useRouter();

const logout = async () => {
  await store.logout();
  await router.push({name: 'login'});
}

</script>

<template>
  <router-link :to="{ name: 'admin-dashboard' }">
    <div class="h-48 flex justify-center items-center">
      <h1 class="text-4xl">Admin dashboard</h1>
      <div
          class="p-4 dark:bg-white/10 rounded flex flex-col justify-center items-center mt-4 mr-4 absolute top-0 right-0">
        <p class="px-2 mb-2">Your login as {{ store.user?.username }}</p>
        <UButton @click="logout" color="red" size="xl">Logout</UButton>
      </div>
    </div>
  </router-link>
  <UDivider/>
</template>

<style scoped></style>
