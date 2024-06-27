<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Тут адмінка для обраних
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="submitForm">
        <input v-model="username" type="text" placeholder="Username" required
               class="bg-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
        <input v-model="password" type="password" placeholder="Password" required
               class="bg-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
        <button type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const router = useRouter();

const submitForm = async () => {
  await $fetch('/api/login', {
    onRequest({ options }) {
      options.method = 'POST';
      options.body = JSON.stringify({ username: username.value, password: password.value });
    },
    onResponse({ response }) {
      const sessionId = response._data.sessionId;
      localStorage.setItem('sessionId', sessionId);

      router.push('/admin/dashboard');
    }
  })
};
</script>
