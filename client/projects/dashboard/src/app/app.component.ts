import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isCollapsed: boolean = false;

  constructor() {}

  ngOnInit() {
  }
}
