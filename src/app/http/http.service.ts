import axios, { AxiosInstance } from 'axios';
const api: AxiosInstance = axios.create({
  baseURL: 'https://sjb-2-api.herokuapp.com/',
  timeout: 10000
});
api.interceptors.request.use(
  (config) => {
    // Apply Auth Tokens To All Requests ~ API decides which to consume and which not to consume
    // This keeps UI handling dumb to what endpoints are or aren't secure
    const spotifyAuth = JSON.parse(sessionStorage.getItem('spotifyAuth'));
    config.headers.Authorization = 'Bearer: ' + sessionStorage.getItem('authorization');
    config.headers.common['X-Spotify-Auth'] = spotifyAuth && spotifyAuth.access_token;
    return config;
  },
  (error) => Promise.reject(error)
);
api.interceptors.response.use(
  (config) => {
    if (config.status === 401 || config.status === 403) {
      sessionStorage.clear();
    }
    return config;
  }
);
export const API = api;
export const spotifyAPI: AxiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 10000
});
spotifyAPI.interceptors.response.use(
  (config) => {
    if (config.status === 401 || config.status === 403) {
      sessionStorage.clear();
    }
    return config;
  }
);
export const httpService: AxiosInstance = axios.create({
  timeout: 10000
});
