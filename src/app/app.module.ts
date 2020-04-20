import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule } from '@angular/common/http';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MonitorComponent } from './monitor/monitor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HistoryComponent } from './history/history.component';
import { ChartsComponent } from './charts/charts.component';
import { SettingsComponent } from './settings/settings.component';
import { DbNetworkmonitorService } from './services/db-networkmonitor.service';
import * as FusionCharts from 'fusioncharts';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { FusionChartsModule } from 'angular-fusioncharts';
import { DateFormatPipe } from './pipes/date-format.pipe';

FusionChartsModule.fcRoot(FusionCharts, TimeSeries, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MonitorComponent,
    NavbarComponent,
    HistoryComponent,
    ChartsComponent,
    SettingsComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TabMenuModule,
    AccordionModule,
    CarouselModule,
    ChartModule,
    KeyFilterModule,
    HttpClientModule,
    FusionChartsModule
  ],
  providers: [HttpClientModule, DbNetworkmonitorService, DateFormatPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
