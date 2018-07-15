import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { ChartService } from '../chart/chart.service';
import { AxiosResponse } from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  charts: any;
  chartData: any;
  loaded = false;
  icons: any[] = ['scatter_plot', 'expand_less', 'show_chart', 'show_chart'];
  constructor(private configService: ConfigService, private chartService: ChartService ) {
    this.getChartSummaries();
  }
  ngOnInit() {
  }
  private async getChartSummaries() {
    const comapre = (a, b) => {
        if (a.sortWeight < b.sortWeight) {
          return -1;
         }
       if (a.sortWeight > b.sortWeight) {
         return 1;
       }
      return 0;
    };
    const response = await this.chartService.getCharts();
    this.chartData = response.data.sort(comapre);
    console.log(this.chartData)
    this.loaded = true;
  }
}
