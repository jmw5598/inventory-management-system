import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, filter, take, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { AccountsService } from '../services/accounts.service';
import { ValidatorResult } from '../models/validator-result.model';


@Injectable()
export class AccountValidators  {
  constructor(private _accountsService: AccountsService) {}

  validateEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[key: string]: any}> => {
      return control.valueChanges.pipe(
        debounceTime(500),
        filter(value => value.trim().length > 0),
        take(1),
        switchMap(() => this._accountsService.validateEmail(control.value)
          .pipe(
            map((result: ValidatorResult) => 
              result.isValid ? null : { emailExists: true }),
            catchError(error => of(null))
          )
        )
      );
    }
  }

  validateUsername(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[key: string]: any}> => {
      return control.valueChanges.pipe(
        debounceTime(500),
        filter(value => value.trim().length > 0),
        take(1),
        switchMap(() => this._accountsService.validateUsername(control.value)
          .pipe(
            map((result: ValidatorResult) => 
              result.isValid ? null : { usernameExists: true }),
            catchError(error => of(null))
          )
        )
      );
    }
  }
}