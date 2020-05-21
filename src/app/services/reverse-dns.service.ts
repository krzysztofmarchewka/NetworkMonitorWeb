import { DNS } from './../models/DNS.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReverseDnsService {

  endpoint = '/dns';

  params = {
    q: ''
  }

  constructor(private http: HttpClient) { }

  checkDNS(ip: string) {
    this.params.q = ip;
    return this.http.get<string>(environment.REVERSE_DNS_API, { params: this.params, headers: { responseType: 'text' } });
  }

  getDNSs() {
    return this.http.get<DNS[]>(environment.API + this.endpoint);
  }

  createDNS(dns: DNS) {
    return this.http.post(environment.API + this.endpoint, dns);
  }


}
