import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IAppState } from '../../../core/store/state/app.state';
import { IAuthenticationState } from '../../../core/store/state/authentication.state';
import { UserCredentials } from '../../../core/models/user-credentials.model';
import { loginUser } from '../../../core/store/actions/authentication.actions';
import { selectAuthenticationState } from '../../../core/store/selectors/authentication.selector';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { AuthenticatedStatus } from '../../../core/enums/authenticated-status.enum';

@Component({
  selector: 'inv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private _authenticationStateSubscription: Subscription;
  public authenticationState: IAuthenticationState;
  public form: FormGroup;

  constructor(
    private _authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private _router: Router
  ) {
    this.form = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this._authenticationStateSubscription = this._store.select(selectAuthenticationState)
      .subscribe(state => {
        this.authenticationState = state;
        if(state.authenticatedStatus === AuthenticatedStatus.AUTHENTICATED) {
          this._router.navigate(['dashboard', 'home']);
        }
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

  ngOnDestroy() {
    if (this._authenticationStateSubscription)
      this._authenticationStateSubscription.unsubscribe();
  }
}
