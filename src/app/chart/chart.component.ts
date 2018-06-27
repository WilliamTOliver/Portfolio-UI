import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  loadedChart: any;
  @Input() chart: any;
  constructor() {}

  ngOnInit() {
    this.loadedChart = this.chart;
  }
}
