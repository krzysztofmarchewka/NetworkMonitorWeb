import { Component, OnInit, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/api/menuitem";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  items: MenuItem[];
  activeItem: MenuItem;

  @ViewChild("menuItems") menu: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: "Home",
        icon: "pi pi-fw pi-home",
        tabindex: "0",
        routerLink: "/home",
      },
      {
        label: "Monitor",
        icon: "pi pi-fw pi-desktop",
        tabindex: "1",
        routerLink: "/monitor",
      },
      {
        label: "Reverse DNS",
        icon: "pi pi-fw pi-chart-bar",
        tabindex: "2",
        routerLink: "/reversedns",
      },
    ];
    this.currentPage()
  }
  activateMenu() {
    this.activeItem = this.menu["activeItem"];
  }
  currentPage(){
    if (this.items[0].tabindex === "0") {
      this.activeItem = this.items[0];
    }
    if (this.items[1].tabindex === "1") {
      this.activeItem = this.items[1];
    }
    if (this.items[2].tabindex === "2") {
      this.activeItem = this.items[2];
    }
  }
}
