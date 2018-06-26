import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  private http = HttpService;
  constructor() { }
  getCharts() {
    return this.http.get('chart/build');
  }
}
