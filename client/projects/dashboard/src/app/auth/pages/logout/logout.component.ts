import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { IAppState } from '../../../core/store/state/app.state';
import { logoutUser } from '../../../core/store/actions/authentication.actions';
import { fadeAnimation } from '../../../shared/animations/fade-in-out.animation';

@Component({
  selector: 'inv-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  animations: [fadeAnimation]
})
export class LogoutComponent implements OnInit {
  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    setTimeout(() => this._store.dispatch(logoutUser()), 2000);
  }
}
