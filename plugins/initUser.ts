import { defineNuxtPlugin } from "#app";
import { useUserStore } from "~/stores/useUser";

export default defineNuxtPlugin(async () => {
  const userStore = useUserStore();

  try {
    await userStore.updateMe();
  } catch (error) {
    console.error('Login failed', error);
  }
});
