import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
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
  displayedColumns: string[] = ['name', 'numTracks'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selected: any[] = [];
  // LIFE CYCLE HOOKS
  constructor(private spotifyService: SpotifyService) {}
  ngOnInit() {
    this.buildTable();
  }
  // PUBLIC METHODS
  public select(row) {
    row.selected = !row.selected;
    if (row.selected) {
      this.selected.push(row);
    } else {
      this.selected = this.selected.filter(item => item.id !== row.id);
    }
    this.spotifyService.selectedPlaylists.next(this.selected);
    sessionStorage.setItem('selectedPlaylists', JSON.stringify(this.selected));
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // PRIVATE METHODS
  private buildTable() {
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
}
