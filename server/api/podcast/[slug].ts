import { getObjectUrl } from "~/server/minio/minioClient";
import { buildObjectURL } from "~/server/minio/utils";
import { Post } from "~/server/database/schemas";

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }

  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing slug parameter' })
    }
  }

  const post = await Post.findOne({ slug: slug })

  if (!post) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Podcast episode not found' })
    }
  }

  const charters = post.charters.map((charter) => {
    return {
      time: charter.time,
      description: charter.description,
    }
  })

  const logoUrl = buildObjectURL('logo.jpg')

  const formattedPost = {
    title: post.title,
    image: logoUrl,
    charters: charters,
    slug: post.slug,
    audioUrl: buildObjectURL(`episodes/${ post.audio_file_key }`),
    links: post.links.map((link) => {
      return {
        url: link.link,
        title: link.title,
      }
    }),
  }

  return {
    podcast: formattedPost,
  }
})
