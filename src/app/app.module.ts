import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MonitorComponent,
    NavbarComponent,
    HistoryComponent,
    ChartsComponent,
    SettingsComponent
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
    HttpClient
  ],
  providers: [HttpClientModule, DbNetworkmonitorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
