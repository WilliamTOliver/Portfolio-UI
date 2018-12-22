import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.scss']
})
export class SearchTableComponent implements OnInit {
  showSearchTable = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['image', 'name', 'tracks'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.spotifyService
      .getUserPlaylists()
      .then((playlists) => {
        console.log('​SearchTableComponent -> ngOnInit -> playlists', playlists);
        this.dataSource = new MatTableDataSource(playlists);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSearchTable = true;
      })
      .catch(console.log);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
