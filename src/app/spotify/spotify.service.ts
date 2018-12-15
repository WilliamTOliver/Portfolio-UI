import { APIURLS } from './../api-urls.enum';
import { API } from './../http/http.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { httpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  authorizationRedirect: string;
  redirectUrl = 'http://localhost:4200/dashboard';
  get spotifyAuth() {
    return JSON.parse(sessionStorage.getItem('spotifyAuth'));
  }
  constructor(private authService: AuthService) {
    const options = {
      response_type: 'code',
      client_id: environment.spotifyClientId,
      scope: 'user-read-private user-read-recently-played user-top-read playlist-modify-private playlist-read-private',
      redirect_uri: this.redirectUrl,
      state: this.authService.token
    };
    const params = new URLSearchParams();
    for (const key in options) {
      if (key) {
        params.set(key, options[key]);
      }
    }
    this.authorizationRedirect = 'https://accounts.spotify.com/authorize?' + params.toString();
  }
  requestAuth() {
    window.location.href = this.authorizationRedirect;
  }
  setUser(user) {
    const spotifyAuth = this.spotifyAuth;
    spotifyAuth.user = user;
    sessionStorage.setItem('spotifyAuth', JSON.stringify(spotifyAuth));
  }

  // API REQUESTS
  requestToken(code) {
    return API.post(
      APIURLS.spotifyToken,
      { code, redirect_uri: this.redirectUrl, spotifyAuth: this.spotifyAuth },
      this.authService.authorizedHeaders
    );
  }
  getUserInfo() {
    return API.get(APIURLS.spotifyUser.replace(':token', this.spotifyAuth.access_token), this.authService.authorizedHeaders);
  }
  getUserPlaylists(): Promise<any> {
    return API.get(APIURLS.userPlaylists.replace(':token', this.spotifyAuth.access_token),  this.authService.authorizedHeaders);
  }
}
