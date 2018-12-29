import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.scss']
})
export class TrackTableComponent implements OnInit {
  @Input()
  data: any;
  @Input()
  type: string;
  get hasTracks() {
    return this.data && this.data.tracks && this.data.tracks.length > 0;
  }
  // TABLE PROPERTIES
  trackData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'album', 'artist'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.trackData = new MatTableDataSource(this.data.tracks);
    this.trackData.paginator = this.paginator;
    this.trackData.sort = this.sort;
  }
  select(row) {}
  applyFilter(filterValue: string) {
    this.trackData.filter = filterValue.trim().toLowerCase();

    if (this.trackData.paginator) {
      this.trackData.paginator.firstPage();
    }
  }
  refactorPlaylist(method, by) {
    this.spotifyService.refactorPlaylist(this.data.id, { method, by, playlistName: this.data.name });
  }
  duplicateSelectedPlaylist() {
    const tracks = this.data.tracks.map((track) => track.uri);
    const name = this.data.name + '- Copy';
    this.spotifyService.createPlaylist(tracks, name);
  }
  unfollowSelectedPlaylist() {
    this.spotifyService.unfollowPlaylist(this.data.id);
  }
}
