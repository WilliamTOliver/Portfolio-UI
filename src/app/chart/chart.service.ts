import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }
  getCharts() {
    return HttpService.get('chart/');
  }
}
