import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { NzTabPosition } from 'ng-zorro-antd/tabs';

import { Account, Profile } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { selectAccountDetails, selectAccountProfile } from '@dashboard/core/store/selectors';
import { updateAccountProfile, updateAccountDetails } from '@dashboard/core/store/actions';


@Component({
  selector: 'inv-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public accountDetails$: Observable<Account>;
  public accountProfile$: Observable<Profile>;

  constructor(private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.accountDetails$ = this._store.select(selectAccountDetails);
    this.accountProfile$ = this._store.select(selectAccountProfile);
  }
}
