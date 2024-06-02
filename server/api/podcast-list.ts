export default defineEventHandler((event) => {
    if (event.method !== 'GET') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        }
    }
    // return mock list with 5 podcast , each item has id, title, description, image, and audio
    return {
        "podcasts": [
            {
                "id": "1",
                "title": "Podcast 1",
                "description": "Very long description for podcast 1",
                "image": "https://via.placeholder.com/150",
            },
            {
                "id": "2",
                "title": "Podcast 2",
                "description": "Very long description for podcast 2",
                "image": "https://via.placeholder.com/150",
            },
            {
                "id": "3",
                "title": "Podcast 3",
                "description": "Very long description for podcast 3",
                "image": "https://via.placeholder.com/150",
            },
            {
                "id": "4",
                "title": "Podcast 4",
                "description": "Very long description for podcast 4",
                "image": "https://via.placeholder.com/150",
            },
            {
                "id": "5",
                "title": "Podcast 5",
                "description": "Very long description for podcast 5",
                "image": "https://via.placeholder.com/150",
            }
        ]
    }
})
