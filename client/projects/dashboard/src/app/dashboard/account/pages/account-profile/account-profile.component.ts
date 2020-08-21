import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { buildProfileFormGroup } from '@dashboard/shared/forms';
import { IAppState } from '@dashboard/core/store/state';
import { AccountValidators, Profile } from '@inv/core';
import { selectAccountProfile } from '@dashboard/core/store/selectors';
import { updateAccountProfile } from '@dashboard/core/store/actions';

@Component({
  selector: 'inv-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit, OnDestroy {
  private _subscriptionSubject: Subject<void>;
  public form: FormGroup;
  public accountProfile: Profile

  constructor(
    private _store: Store<IAppState>,
    private _formBuilder: FormBuilder,
    private _accountValidators: AccountValidators
  ) {
    this._subscriptionSubject = new Subject<void>();
    const profileFormGroup: FormGroup = buildProfileFormGroup(this._formBuilder, this._accountValidators);
    profileFormGroup.removeControl('email');
    this.form = this._formBuilder.group({ profile: profileFormGroup })
  }

  ngOnInit(): void {
    this._store.select(selectAccountProfile)
      .pipe(takeUntil(this._subscriptionSubject))
      .subscribe(
        (profile: Profile) => {
          if (profile) {
            this.form.get('profile').patchValue(profile);
          }
        });
  }

  public submitForm(form: any): void {
    const profile: Profile = form.profile || {} as Profile;
    this._store.dispatch(updateAccountProfile(profile));
  }

  ngOnDestroy(): void {
    this._subscriptionSubject.next();
    this._subscriptionSubject.complete();  
  }
}
