import {getPodcastBySlug} from "~/server/database/schemas";
import {buildObjectURL} from "~/server/minio/utils";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    return new Response(JSON.stringify({message: 'Missing slug parameter'}), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const podcast = await getPodcastBySlug(slug)

  if (!podcast) {
    return new Response(JSON.stringify({message: 'Podcast episode not found'}), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const charters: Charter[] = podcast.charters.map((charter) => {
    return {
      time: charter.time,
      description: charter.description,
    }
  })

  const links: Link[] = podcast.links.map((link) => {
    return {
      link: link.link,
      title: link.title,
    }
  })

  const formattedPost: PodcastDetails = {
    title: podcast.title,
    charters: charters,
    slug: podcast.slug,
    audioUrl: buildObjectURL(`episodes/${podcast.audio_file_key}`),
    links: links,
  }

  return new Response(JSON.stringify(formattedPost), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
})
