import { APIURLS } from './../api-urls.enum';
import { API } from './../http/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-import-playlist',
  templateUrl: './import-playlist.component.html',
  styleUrls: ['./import-playlist.component.scss']
})
export class ImportPlaylistComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    API.get(APIURLS.spotifyPlaylist, {})
    this.dataSource.sort = this.sort;
  }

}
