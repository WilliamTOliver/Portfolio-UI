import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public pages = [];
  navEnd: Observable<NavigationEnd>;
  isHome = false;
  public get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  constructor(private authService: AuthService, private router: Router) {
    this.navEnd = this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }
  ngOnInit() {
    this.navEnd.subscribe(evt => this.isHome = evt.url === '/dashboard');
  }
}
