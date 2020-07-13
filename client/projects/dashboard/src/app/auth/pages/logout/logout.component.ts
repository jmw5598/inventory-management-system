import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'inv-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private _router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      // @@@ TODO Do cleanup for login out here (ej clear localstorage)
      this._router.navigate(['../login']);
    }, 2000);
  }
}
