import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IAppState } from '../../../core/store/state/app.state';
import { UserCredentials } from '../../../core/models/user-credentials.model';
import { loginUser } from '../../../core/store/actions/authentication.actions';
import { selectAuthenticationErrorMessage } from '../../../core/store/selectors/authentication.selector';

@Component({
  selector: 'inv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public authenticationErrorMessage: Observable<string>

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.authenticationErrorMessage = this._store.select(selectAuthenticationErrorMessage);

    this.form = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false, [Validators.required]]
    })
  }

  public submitForm(form: any): void {
    const user: UserCredentials = ({ 
      username: form.username, 
      password: form.password 
    }) as UserCredentials;
    this._store.dispatch(loginUser(user));
  }
}
