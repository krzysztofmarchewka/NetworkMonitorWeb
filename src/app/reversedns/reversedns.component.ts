import { NetworkMonitor } from './../models/NetworkMonitor.model';
import { DbNetworkmonitorService } from './../services/db-networkmonitor.service';
import { ReverseDnsService } from './../services/reverse-dns.service';
import { Component, OnInit } from '@angular/core';
import { DNS } from '../models/DNS.model';

@Component({
  selector: 'app-reversedns',
  templateUrl: './reversedns.component.html',
  styleUrls: ['./reversedns.component.css']
})
export class ReversednsComponent implements OnInit {

  DNSs: DNS[];
  NetworkData: NetworkMonitor[];

  constructor(private reverseDnsService: ReverseDnsService,
    private dbNetworkmonitorService: DbNetworkmonitorService) { }

  ngOnInit(): void {
    this.getDNSs();
    this.getNetworkData();
  }

  getNetworkData() {
    this.dbNetworkmonitorService.getAllData("", "").subscribe(data => {
      this.NetworkData = data;
    });
  }

  getDNSs() {
    this.reverseDnsService.getDNSs().subscribe(dnss => {
      this.DNSs = dnss;
    });
  }

  async updateDNS() {
    var i = 0;
    console.log(this.NetworkData)
    for (let data of this.NetworkData) {
      await this.delay(1000);
      if (i < 2) {
        i = i + 1;
        console.log(i);
        let dns = this.DNSs.find(x => x.ip === data.ip_dst);
        if (dns === null || dns === undefined) {
          this.checkDNS(data.ip_dst);
        }
      } else {
        return;
      }

    }
  }

  async checkDNS(ip: string) {
    var r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

    var t = ip.match(r)[0];
    console.log(t);
    await this.reverseDnsService.checkDNS(t).subscribe(async data => {
      console.log(data);
      await this.reverseDnsService.createDNS(new DNS(t, data['result'][0]['name'])).subscribe(x => {
        console.log('Created dns ' + x);
        this.getDNSs();
      });
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
