import { getAllPodcasts, IPost } from "~/server/database/schemas";

export default defineEventHandler(async () => {
  const podcasts = await getAllPodcasts()

  const podcastsFormatted = podcasts.map((podcast: IPost) => {
    return {
      title: podcast.title,
      slug: podcast.slug,
      type: podcast.type,
    }
  });

  return new Response(JSON.stringify({ podcasts: podcastsFormatted }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
})
