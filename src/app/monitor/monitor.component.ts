import { NetworkSummary } from './../models/NetworkSummary.model';
import { NetworkMonitor } from './../models/NetworkMonitor.model';
import { Component, OnInit } from '@angular/core';
import { DbNetworkmonitorService } from '../services/db-networkmonitor.service';
import * as FusionCharts from 'fusioncharts';
import { DateFormatPipe } from '../pipes/date-format.pipe';

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
  responsiveOptions;
  x: Date[];
  y: any[];

  bytesSum = 0;
  packetsSum = 0;

  dataSummary: NetworkSummary[] = [];

  dataSource: any;
  type: string;
  width: string;
  height: string;

  constructor(private networkData: DbNetworkmonitorService,
    private _dateFormatPipe: DateFormatPipe) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.data2 = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
    };

    this.type = 'timeseries';
    this.width = '100%';
    this.height = '400';

    // This is the dataSource of the chart
    this.dataSource = {
      caption: {
        text: 'Packet analysis'
      },
      chart: {
        theme: 'fusion'
      },
      subcaption: {
        text: 'Initial time interval spread is from 1-Feb-2019 to 1-Dec-2021'
      },
      data: null,
      yaxis: [
        {
          plot: {
            value: 'Grocery Sales Value'
          },
          format: {
            prefix: '$'
          },
          title: 'Sale Value'
        }
      ],
      xaxis: {
        initialinterval: {
          from: "1-Feb-2019 00:00:00",
          to: "1-Dec-2021 00:00:00"
        },
      }
    };
  }


  ngOnInit() {
    this.getMonitorData();
  }

  aggregateData() {

    for (let data of this.ntData) {
      let dataFiltered = this.ntData.filter(x => x.ip_dst === data.ip_dst)
      if (this.dataSummary.find(x => x.ip === data.ip_dst) === undefined) {
        let temp = new NetworkSummary();
        temp.ip = data.ip_dst;
        dataFiltered.forEach(x => {
          temp.packetsSent += x.packets;
          temp.bytesSent += x.bytes;
          this.bytesSum += x.bytes;
          this.packetsSum += x.packets;
        })
        this.dataSummary.push(temp);
      }
    }
    this.dataSummary.sort((a,b) => b.bytesSent - a.bytesSent);
    this.dataLoaded = true;
  }

  getMonitorData() {
    this.networkData.getAllData().subscribe(nt_data => {

      this.ntData = nt_data;
      this.x = nt_data.map(x => x.stamp_inserted as Date);
      this.y = nt_data.map(x => x.packets as number);

      const data = [];

      this.x.forEach(x => {
        data.push([this._dateFormatPipe.transform(new Date(x)), this.y[this.x.indexOf(x)]]);
      });

      const schema = [
        {
          name: 'Time',
          type: 'date',
          format: '%d-%b-%y %-I:%-M:%-S'
        },
        {
          name: 'Quantity',
          type: 'number',
        },
      ];

      console.log(data);

      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );

      this.dataSource.data = fusionTable;

      this.chartsLoaded = true;
      this.aggregateData();
    }),
      err => console.log(err);
  }


  zip(arr1, arr2) {
    return arr1.map((k, i) => [k, arr2[i]]);
  }



}
