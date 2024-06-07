import axios from 'axios';

export async function getEpisodes() {
    try {
        const response = await axios.get('/api/podcast-list');
        return response.data.posts;
    } catch (error) {
        console.error(error);
    }
}