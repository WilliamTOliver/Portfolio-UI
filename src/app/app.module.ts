import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemComponent } from './dashboard/item/item.component';
import { ContainerComponent } from './dashboard/container/container.component';
import { ChartComponent } from './chart/chart.component';
import { ChartService } from './chart/chart.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ItemComponent,
    ContainerComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
