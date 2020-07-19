import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from '../../../core/store/state/app.state';
import { UserCredentials } from '../../../core/models/user-credentials.model';
import { loginUser } from '../../../core/store/actions/authentication.actions';
import { selectAuthenticationErrorMessage } from '../../../core/store/selectors/authentication.selector';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'inv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public authenticationErrorMessage: Observable<string>

  constructor(
    private _authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.authenticationErrorMessage = this._store.select(selectAuthenticationErrorMessage);
    this.form = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false, [Validators.required]]
    });
    const rememberMe: UserCredentials = this._authenticationService.getStoredRememberMe();
    if (rememberMe) this.form.patchValue(rememberMe);
  }

  public submitForm(form: any): void {
    const user: UserCredentials = ({ 
      username: form.username, 
      password: form.password,
      rememberMe: form.rememberMe
    }) as UserCredentials;
    this._store.dispatch(loginUser(user));
  }
}
