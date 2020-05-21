import { NetworkMonitor } from './../models/NetworkMonitor.model';
import { DbNetworkmonitorService } from './../services/db-networkmonitor.service';
import { ReverseDnsService } from './../services/reverse-dns.service';
import { Component, OnInit } from '@angular/core';
import { DNS } from '../models/DNS.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reversedns',
  templateUrl: './reversedns.component.html',
  styleUrls: ['./reversedns.component.css']
})
export class ReversednsComponent implements OnInit {

  DNSs: DNS[];
  NetworkData: NetworkMonitor[];
  UniqueIps: string[] = [];

  constructor(private reverseDnsService: ReverseDnsService,
    private dbNetworkmonitorService: DbNetworkmonitorService
  ) { }

  ngOnInit(): void {
    this.getDNSs();
    this.getNetworkData();
  }

  getNetworkData() {
    this.dbNetworkmonitorService.getAllData('', '').subscribe(data => {
      this.NetworkData = data;
      data.forEach(ip => {
        this.UniqueIps.push(ip.ip_dst);
      });
    });
  }

  getDNSs() {
    this.reverseDnsService.getDNSs().subscribe(dnss => {
      this.DNSs = dnss;
    });
  }

  async updateDNS() {
    let i = 0;
    let r = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    console.log(this.UniqueIps);
    for (const ip of this.UniqueIps) {
      await this.delay(1000);
      if (i < 100) {
        i = i + 1;
        console.log(i);
        let t = ip.match(r)[0];
        const dns = this.DNSs.find(x => x.ip === t);
        console.log(dns)
        if (dns === null || dns === undefined) {
          this.checkDNS(t);
        }
      } else {
        return;
      }

    }
  }

  async checkDNS(ip: string) {

    await this.reverseDnsService.checkDNS(ip).subscribe(async data => {
      console.log(data);
      if (data !== 'no records found') {
        await this.reverseDnsService.createDNS(new DNS(ip, data.split(' ')[1])).subscribe(x => {
          console.log('Created dns ' + x);
          this.getDNSs();
        });
      }
      else {
        await this.reverseDnsService.createDNS(new DNS(ip, null)).subscribe(x => {
          console.log('Created dns ' + x);
          this.getDNSs();
        });
      }
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

