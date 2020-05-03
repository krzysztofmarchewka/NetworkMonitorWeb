import { ReverseDnsService } from "./services/reverse-dns.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { NgxPaginationModule } from "ngx-pagination";
import { DropdownModule } from "primeng/dropdown";
import { AccordionModule } from "primeng/accordion";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TabMenuModule } from "primeng/tabmenu";
import { CarouselModule } from "primeng/carousel";
import { ChartModule } from "primeng/chart";
import { HttpClientModule } from "@angular/common/http";
import { KeyFilterModule } from "primeng/keyfilter";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { MonitorComponent } from "./monitor/monitor.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HistoryComponent } from "./history/history.component";
import { SettingsComponent } from "./settings/settings.component";
import { DbNetworkmonitorService } from "./services/db-networkmonitor.service";
import * as FusionCharts from "fusioncharts";
import * as TimeSeries from "fusioncharts/fusioncharts.timeseries";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { FusionChartsModule } from "angular-fusioncharts";
import { DateFormatPipe } from "./pipes/date-format.pipe";
import { NgApexchartsModule } from "ng-apexcharts";
import { ReversednsComponent } from "./reversedns/reversedns.component";

FusionChartsModule.fcRoot(FusionCharts, TimeSeries, FusionTheme);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MonitorComponent,
    NavbarComponent,
    HistoryComponent,
    SettingsComponent,
    DateFormatPipe,
    ReversednsComponent,
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
    FusionChartsModule,
    NgApexchartsModule,
    NgxPaginationModule,
  ],
  providers: [
    HttpClientModule,
    DbNetworkmonitorService,
    DateFormatPipe,
    ReverseDnsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
