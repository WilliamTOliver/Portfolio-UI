import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor(private authService: AuthService) { }
  getCharts() {
    return HttpService.get('chart/', this.authService.authorizedHeaders);
  }
}
