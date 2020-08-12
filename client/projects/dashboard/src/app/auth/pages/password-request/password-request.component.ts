import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { PasswordRequestReset, ResponseMessage } from '@inv/core';
import { Store } from '@ngrx/store';
import { passwordRequestReset, passwordRequestResetResult } from '../../../core/store/actions/account.actions';
import { IAppState } from '../../../core/store/state/app.state'
import { fadeAnimation } from '../../../shared/animations/fade-in-out.animation';
import { selectPasswordRequestResult } from '../../../core/store/selectors/account.selector';

@Component({
  selector: 'inv-password-request',
  templateUrl: './password-request.component.html',
  styleUrls: ['./password-request.component.scss'],
  animations: [fadeAnimation]
})
export class PasswordRequestComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public passwordRequestResetResult: Observable<ResponseMessage>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>
  ) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.passwordRequestResetResult = this._store.select(selectPasswordRequestResult)
      .pipe(
        filter(result => result !== null),
        distinctUntilChanged(),
        tap(() => this.form.reset())
      );
  }

  public onSubmit(passwordRequest: PasswordRequestReset): void {
    this._store.dispatch(passwordRequestReset(passwordRequest));
  }

  ngOnDestroy(): void {
     this._store.dispatch(passwordRequestResetResult(null))
  }
}
