import axios from 'axios';

const API_BASE_URL =  'http://192.168.1.1:3000';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiEndpoints = {
    posts: () => {
        return api.get(`/posts`);
    },
    comments: () => {
        return api.get(`/comments`);
    },

};

export default api;