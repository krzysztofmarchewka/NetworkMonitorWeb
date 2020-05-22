import { DNS } from './../models/DNS.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReverseDnsService {

  endpoint = '/dns';

  constructor(private http: HttpClient) { }

  getDNSs() {
    return this.http.get<DNS[]>(environment.API + this.endpoint);
  }

  createDNS(dns: DNS) {
    return this.http.post(environment.API + this.endpoint, dns);
  }

  checkDNS(ip: string) {
    const dns: DNS = { ip, name: '' };
    return this.http.post(environment.API + this.endpoint + '/check', dns);
  }


}
