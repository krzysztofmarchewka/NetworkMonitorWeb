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
  ipToCheck: string;
  dns: string;

  constructor(private reverseDnsService: ReverseDnsService
  ) { }

  ngOnInit(): void {
    this.getDNSs();
  }

  getDNSs() {
    this.reverseDnsService.getDNSs().subscribe(dnss => {
      this.DNSs = dnss;
    });
  }

  checkDNS() {
    this.dns = '';
    if (this.ipToCheck !== "" && this.ipToCheck !== undefined) {
      this.reverseDnsService.checkDNS(this.ipToCheck).subscribe(dns => {
        this.dns = (dns as DNS).name;
      });
    }
  }

}

