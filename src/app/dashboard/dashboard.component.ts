import { MatDialog } from '@angular/material';
import { SpotifyService } from './../spotify/spotify.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CreatePlaylistDialogComponent } from '../create-playlist-dialog/create-playlist-dialog.component';

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
  // LIFE CYCLE HOOKS
  constructor(private route: ActivatedRoute, private router: Router, private spotifyService: SpotifyService, public dialog: MatDialog) {}
  ngOnInit() {
    const params: any = this.route.queryParams;
    if (params && params.value && params.value.code) {
      this.spotifyService.requestToken(params.value.code).then(this.onSpotifyTokenSuccess.bind(this));
    }
    this.spotifyService.tracks.subscribe(this.onTracksChange.bind(this));
  }
  // PUBLIC
  public navigate(page) {
    this.router.navigate([`dashboard/${page}`]);
  }
  public spotifyLogin() {
    this.spotifyService.requestAuth();
  }
  public applyFilter(filterValue) {
    this.spotifyService.globalFilter.next(filterValue);
  }
  public createPlaylist() {
    const dialogRef = this.dialog.open(CreatePlaylistDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(playlistName => {
      if (playlistName) {
        const filteredVals = this.spotifyService.filteredTracks.getValue();
        const playlistIds = Object.keys(filteredVals);
        const tracksArrays = playlistIds.map(playlistId => filteredVals[playlistId]);
        const mergedTracks = [].concat.apply([], tracksArrays);
        this.spotifyService.createPlaylist(mergedTracks.map(track => track.uri), playlistName).then(response => {
          this.spotifyService.globalFilter.next('');
        });
      }
    });
  }
  // PRIVATE
  private onSpotifyTokenSuccess(response) {
    sessionStorage.setItem('spotifyAuth', JSON.stringify(response.data));
    this.spotifyService
    .getUserInfo()
    .then((userInfo) => {
      this.spotifyService.setUser(userInfo.data);
    })
    .catch(console.log);
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
