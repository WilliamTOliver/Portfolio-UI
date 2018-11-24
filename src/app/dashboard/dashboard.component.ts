import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  get loggedIn(): boolean {
    return Boolean(sessionStorage.getItem('loggedIn'));
  }
  get proceedAsGuest(): boolean {
    return Boolean(sessionStorage.getItem('proceedAsGuest'));
  }
  constructor() {}
  ngOnInit() {
  }
}
