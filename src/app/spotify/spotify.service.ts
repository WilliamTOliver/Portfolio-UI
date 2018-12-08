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
  requestToken(code) {
    const headers = {
      headers: {
        Authorization: `Basic ${btoa(`${environment.spotifyClientId}:${environment.spotifyClientSecret}`)}`
      }
    };
    const body = {
      grant_type: 'authorization_code',
      redirect_uri: this.redirectUrl,
      code
    };
    return httpService.post('https://accounts.spotify.com/api/token', body, headers);
  }
}
