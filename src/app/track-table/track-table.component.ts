import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

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
  // TABLE PROPERTIES
  trackData: MatTableDataSource<any>;
  displayedColumns: string[] = ['name'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() {}

  ngOnInit() {
    console.log(this.data.tracks.map(trackobj => trackobj.track));
    console.log(this.type);
    this.trackData = new MatTableDataSource(this.data.tracks.map(trackobj => trackobj.track));
  }
  select(row) {
  }
  getTracksClass(tracks) {
  }
  applyFilter(filterValue: string) {
  }
}
