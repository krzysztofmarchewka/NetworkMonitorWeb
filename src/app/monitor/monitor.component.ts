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
  data: any;
  data2: any;

  x: Date[];
  y: any[];
  z: any[];

  bytesSum = 0;
  packetsSum = 0;

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
    private _dateFormatPipe: DateFormatPipe
  ) {
    this.options = [
      { name: 'Single IP address', id: 1 },
      { name: 'List of the servers', id: 2 },
    ];
    this.selectedOption = this.options[0];

    this.data2 = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

    this.type = 'timeseries';
    this.width = '100%';
    this.height = '600';

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
    this.getIpOptions();
    this.getMonitorData();
  }

  getIpOptions() {
    this.ipSourceOptions.push({ id: 0, name: "" });
    this.ipDestinationOptions.push({ id: 0, name: "" });
    this.networkData.getAllData('', '').subscribe((networkData) => {
      var id = 0;
      networkData.forEach(data => {
        data.ip_src = data.ip_src.split(',')[0].replace('(', '');
        data.ip_dst = data.ip_dst.split(',')[0].replace('(', '');

        if (this.ipSourceOptions.find(x => x.name === data.ip_src) === undefined) {
          this.ipSourceOptions.push({ id: id, name: data.ip_src });
          id += 1;
        }
        if (this.ipSourceOptions.find(x => x.name === data.ip_dst) === undefined) {
          this.ipDestinationOptions.push({ id: id, name: data.ip_dst });
          id += 1;
        }

      });
      this.optionLoaded = true;
    });
  }

  aggregateData() {
    for (let data of this.ntData) {
      let dataFiltered = this.ntData.filter((x) => x.ip_dst === data.ip_dst);
      if (this.dataSummary.find((x) => x.ip === data.ip_dst) === undefined) {
        let temp = new NetworkSummary();
        temp.ip = data.ip_dst;
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
    this.dataLoaded = true;
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
