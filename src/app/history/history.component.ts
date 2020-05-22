import { Component, OnInit } from '@angular/core';
import { KeyFilterModule } from 'primeng/keyfilter';
import { FormBuilder } from '@angular/forms';
import { NetworkMonitor } from '../models/NetworkMonitor.model';
import { DbNetworkmonitorService } from '../services/db-networkmonitor.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historicalData: any

  constructor(private formBuilder: FormBuilder, private db: DbNetworkmonitorService) { }

  ngOnInit() {

  }

}
