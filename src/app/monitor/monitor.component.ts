import { Observable } from 'rxjs';
import { DNS } from './../models/DNS.model';
import { ReverseDnsService } from './../services/reverse-dns.service';
import { NetworkSummary } from './../models/NetworkSummary.model';
import { NetworkMonitor } from './../models/NetworkMonitor.model';
import { Component, OnInit } from '@angular/core';
import { DbNetworkmonitorService } from '../services/db-networkmonitor.service';
import * as FusionCharts from 'fusioncharts';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { KeyFilterModule } from 'primeng/keyfilter';
import { NgxSpinnerService } from 'ngx-spinner';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef } from '@angular/core';

export interface Option {
  name: string;
  id: number;
}

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
})
export class MonitorComponent implements OnInit {
  ntData: NetworkMonitor[] = [];
  chartsLoaded = false;
  dataLoaded = false;
  aggregatedDataLoaded = false;
  pieBytesChartLoaded = false;
  piePacketsChartLoaded = false;
  pieBytesData: any;
  piePacketsData: any;

  bytesSum = 0;
  packetsSum = 0;

  DNSs: DNS[] = [];
  dataSummary: NetworkSummary[] = [];

  from: Date;
  to: Date;

  dataSource: any;
  type: string;
  width: string;
  height: string;

  pieBytesChartType: Option;
  piePacketsChartType: Option;

  optionLoaded = false;
  ipSourceOptions: Option[] = [];
  ipDestinationOptions: Option[] = [];

  ipSourceFilter: Option;
  ipDestinationFilter: Option;

  config: any;
  showSingleIp: false;
  showListIp: false;
  options: Option[];
  selectedOption: Option;

  chartTypes: Option[] = [{ name: 'bar', id: 1 },
  { name: 'doughnut', id: 2 },
  { name: 'polarArea', id: 3 },
  { name: 'pie', id: 4 },
  { name: 'radar', id: 5 }]

  constructor(
    private networkData: DbNetworkmonitorService,
    private _dateFormatPipe: DateFormatPipe,
    private reverseDnsService: ReverseDnsService,
    private spinner: NgxSpinnerService,
    private ref: ChangeDetectorRef
  ) {

    this.from = new Date('2020-05-21');
    this.to = new Date('2020-05-22');

    this.pieBytesChartType = this.chartTypes[0];
    this.piePacketsChartType = this.chartTypes[1];

    this.options = [
      { name: 'Single IP address', id: 1 },
      { name: 'List of the servers', id: 2 },
    ];
    this.selectedOption = this.options[1];

    this.type = 'timeseries';
    this.width = '100%';
    this.height = '700';

    // This is the dataSource of the chart
    this.dataSource = {
      caption: {
        text: 'Data flow analysis',
      },
      chart: {
        theme: 'gammel',
      },
      subcaption: {
        text: 'Initial time interval spread is from 1-Feb-2019 to 1-Dec-2021',
      },
      data: null,
      xaxis: {
        initialinterval: {
          from: '1-Feb-2019 00:00:00',
          to: '1-Dec-2021 00:00:00',
        },
      },
    };

    this.config = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: this.dataSummary.length,
    };
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  ngOnInit() {
    this.spinner.show();
    this.getDNSs();
    this.getIpOptions();
    this.getMonitorData();
    this.aggregateData();
  }

  getDNSs() {
    this.reverseDnsService.getDNSs().subscribe(dnss => {
      this.DNSs = dnss;
    })
  }

  getIpOptions() {
    this.ipSourceOptions.push({ id: 0, name: '' });
    this.ipDestinationOptions.push({ id: 0, name: '' });
    this.networkData.getAllData('', '', this.from, this.to).subscribe((networkData) => {
      let id = 0;
      networkData.forEach(data => {
        if (this.ipSourceOptions.find(x => x.name === data.ip_src) === undefined) {
          this.ipSourceOptions.push({ id, name: data.ip_src });
          id += 1;
        }
        if (this.ipSourceOptions.find(x => x.name === data.ip_dst) === undefined) {
          this.ipDestinationOptions.push({ id, name: data.ip_dst });
          id += 1;
        }

      });
      this.optionLoaded = true;
    });
  }

  aggregateData() {
    this.networkData.getSummary().subscribe(summary => {
      summary.forEach(sum => {
        this.bytesSum += sum.bytesSent;
        this.packetsSum += sum.packetsSent;
        const dns = this.DNSs.find(x => x.ip === sum.ip);
        if (dns !== undefined) {
          sum.name = dns.name;
        }
      })
      this.dataSummary = summary;
      this.pieBytesData = {
        labels: this.dataSummary.slice(1, 10).map(x => x.name),
        datasets: [
          {
            data: this.dataSummary.slice(1, 10).map(x => x.bytesSent),
            backgroundColor: uniqueColors,
            hoverBackgroundColor: uniqueColors
          }]
      };

      this.piePacketsData = {
        labels: this.dataSummary.slice(1, 10).map(x => x.name),
        datasets: [
          {
            data: this.dataSummary.slice(1, 10).map(x => x.packetsSent),
            backgroundColor: uniqueColors,
            hoverBackgroundColor: uniqueColors
          }]
      };

      this.aggregatedDataLoaded = true;
      this.pieBytesChartLoaded = true;
      this.piePacketsChartLoaded = true;
      this.spinner.hide();
    });
  }

  getMonitorData() {
    this.chartsLoaded = false;
    let filterSrcIp = '';
    let filterDstIp = '';
    if (this.ipSourceFilter !== undefined) {
      filterSrcIp = this.ipSourceFilter.name;
    }
    if (this.ipDestinationFilter !== undefined) {
      filterDstIp = this.ipDestinationFilter.name;
    }
    console.log(this.from.toISOString(), this.to.toISOString())
    this.networkData.getAllData(filterSrcIp, filterDstIp, this.from, this.to).subscribe((nt_data) => {
      this.ntData = nt_data;
      let _x = nt_data.map((el) => el.stamp_inserted as Date);
      let _y = nt_data.map((el) => el.packets as number);
      let _z = nt_data.map((el) => el.bytes as number);

      _x = _x.map(el => this._dateFormatPipe.transform(el));

      console.log(_x);

      const data: [[Date, number, number]] = zip(_x, _y, _z);

      const schema = [
        {
          name: 'Time',
          type: 'date',
          format: '%d-%b-%y %-I:%-M:%-S',
        },
        {
          name: 'Packtes',
          type: 'number',
        },
        {
          name: 'Bytes',
          type: 'number',
        }
      ];

      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );

      this.dataSource.data = fusionTable;

      this.chartsLoaded = true;
    }),
      (err) => console.log(err);
  }

  // method needed to properly reload chart
  async detectBytesChartChange($event) {
    this.pieBytesChartLoaded = false;
    this.pieBytesChartType = $event.value;
    await this.delay(100);
    this.pieBytesChartLoaded = true;
  }

  // method needed to properly reload chart
  async detectPacketsChartChange($event) {
    this.piePacketsChartLoaded = false;
    this.piePacketsChartType = $event.value;
    await this.delay(100);
    this.piePacketsChartLoaded = true;
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const zip = (arr, ...arrs) => {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}

export let uniqueColors = ['#FF6384', '#36A2EB', '#FFCE56', '#0bff5b', '#ab4c0a', '#fb6167', '#6cc8f9',
  '#572bdd', '#8b0578', '#7e20c1', '#01e83a', '#585564', '#1c65e8', '#9c1916', '#bd479b',
  '#6231c2', '#928a58', '#4b747b', '#202c4c', '#d7bbce', '#a47aab', '#afed65', '#f75fc8',
  '#944b62', '#042b3c', '#b62886', '#e1bae1', '#57c85d', '#39ab36', '#bcf7bd', '#763d72',
  '#68395a', '#795038', '#964ca2', '#fa9650', '#ad3e68', '#7a923b', '#6f7747', '#17d25d']
