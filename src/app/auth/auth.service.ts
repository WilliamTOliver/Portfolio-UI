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
  get userDetails() {
    return JSON.parse(sessionStorage.getItem('userDetails'));
  }
  get isLoggedIn() {
    return Boolean(this.token);
  }
  constructor() {}
  setAuth(token) {
    sessionStorage.setItem('authorization', token);
  }
  login(credentials) {
    return API.post(APIURLS.login, credentials);
  }
  logout() {
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('userDetails');
    return;
  }
  checkAuth() {
    return API.get(APIURLS.auth);
  }
}
