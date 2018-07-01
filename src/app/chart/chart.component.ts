import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chart: any;
  chartType: string;
  i18n: any;
  loaded: boolean;
  @Input() chartData: {type: string, chart: any};
  constructor(private config: ConfigService) {
    this.getConfig();
  }

  ngOnInit() {
    this.chartType = this.chartData.type;
    this.chart = this.chartData.chart;
  }
}
