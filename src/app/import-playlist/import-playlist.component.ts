import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'app-import-playlist',
  templateUrl: './import-playlist.component.html',
  styleUrls: ['./import-playlist.component.scss']
})
export class ImportPlaylistComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private spotifyService: SpotifyService) {

  }
  ngOnInit() {
    this.spotifyService.getUserPlaylists().then( playlists => console.log(playlists))
    this.dataSource.sort = this.sort;
  }

}
