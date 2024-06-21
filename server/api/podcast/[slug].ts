import Post from '../../database/schemas';
import { defineEventHandler, getRouterParam } from 'h3'

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

  const posts = await Post.findOne({ slug: slug })

  if (!posts) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Podcast episode not found' })
    }
  }

  const charters = posts.charters.map((charter) => {
    return {
      time: charter.time,
      description: charter.description,
    }
  })

  const formattedPost = {
    title: posts.title,
    image: posts.image_url,
    charters: charters,
    slug: posts.slug,
    audioUrl: posts.audioUrl,
  }

  return {
    podcast: formattedPost,
  }
})
