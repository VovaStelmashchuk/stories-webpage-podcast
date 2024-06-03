// init mongo database connection

import mongoose from 'mongoose';

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD ? encodeURIComponent(process.env.DB_PASSWORD) : undefined;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;


const uri = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('We are connected to MongoDB!');
});


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
