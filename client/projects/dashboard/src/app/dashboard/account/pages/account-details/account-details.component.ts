import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { buildAccountFormGroup } from '@dashboard/shared/forms';;
import { Account, AccountValidators, Plan } from '@inv/core';
import { IAppState } from '@dashboard/core/store/state';
import { selectAccountDetails, selectPlans } from '@dashboard/core/store/selectors';
import { updateAccountDetails } from '@dashboard/core/store/actions';

@Component({
  selector: 'inv-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  public form: FormGroup;
  public plans$: Observable<Plan[]>;
  public accountDetails: Account;

  constructor(
    private _store: Store<IAppState>, 
    private _formBuilder: FormBuilder,
    private _accountValidator: AccountValidators
  ) {
    this._subscriptionSubject = new Subject<void>();
    this.form = this._formBuilder.group({
      account: buildAccountFormGroup(this._formBuilder, this._accountValidator)
    });
  }

  ngOnInit(): void {
    this.plans$ = this._store.select(selectPlans);
    this._store.select(selectAccountDetails)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(
        (account: Account) => {
          if (account) {
            this.form.get('account').patchValue(account);
          }
        });
  }

  public submitForm(form: any): void {
    const account: Account = form.account || {} as Account;
    this._store.dispatch(updateAccountDetails(account));
  }

  ngOnDestroy() {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();
  }
}
