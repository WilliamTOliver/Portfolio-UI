import { APIURLS } from './../api-urls.enum';
import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get authorizedHeaders(): any {
    return {
      headers: { authorization: 'Bearer: ' + sessionStorage.getItem('authorization') }
    };
  }
  constructor() {}
  login(credentials) {
    return HttpService.post(APIURLS.login, credentials);
  }
  checkAuth() {
    return HttpService.get(APIURLS.checkAuth, this.authorizedHeaders);
  }
}
