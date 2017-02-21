import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }
  views: Object[] = [
    {
      name: "Home",
      description: "Get started here!",
      icon: "home",
       link: "home"
    },
    {
      name: "Observables",
      description: "Everything is a stream",
      icon: "transform",
      link: "streams"
    },
        {
      name: "Reports",
      description: "Analytics API",
      icon: "pets",
       link: "reports"
    },
        {
      name: "Potential dates",
      description: "Find your soulmate!",
      icon: "pets", 
      link: "streams"
    }
  ];
  ngOnInit() {
  }

}
