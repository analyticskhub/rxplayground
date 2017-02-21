import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {

  constructor() { }
  streams: Object[] = [
    {name: "One", link:"one"},
    {name: "Two", link:"two"},
    {name: "Three", link:"three"}
  ];
  ngOnInit() {
  }

}
