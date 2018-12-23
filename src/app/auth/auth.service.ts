import { APIURLS } from './../api-urls.enum';
import { API } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get token(): string {
    return sessionStorage.getItem('authorization');
  }
  constructor() {}
  login(credentials) {
    return API.post(APIURLS.login, credentials);
  }
  checkAuth() {
    return API.get(APIURLS.checkAuth);
  }
}
