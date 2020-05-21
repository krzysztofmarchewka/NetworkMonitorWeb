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
  data: any;
  data2: any;
  pieData: any;

  x: Date[];
  y: any[];
  z: any[];

  bytesSum = 0;
  packetsSum = 0;

  DNSs: DNS[] = [];
  dataSummary: NetworkSummary[] = [];

  dataSource: any;
  type: string;
  width: string;
  height: string;

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

  constructor(
    private networkData: DbNetworkmonitorService,
    private _dateFormatPipe: DateFormatPipe,
    private reverseDnsService: ReverseDnsService,
    private spinner: NgxSpinnerService
  ) {
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
  }

  getDNSs() {
    this.reverseDnsService.getDNSs().subscribe(dnss => {
      this.DNSs = dnss;
    })
  }

  getIpOptions() {
    this.ipSourceOptions.push({ id: 0, name: '' });
    this.ipDestinationOptions.push({ id: 0, name: '' });
    this.networkData.getAllData('', '').subscribe((networkData) => {
      let id = 0;
      networkData.forEach(data => {
        data.ip_src = data.ip_src.split(',')[0].replace('(', '');
        data.ip_dst = data.ip_dst.split(',')[0].replace('(', '');

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
    for (const data of this.ntData) {
      const dataFiltered = this.ntData.filter((x) => x.ip_dst === data.ip_dst);
      if (this.dataSummary.find((x) => x.ip === data.ip_dst) === undefined) {
        const temp = new NetworkSummary();
        let fixed_ip = data.ip_dst.split(',')[0].replace('(', '');
        temp.ip = data.ip_dst;
        const dns = this.DNSs.find(x => x.ip === fixed_ip);
        if (dns !== undefined) {
          temp.name = dns.name;
        }
        dataFiltered.forEach((x) => {
          temp.packetsSent += x.packets;
          temp.bytesSent += x.bytes;
          this.bytesSum += x.bytes;
          this.packetsSum += x.packets;
        });
        this.dataSummary.push(temp);
      }
    }
    this.dataSummary.sort((a, b) => b.bytesSent - a.bytesSent);


    this.pieData = {
      labels: this.dataSummary.slice(1, 13).map(x => x.name),
      datasets: [
        {
          data: this.dataSummary.slice(1, 13).map(x => x.bytesSent),
          backgroundColor: uniqueColors,
          hoverBackgroundColor: uniqueColors
        }]
    };

    this.aggregatedDataLoaded = true;
    this.spinner.hide();
  }

  getMonitorData() {
    let filterSrcIp = '';
    let filterDstIp = '';
    if (this.ipSourceFilter !== undefined) {
      filterSrcIp = this.ipSourceFilter.name;
    }
    if (this.ipDestinationFilter !== undefined) {
      filterDstIp = this.ipDestinationFilter.name;
    }
    this.networkData.getAllData(filterSrcIp, filterDstIp).subscribe((nt_data) => {
      this.ntData = nt_data;
      this.x = nt_data.map((x) => x.stamp_inserted as Date);
      this.y = nt_data.map((x) => x.packets as number);
      this.z = nt_data.map((x) => x.bytes as number);

      const data = [];

      this.x.forEach((x) => {
        data.push([
          this._dateFormatPipe.transform(new Date(x)),
          this.y[this.x.indexOf(x)],
          this.z[this.x.indexOf(x)]
        ]);
      });

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
        },
      ];

      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );

      this.dataSource.data = fusionTable;

      this.chartsLoaded = true;
      this.aggregateData();
    }),
      (err) => console.log(err);
  }

  zip(arr1, arr2) {
    return arr1.map((k, i) => [k, arr2[i]]);
  }
}


export let uniqueColors = ['#FF6384','#36A2EB','#FFCE56','#0bff5b','#ab4c0a','#fb6167','#6cc8f9','#572bdd','#8b0578','#7e20c1','#01e83a','#585564','#1c65e8','#9c1916','#bd479b','#6231c2','#928a58','#4b747b','#202c4c','#d7bbce','#a47aab','#afed65','#f75fc8','#944b62','#042b3c','#b62886','#e1bae1','#57c85d','#39ab36','#bcf7bd','#763d72','#68395a','#795038','#964ca2','#fa9650','#ad3e68','#7a923b','#6f7747','#17d25d','#4fc32e']
