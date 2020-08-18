import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { buildUserFormGroup, buildProfileFormGroup, buildAccountFormGroup } from '@dashboard/shared/forms';

import { AccountValidators, Plan, Registration, RegistrationResult } from '@inv/core';
import { registerNewAccount, registerNewAccountResult } from '@dashboard/core/store/actions';
import { IAppState } from '@dashboard/core/store/state';
import { fadeAnimation } from '@dashboard/shared/animations';
import { RegistrationStep } from './registration-step.enum';
import { selectPlans, selectRegistrationResult } from '@dashboard/core/store/selectors';

@Component({
  selector: 'inv-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [fadeAnimation]
})
export class RegisterComponent implements OnInit {
  private _subscriptionSubject$: Subject<void>;
  public RegistrationStep = RegistrationStep;
  public form: FormGroup;
  public currentStep: number;
  public step: RegistrationStep;

  public registrationResult: RegistrationResult;
  public plans: Plan[];

  constructor(
    private _store: Store<IAppState>,
    private _formBuilder: FormBuilder,
    private _accountValidators: AccountValidators,
    private _router: Router
  ) {
    this._subscriptionSubject$ = new Subject<void>();
    this.form = this._formBuilder.group({
      user: buildUserFormGroup(
        this._formBuilder,
        this._accountValidators
      ),
      profile: buildProfileFormGroup(
        this._formBuilder,
        this._accountValidators
      ),
      account: buildAccountFormGroup(
        this._formBuilder,
        this._accountValidators
      )
    });
  }

  ngOnInit(): void {
    this.reset();
    this._store.select(selectRegistrationResult)
      .pipe(takeUntil(this._subscriptionSubject$))
      .subscribe((result: RegistrationResult) => this._handleNewRegistrationResult(result))
    
    this._store.select(selectPlans)
      .pipe(takeUntil(this._subscriptionSubject$))
      .subscribe((plans: Plan[]) => this.plans = plans);
  }

  public pre(): void {
    this.currentStep -= 1;
    this.changeContent();
  }

  public next(): void {
    this.currentStep += 1;
    this.changeContent();
  }

  public reset(): void {
    this.currentStep = 0;
    this.changeContent();
  }

  public result(): void {
    this.currentStep = 3;
    this.changeContent();
  }

  public changeContent(): void {
    switch (this.currentStep) {
      case 0: {
        this.step = RegistrationStep.USER;
        break;
      }
      case 1: {
        this.step = RegistrationStep.PROFILE;
        break;
      }
      case 2: {
        this.step = RegistrationStep.ACCOUNT;
        break;
      }
      case 3: {
        this.step = RegistrationStep.FINISH;
        break;
      }
      default: {
        this.step = RegistrationStep.ERROR;
      }
    }
  }

  public onSubmit(registration: Registration): void {
    this._store.dispatch(registerNewAccount(registration))
  }

  private _handleNewRegistrationResult(result: RegistrationResult): void {
    if (result) {
      if (result.status.trim().toUpperCase() === 'SUCCESS') 
        this.form.reset();
      this.registrationResult = result
      this.result();
      this._store.dispatch(registerNewAccountResult(null));
      setTimeout(() => this._handleRedirectAfterSuccess(), 5000)
    }
  }

  private _handleRedirectAfterSuccess(): void {
    this.reset();
    this._router.navigate(['/auth', 'login']);
  }

  ngOnDestroy() {
    this._subscriptionSubject$.next();
    this._subscriptionSubject$.complete();
  }
}
