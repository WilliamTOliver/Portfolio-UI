import { MatDialog } from '@angular/material';
import { SpotifyService } from './../spotify/spotify.service';
import { Component, OnInit } from '@angular/core';
import { CreatePlaylistDialogComponent } from '../create-playlist-dialog/create-playlist-dialog.component';

@Component({
  selector: 'app-playlist-manager',
  templateUrl: './playlist-manager.component.html',
  styleUrls: ['./playlist-manager.component.scss']
})
export class PlaylistManagerComponent implements OnInit {
  selectedPlaylistsWithTracks: any[] = [];
  // LIFE CYCLE HOOKS
  constructor(private spotifyService: SpotifyService, public dialog: MatDialog) {}
  ngOnInit() {
    this.spotifyService.tracks.subscribe(this.onTracksChange.bind(this));
  }
  // PUBLIC
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
