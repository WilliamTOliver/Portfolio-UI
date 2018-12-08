import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { API } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor(private authService: AuthService) { }
  getCharts() {
    return API.get('chart/', this.authService.authorizedHeaders);
  }
}
