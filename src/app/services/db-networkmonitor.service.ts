import { Injectable } from '@angular/core';
import { NetworkMonitor } from '../models/NetworkMonitor.model';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
 
@Injectable({
  providedIn: 'root'
})
export class DbNetworkmonitorService {

  url = 'http://localhost:'  //WPISAĆ API

  constructor(private http: HttpClient) { }

  getAllData(): Observable<NetworkMonitor[]> {
    return this.http.get<NetworkMonitor[]>(this.url + ''); // api dane
  }

  getDataByID(id: string): Observable<NetworkMonitor> {
    return this.http.get<NetworkMonitor>(this.url + '' + id) //api id dane
  }
  


}
