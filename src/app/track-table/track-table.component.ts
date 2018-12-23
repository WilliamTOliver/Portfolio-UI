import { Component, OnInit, ViewChild, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'app-track-table',
  templateUrl: './track-table.component.html',
  styleUrls: ['./track-table.component.scss']
})
export class TrackTableComponent implements OnInit {
  // TABLE PROPERTIES
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'id'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.spotifyService.tracks.subscribe(console.log);
  }
  select(row) {
  }
  getTracksClass(tracks) {
  }
  applyFilter(filterValue: string) {
  }
}
