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
  constructor() {}
  login(credentials) {
    return API.post(APIURLS.login, credentials);
  }
  logout() {
    const promise = API.delete(`${APIURLS.auth}/${this.userDetails.userId}`);
    sessionStorage.removeItem('authorization');
    sessionStorage.removeItem('userDetails');
    return promise;
  }
  checkAuth() {
    return API.get(APIURLS.auth);
  }
}
