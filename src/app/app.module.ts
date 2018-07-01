import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './chart/chart.component';
import { ChartService } from './chart/chart.service';
import { NgxEchartsModule } from 'ngx-echarts';
import { ConfigService } from './config/config.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    NgxEchartsModule
  ],
  providers: [ChartService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
