import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'app-playlist-table',
  templateUrl: './playlist-table.component.html',
  styleUrls: ['./playlist-table.component.scss']
})
export class PlaylistTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private spotifyService: SpotifyService) {

  }
  ngOnInit() {
    this.spotifyService.getUserPlaylists().then( playlists => console.log(playlists));
    this.dataSource.sort = this.sort;
  }

}
