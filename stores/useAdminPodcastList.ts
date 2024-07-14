import {defineStore} from "pinia";

interface Podcast {
  name: string;
  slug: string;
  type: string;
}

interface PodcastState {
  podcasts: Podcast[];
}

export const useAdminPodcastListStore = defineStore("adminPodcastList", {
  state: (): PodcastState => ({
    podcasts: [],
  }),
  getters: {
    getPodcasts: (state) => state.podcasts,
  },
  actions: {
    async fetchPodcasts() {
      try {
        const response = await $fetch<{ podcasts: Podcast[] }>("/api/auth/podcasts");
        this.podcasts = response.podcasts;
      } catch (error) {
        console.error("Fetch podcasts failed", error);
        throw new Error("Fetch podcasts failed");
      }
    },
    async deletePodcast(slug: string) {
      await $fetch(`/api/auth/podcast/${slug}`, {
        method: 'delete',
      });
    },
  },
});
