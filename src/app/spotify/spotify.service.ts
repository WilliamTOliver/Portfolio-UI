import { APIURLS } from './../api-urls.enum';
import { API } from './../http/http.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  // Public Properties
  public selectedPlaylists = new BehaviorSubject<any>([]);
  public tracks = new BehaviorSubject<any>([]);

  // Private Properties
  private cachedSelectedPlaylistIds: string[] = [];
  private authorizationRedirect: string;
  private redirectUrl = 'http://localhost:4200/dashboard';
  private currentUserPlaylists: any;
  // Refactor into Observable/Behavior Subject?
  public get spotifyAuth() {
    return JSON.parse(sessionStorage.getItem('spotifyAuth'));
  }
  constructor(private authService: AuthService) {
    this.setAuthRedirect();
    this.selectedPlaylists.subscribe((playlists) => this.onSelectedPlaylistsChange(playlists));
  }
  private setAuthRedirect() {
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
  private onSelectedPlaylistsChange(playlists) {
    const playlistIds = playlists.map((playlist) => playlist.id);
    if (this.cachedSelectedPlaylistIds.length > playlists.length) {
      // Negative diff - need to filter out tracks
      const removedPlaylistIds = this.cachedSelectedPlaylistIds.filter((id) => {
        if (playlistIds.indexOf(id) === -1) {
          return id;
        }
      });
      const currentTracks = this.tracks.getValue();
      const trimmedTracks = currentTracks.filter((track) => {
        if (removedPlaylistIds.map((playlist) => playlist).indexOf(track.playlistId) === -1) {
          return track;
        }
      });
      this.tracks.next(trimmedTracks);
      this.cachedSelectedPlaylistIds = playlistIds;
    } else {
      // Positive Diff - need to get tracks
      const addedPlaylistIds = playlistIds.filter((id) => this.cachedSelectedPlaylistIds.indexOf(id) === -1);
      Promise.all(addedPlaylistIds.map((id) => this.fetchPlaylistTracks(id))).then((...args) => {
        const currentTracks = this.tracks.getValue();
        console.log(args);
      });
      this.cachedSelectedPlaylistIds = playlistIds;
    }
  }
  public requestAuth() {
    window.location.href = this.authorizationRedirect;
  }
  public setUser(user) {
    const spotifyAuth = this.spotifyAuth;
    spotifyAuth.user = user;
    sessionStorage.setItem('spotifyAuth', JSON.stringify(spotifyAuth));
  }
  public getUserPlaylists(): Promise<any> {
    return this.fetchUserPlaylists()
      .then((response) => {
        const filteredPlaylists = response.data.items.map((playlist) => {
          return {
            id: playlist.id,
            image: playlist.images && playlist.images.length > 0 && playlist.images[0].url,
            name: playlist.name,
            tracks: playlist.tracks.total
          };
        });
        return filteredPlaylists;
      })
      .catch((err) => console.log);
  }

  // API REQUESTS
  public requestToken(code) {
    return API.post(APIURLS.spotifyToken, { code, redirect_uri: this.redirectUrl, spotifyAuth: this.spotifyAuth });
  }
  public getUserInfo() {
    const storedAuth = sessionStorage.getItem('spotifyAuth');
    return storedAuth ? Promise.resolve(JSON.parse(storedAuth)) : API.get(APIURLS.spotifyUser);
  }

  public fetchUserPlaylists() {
    if (this.currentUserPlaylists) {
      return Promise.resolve(this.currentUserPlaylists);
    } else {
      return API.get(APIURLS.userPlaylists).then((playlists) => {
        this.currentUserPlaylists = playlists;
        return playlists;
      });
    }
  }
  public fetchPlaylistTracks(id) {
    console.log('​SpotifyService -> fetchPlaylistTracks -> id', id);
    // NOT CACHED ~ cached in onSelectedPlaylistsChange
    return API.get(APIURLS.playlistTracks.replace(':id', id)).then((tracks) => {
      return tracks;
    });
  }
}
