import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  items:MenuItem[];
  activeItem: MenuItem;
  @ViewChild('menuItems') menu: MenuItem[];

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', tabindex: '0', routerLink: '/home'  },
      { label: 'Monitor', icon: 'pi pi-fw pi-desktop', tabindex: '1', routerLink: '/monitor'},
      { label: 'History', icon: 'pi pi-fw pi-pencil', tabindex: '2', routerLink: '/history' },
      { label: 'Charts', icon: 'pi pi-fw pi-chart-bar', tabindex: '3', routerLink: '/charts' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog', tabindex: '4', routerLink: '/settings' }
    ];
    this.activeItem = this.items[0];
  }
  activateMenu() {
    this.activeItem = this.menu['activeItem'];
  }
}
