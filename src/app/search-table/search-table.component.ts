import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  // TABLE PROPERTIES
  searchData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'numTracks'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selected: any[] = [];
  unfollowed: string[] = [];
  // LIFE CYCLE HOOKS
  constructor(private spotifyService: SpotifyService, public dialog: MatDialog) {}
  ngOnInit() {
    this.spotifyService.userPlaylists.subscribe((playlists) => {
      this.buildTable(playlists);
    });
    this.spotifyService.getUserPlaylists().then((playlists) => {
      this.spotifyService.userPlaylists.next(playlists);
    });
    this.spotifyService.selectedPlaylists.subscribe(playlists => this.selected = playlists);
    this.spotifyService.unfollowedPlaylists.subscribe(playlistIds => this.unfollowed = playlistIds)
  }
  // PUBLIC METHODS
  public select(row) {
    row.selected = !row.selected;
    if (row.selected) {
      this.selected.push(row);
    } else {
      this.selected = this.selected.filter((item) => item.id !== row.id);
    }
    this.spotifyService.selectedPlaylists.next(this.selected);
  }
  public getTracksClass(tracks) {
    return tracks < 10
      ? 'tracks-blue'
      : tracks < 25
      ? 'tracks-green'
      : tracks < 50
      ? 'tracks-yellow'
      : tracks < 100
      ? 'tracks-orange'
      : 'tracks-red';
  }
  public applyFilter(filterValue: string) {
    this.searchData.filter = filterValue.trim().toLowerCase();

    if (this.searchData.paginator) {
      this.searchData.paginator.firstPage();
    }
  }
  public unfollowSelectedPlaylists() {
    const playlistIds = this.selected.map(playlist => playlist.id);
    const playlistNames = this.selected.map(playlist => playlist.name).join(', ');
    const message = `Playlists: \n${playlistNames} will be removed from your Spotify Library.`;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: {message}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.spotifyService.unfollowPlaylists(playlistIds);
      }
    });
  }
  public undoUnfollowMulti() {
    this.spotifyService.followPlaylists(this.spotifyService.unfollowedPlaylists.getValue());
  }
  // PRIVATE METHODS
  private async buildTable(playlists) {
    const deselectedPlaylists = playlists.map((playlist) => {
      playlist.selected = false;
      return playlist;
    });
    this.searchData = new MatTableDataSource(deselectedPlaylists);
    this.searchData.paginator = this.paginator;
    this.searchData.sort = this.sort;
  }
}
