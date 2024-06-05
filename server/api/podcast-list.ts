import Post from '../database/schemas';

export default defineEventHandler(async (event) => {
    if (event.method !== 'GET') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        }
    }

    const posts = await Post.find()

    const formattedPosts = posts.map(post => ({
        title: post.title,
        image: post.image_url,
        description: post.description,
    }));

    return {
        posts: formattedPosts,
    }
})
