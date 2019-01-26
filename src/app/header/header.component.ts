import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public pages = [
    {
      icon: 'home',
      route: ['dashboard'],
    },
    {
      icon: 'settings',
      route: ['dashboard/admin'],
    },
    {
      icon: 'exit_to_app',
      route: ['login'],
    },
  ];
  public get isLoggedIn() {
    return this.authService.isLoggedIn;
  }
  constructor(private authService: AuthService) {}
}
