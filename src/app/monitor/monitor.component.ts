import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { NetworkMonitor } from '../models/NetworkMonitor.model';
import { DbNetworkmonitorService } from '../services/db-networkmonitor.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
})
export class MonitorComponent implements OnInit {

  nt_data: NetworkMonitor[] = [];
  data: any
  data2: any
  responsiveOptions;

  constructor(private networkData: DbNetworkmonitorService) {
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

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    }

    this.data2 = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
  }


  ngOnInit() {
  }

  getMonitorData() {
    this.networkData.getAllData().subscribe(nt_data => {
      this.nt_data = nt_data
    }),
      err => console.log(err);
  }
}
