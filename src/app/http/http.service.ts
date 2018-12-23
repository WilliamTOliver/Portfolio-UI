import { environment } from '../../environments/environment';
import axios, { AxiosInstance } from 'axios';
const api: AxiosInstance = axios.create({
  baseURL: environment.apiUrl,
  timeout: 10000
});
api.interceptors.request.use(
  (config) => {
    const spotifyAuth = JSON.parse(sessionStorage.getItem('spotifyAuth'));
    config.headers.Authorization = 'Bearer: ' + sessionStorage.getItem('authorization');
    config.headers.common['X-Spotify-Auth'] = spotifyAuth && spotifyAuth.access_token;
    return config;
  },
  (error) => Promise.reject(error)
);
export const API = api;
export const spotifyAPI: AxiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 10000
});
export const httpService: AxiosInstance = axios.create({
  timeout: 10000
});
