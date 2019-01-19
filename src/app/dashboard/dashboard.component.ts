import { SpotifyService } from './../spotify/spotify.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // LIFE CYCLE HOOKS
  constructor(private route: ActivatedRoute, private router: Router, private spotifyService: SpotifyService) {}
  ngOnInit() {
    const params: any = this.route.queryParams;
    if (params && params.value && params.value.code) {
      this.spotifyService.requestToken(params.value.code).then(this.onSpotifyTokenSuccess.bind(this));
    }
  }
  // PUBLIC
  public spotifyLogin() {
    this.spotifyService.requestAuth();
  }
  // PRIVATE
  private onSpotifyTokenSuccess(response) {
    sessionStorage.setItem('spotifyAuth', JSON.stringify(response.data));
    this.spotifyService
    .getUserInfo()
    .then((userInfo) => {
      this.spotifyService.setUser(userInfo.data);
      this.router.navigate(['/dashboard/playlist-manager']);
    })
    .catch(console.log);
  }
}
