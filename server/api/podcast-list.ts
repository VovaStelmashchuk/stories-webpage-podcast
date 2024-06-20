import Post from '../database/schemas';

export default defineEventHandler(async (event) => {
    if (event.method !== 'GET') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        }
    }

    const posts = await Post.find({type: {$in: ["public", "patreon"]}}).sort({publish_date: -1});

    const formattedPosts = posts.map(post => ({
        title: post.title,
        image: '/api/images/logo.jpg',
        description: post.charters.map(charter => charter.description).join(' '),
        slug: post.slug,
        type: post.type,
    }));

    return {
        posts: formattedPosts,
    }
})
