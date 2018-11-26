import { SpotifyService } from './../spotify/spotify.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  spotifyAuthorized = false;
  constructor(private route: ActivatedRoute, private router: Router, private spotifyService: SpotifyService) {}
  ngOnInit() {
    const params: any = this.route.queryParams;
    if (params && params.value && params.value.code) {
      this.spotifyService.requestToken(params.value.code);
    }
  }
  navigate(page) {
    this.router.navigate([`dashboard/${page}`]);
  }
  spotifyLogin() {
    this.spotifyService.requestAuth();
  }
}
