import Post from '../../database/schemas';
import { getObjectUrl } from "~/server/minio/minioClient";

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

  const formattedPost = {
    title: post.title,
    image: post.image_url,
    charters: charters,
    slug: post.slug,
    audioUrl: await getObjectUrl(`episodes/${ post.audio_file_key }`),
  }

  return {
    podcast: formattedPost,
  }
})
