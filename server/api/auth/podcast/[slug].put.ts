import {publishPodcastBySlug, updatePodcastBySlug} from "~/server/database/schemas";
import {updateRss} from "~/server/rss/generator";

export default defineEventHandler(async (event) => {
  const slug: string = getRouterParam(event, 'slug') as string

  const podcastUpdate = await readBody<PodcastUpdate>(event)

  const updated = await updatePodcastBySlug(slug, podcastUpdate)

  await updateRss();

  return new Response(JSON.stringify(updated), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
})
