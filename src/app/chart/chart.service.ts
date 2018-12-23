import { Injectable } from '@angular/core';
import { API } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }
  getCharts() {
    return API.get('chart/');
  }
}
