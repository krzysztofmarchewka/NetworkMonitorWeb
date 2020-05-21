import { NetworkSummary } from './../models/NetworkSummary.model';
import { Injectable } from '@angular/core';
import { NetworkMonitor } from '../models/NetworkMonitor.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DbNetworkmonitorService {

  endpoint = '/scans';

  constructor(private http: HttpClient) { }

  getAllData(ipSourceFiler, ipDestinationFilter): Observable<NetworkMonitor[]> {
    const params = {
      SourceIP: ipSourceFiler,
      DestinationIP: ipDestinationFilter
    }
    return this.http.get<NetworkMonitor[]>(environment.API + this.endpoint, { params }); // api dane
  }

  getSummary(): Observable<NetworkSummary[]> {
    return this.http.get<NetworkSummary[]>(environment.API + this.endpoint + '/summary'); // api dane
  }

  getDataByID(id: string): Observable<NetworkMonitor> {
    return this.http.get<NetworkMonitor>(environment.API + this.endpoint + '' + id) //api id dane
  }



}
