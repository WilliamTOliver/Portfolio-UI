import { Component, OnInit, ViewChild, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.scss']
})
export class TrackTableComponent implements OnInit, OnChanges {
  // TABLE PROPERTIES
  @Input()
  playlists: any;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'tracks'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selected: any[] = [];
  @Output()
  selectedChanged = new EventEmitter();
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    if (this.playlists.length > 0) {
      console.log(this.playlists);
    }
  }
  ngOnChanges () {
    if (this.playlists.length > 0) {
      console.log(this.playlists);
    }
  }
  select(row) {
  }
  getTracksClass(tracks) {
  }
  applyFilter(filterValue: string) {
  }
}
