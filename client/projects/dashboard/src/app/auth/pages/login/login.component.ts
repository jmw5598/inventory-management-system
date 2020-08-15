import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationService, AuthenticatedStatus, UserCredentials } from '@inv/core';
import { IAppState, IAuthenticationState } from '@dashboard/core/store/state';
import { loginUser } from '@dashboard/core/store/actions';
import { selectAuthenticationState } from '@dashboard/core/store/selectors';
import { fadeAnimation } from '@dashboard/shared/animations';

@Component({
  selector: 'inv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeAnimation]
})
export class LoginComponent implements OnInit, OnDestroy {
  private _authenticationStateSubscription: Subscription;
  public authenticationState: IAuthenticationState;
  public form: FormGroup;
  public queryParamMessage$: Observable<string>;

  constructor(
    private _authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder,
    private _store: Store<IAppState>,
    private _router: Router,
    private _route: ActivatedRoute
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
      
    this.queryParamMessage$ = this._route.queryParams.pipe(
      map(params => params['message'])
    );
    
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
