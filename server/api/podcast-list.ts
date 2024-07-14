import {buildObjectURL} from "~/server/minio/utils";
import {Post} from "~/server/database/schemas";

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    }
  }

  const posts = await Post.find({visibility: {$in: ["public"]}}).sort({publish_date: -1});

  const logoUrl = buildObjectURL('logo.jpg')

  const formattedPosts = posts.map(post => ({
    title: post.title,
    image: logoUrl,
    description: post.charters.map(charter => charter.description).join(' '),
    slug: post.slug,
    type: post.type,
  }));

  return {
    posts: formattedPosts,
  }
})


