import { ConfigService } from './../config/config.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  loadedChart: any;
  chartType: string;
  i18n: any;
  @Input() chartData: {type: string, chart: any};
  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.chartType = this.chartData.type;
    this.i18n = this.config.i18n.charts[this.chartType];
    this.loadedChart = this.chartData.chart;
  }
}
