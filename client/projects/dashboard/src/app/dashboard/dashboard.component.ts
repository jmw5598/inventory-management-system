import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'inv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public isCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
