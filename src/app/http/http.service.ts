import { environment } from '../../environments/environment';
import axios, { AxiosInstance } from 'axios';
export const HttpService: AxiosInstance = axios.create({
      headers: {authorization: 'Bearer: ' + sessionStorage.getItem('authorization')},
      baseURL: environment.apiUrl,
      timeout: 10000,
    });
