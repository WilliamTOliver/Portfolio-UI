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
    this.selectedPlaylists.subscribe(playlists =>
      this.onSelectedPlaylistsChange(playlists)
    );
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
      .then(response => {
        const filteredPlaylists = response.data;
        return filteredPlaylists;
      })
      .catch(err => console.log);
  }

  // API REQUESTS
  public requestToken(code) {
    return API.post(APIURLS.spotifyToken, {
      code,
      redirect_uri: this.redirectUrl,
      spotifyAuth: this.spotifyAuth
    });
  }
  public getUserInfo() {
    const storedAuth = sessionStorage.getItem('spotifyAuth');
    return storedAuth
      ? Promise.resolve(JSON.parse(storedAuth))
      : API.get(APIURLS.spotifyUser);
  }

  public fetchUserPlaylists() {
    if (this.currentUserPlaylists) {
      return Promise.resolve(this.currentUserPlaylists);
    } else {
      return API.get(APIURLS.userPlaylists).then(playlists => {
        this.currentUserPlaylists = playlists;
        return playlists;
      });
    }
  }
  public fetchPlaylistTracks(id) {
    // NOT CACHED ~ cached in onSelectedPlaylistsChange
    return API.get(APIURLS.playlistTracks.replace(':id', id)).then(tracks => {
      return tracks;
    });
  }
  private setAuthRedirect() {
    const options = {
      response_type: 'code',
      client_id: environment.spotifyClientId,
      scope:
        'user-read-private user-read-recently-played user-top-read playlist-modify-private playlist-read-private',
      redirect_uri: this.redirectUrl,
      state: this.authService.token
    };
    const params = new URLSearchParams();
    for (const key in options) {
      if (key) {
        params.set(key, options[key]);
      }
    }
    this.authorizationRedirect =
      'https://accounts.spotify.com/authorize?' + params.toString();
  }
  private onSelectedPlaylistsChange(playlists) {
    const playlistIds = playlists.map(playlist => playlist.id);
    if (this.cachedSelectedPlaylistIds.length > playlists.length) {
      // Negative diff
      this.trimDeselectedPlaylistTracks(playlistIds);
    } else {
      // Positive Diff
      this.updateTracksWithNewlySelectedPlaylistTracks(playlistIds);
    }
    this.cachedSelectedPlaylistIds = playlistIds;
  }
  private trimDeselectedPlaylistTracks(ids) {
    const removedPlaylistIds = this.cachedSelectedPlaylistIds.filter(id => {
      if (ids.indexOf(id) === -1) {
        return id;
      }
    });
    const currentTracks = this.tracks.getValue();
    for (const id of removedPlaylistIds) {
      delete currentTracks[id];
    }
    this.tracks.next(currentTracks);
  }
  private updateTracksWithNewlySelectedPlaylistTracks(ids) {
    const addedPlaylistIds = ids.filter(
      id => this.cachedSelectedPlaylistIds.indexOf(id) === -1
    );
    const oversizedPlaylistIds = ids
      .filter(playlist => playlist.numTracks > 100 && playlist.id)
      .map(obj => obj.id);
    const resolved = [];
    const newTracks = {};
    addedPlaylistIds.map(id => {
      if (oversizedPlaylistIds.indexOf(id) > -1) {
        // Playlist too big to fetch all tracks and details in one go, force playlist refactor before proceeding.
        newTracks[id] = [];
        resolved.push(Promise.resolve());
      } else {
        const promise = this.fetchPlaylistTracks(id).then(response => {
          newTracks[id] = response.data;
        });
        resolved.push(promise);
      }
    });
    if (resolved.length > 0) {
      Promise.all(resolved).then(() => {
        const currentTracks = this.tracks.getValue();
        this.tracks.next(Object.assign(currentTracks, newTracks));
      });
    }
  }
}
