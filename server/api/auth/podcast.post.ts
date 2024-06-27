import { createPodcast } from "~/server/database/schemas";

export default defineEventHandler(async (event) => {
  const { name } = await readBody(event)

  const createdPodcast = await createPodcast(name)

  return new Response(JSON.stringify({ podcast: createdPodcast }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
})