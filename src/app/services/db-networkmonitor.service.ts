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

  getAllData(): Observable<NetworkMonitor[]> {
    return this.http.get<NetworkMonitor[]>(environment.API + this.endpoint); // api dane
  }

  getDataByID(id: string): Observable<NetworkMonitor> {
    return this.http.get<NetworkMonitor>(environment.API + this.endpoint + '' + id) //api id dane
  }



}
