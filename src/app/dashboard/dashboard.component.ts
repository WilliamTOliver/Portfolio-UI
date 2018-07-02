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
  constructor(private configService: ConfigService, private chartService: ChartService ) {
    this.getChartSummaries();
  }
  ngOnInit() {
  }
  private async getChartSummaries() {
    const response = await this.chartService.getCharts();
    this.chartData = response.data;
    this.loaded = true;
  }
}
