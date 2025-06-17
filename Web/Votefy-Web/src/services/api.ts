import axios from 'axios';

export const API_BASE_URL = 'https://votefy-server-web-app.onrender.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
});
