import {deletePodcastBySlug} from "~/server/database/schemas";
import {updateRss} from "~/server/rss/generator";

export default defineEventHandler(async (event) => {
  const slug: string = getRouterParam(event, 'slug') as string
  await deletePodcastBySlug(slug)

  await updateRss();

  return new Response(null, {
    status: 204,
  })
})
