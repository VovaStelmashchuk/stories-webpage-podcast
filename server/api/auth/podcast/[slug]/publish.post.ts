import {publishPodcastBySlug} from "~/server/database/schemas";
import {updateRss} from "~/server/rss/generator";

export default defineEventHandler(async (event) => {
  const slug: string = getRouterParam(event, 'slug') as string

  const updated = await publishPodcastBySlug(slug)

  await updateRss();

  return new Response(JSON.stringify(updated), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
})
