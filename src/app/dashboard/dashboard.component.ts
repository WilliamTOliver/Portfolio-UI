import { SpotifyService } from './../spotify/spotify.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedPlaylistsWithTracks: any[] = [];
  get spotifyAuthorized(): boolean {
    return Boolean(sessionStorage.getItem('spotifyAuth'));
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifyService
  ) {}
  ngOnInit() {
    const params: any = this.route.queryParams;
    if (params && params.value && params.value.code) {
      this.spotifyService
        .requestToken(params.value.code)
        .then(this.onSpotifyTokenSuccess.bind(this));
    } else {
      this.spotifyService
        .getUserInfo()
        .then(userInfo => {
          this.spotifyService.setUser(userInfo.data);
          this.spotifyService.getUserPlaylists().then(playlists => {
            this.spotifyService.userPlaylists.next(playlists);
          });
        })
        .catch(console.log);
    }
    this.spotifyService.tracks.subscribe(this.onTracksChange.bind(this));
  }
  public navigate(page) {
    this.router.navigate([`dashboard/${page}`]);
  }
  public spotifyLogin() {
    this.spotifyService.requestAuth();
  }
  private onSpotifyTokenSuccess(response) {
    sessionStorage.setItem('spotifyAuth', JSON.stringify(response.data));
    this.router.navigate(['/dashboard']);
  }
  private onTracksChange(tracks) {
    const newSelectedPlaylists = [];
    const currentSelectedPlaylists = this.spotifyService.selectedPlaylists.getValue();
    for (const playlist of currentSelectedPlaylists) {
      playlist.tracks = tracks[playlist.id];
      newSelectedPlaylists.push(playlist);
    }
    this.selectedPlaylistsWithTracks = newSelectedPlaylists;
  }
}
