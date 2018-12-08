import { environment } from '../../environments/environment';
import axios, { AxiosInstance } from 'axios';
export const API: AxiosInstance = axios.create({
  baseURL: environment.apiUrl,
  timeout: 10000
});
export const spotifyAPI: AxiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 10000
});
export const httpService: AxiosInstance = axios.create({
  timeout: 10000
});
