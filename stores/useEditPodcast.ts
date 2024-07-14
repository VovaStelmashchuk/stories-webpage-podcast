import {defineStore} from "pinia";


interface PodcastDetailsState {
  podcasts: Record<string, PodcastDetails>;
}

export const useEditPodcastStore = defineStore("editPodcast", {
  state: (): PodcastDetailsState => ({
    podcasts: {},
  }),
  getters: {
    getPodcastBySlug(state) {
      return (slug: string) => state.podcasts[slug];
    },
    getPodcastCharter(state) {
      return (slug: string, index: number) => state.podcasts[slug].charters[index];
    },
    getPodcastLink(state) {
      return (slug: string, index: number) => state.podcasts[slug].links[index];
    }
  },
  actions: {
    async fetchPodcast(slug: string) {
      try {
        this.podcasts[slug] = await $fetch<PodcastDetails>(`/api/auth/podcast/${slug}`);
      } catch (error) {
        console.error("Fetch podcast failed", error);
        throw new Error("Fetch podcast failed");
      }
    },
    async addLocalCharter(slug: string) {
      this.podcasts[slug].charters.push({
        time: '',
        description: '',
      })
    },
    async addLocalLink(slug: string) {
      this.podcasts[slug].links.push({
        link: '',
        title: '',
      })
    },
    updateLocalCharterTime(slug: string, index: number, time: string) {
      this.podcasts[slug].charters[index].time = time;
    },
    async savePodcast(slug: string) {
      try {
        await $fetch(`/api/auth/podcast/${slug}`, {
          method: 'PUT',
          body: JSON.stringify(this.podcasts[slug]),
        });
      } catch (error) {
        console.error("Save podcast failed", error);
        throw new Error("Save podcast failed");
      }
    }
  },
});
