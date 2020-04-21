import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reversedns',
  templateUrl: './reversedns.component.html',
  styleUrls: ['./reversedns.component.css']
})
export class ReversednsComponent implements OnInit {

  ipAddress = ''
  domainName = ''

  constructor() { }

  ngOnInit(): void {
  }

  onIpReveal() {
    return this.ipAddress = ' Goha GOHA GOHA 3zł'
  }

  onDNReveal(){
    return this.domainName = 'Rafonix'
  }
}
