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
  private charts: any;
  chartSummaries: AxiosResponse<any>;
  loaded: boolean;
  constructor(private configService: ConfigService, private chartService: ChartService ) {
    this.charts = this.configService.configData.charts;
    if (this.charts) {
      this.getChartSummaries();
    }
  }
  ngOnInit() {
  }
  private async getChartSummaries() {
    this.chartSummaries = await this.chartService.getChartSummaries(this.charts);
    this.loaded = true;
  }

}
