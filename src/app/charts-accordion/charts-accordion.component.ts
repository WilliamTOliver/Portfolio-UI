import { ChartService } from './../chart/chart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts-accordion',
  templateUrl: './charts-accordion.component.html',
  styleUrls: ['./charts-accordion.component.scss']
})
export class ChartsAccordionComponent implements OnInit {

  charts: any;
  chartData: any;
  loaded = false;
  icons: any[] = ['scatter_plot', 'expand_less', 'show_chart', 'show_chart'];
  toolbarCopy: any = {
    heading: 'William T Oliver'
  };
  constructor(private chartService: ChartService ) {
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
    this.loaded = true;
  }

}
