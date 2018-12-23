import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  // TABLE PROPERTIES
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'tracks'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selected: any[] = [];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.spotifyService
      .getUserPlaylists()
      .then(playlists => {
        this.dataSource = new MatTableDataSource(
          playlists.map(playlist => {
            playlist.selected = false;
            return playlist;
          })
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch(console.log);
  }
  select(row) {
    row.selected = !row.selected;
    if (row.selected) {
      this.selected.push(row);
    } else {
      this.selected = this.selected.filter(item => item.id !== row.id);
    }
    sessionStorage.setItem('selectedPlaylists', JSON.stringify(this.selected));
  }
  getTracksClass(tracks) {
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
