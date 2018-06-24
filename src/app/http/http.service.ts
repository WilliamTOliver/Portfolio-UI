import { environment } from '../../environments/environment';
import axios, { AxiosInstance } from 'axios';
export const HttpService: AxiosInstance = axios.create({
      baseURL: environment.apiUrl,
      timeout: 10000,
    });
