import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { AuthenticationService, AuthenticatedUser } from '@inv/core';
import { IAppState } from '../store/state/app.state';
import { refreshToken, loginUserSuccess, logoutUser } from '../store/actions/authentication.actions';
import { selectAuthenticatedUser } from '../store/selectors/authentication.selector';

export function authenticatedUserInitializer(
    store: Store<IAppState>, authenticationSerivce: AuthenticationService) {

  const user: AuthenticatedUser = authenticationSerivce.getStoredAuthenticatedUser();

  return () => new Promise<boolean>(resolve => {
    if (user) {
      store.dispatch(loginUserSuccess(user));
      store.dispatch(refreshToken());
    } else {
      store.dispatch(logoutUser())
    }
    store.select(selectAuthenticatedUser)
      .pipe(take(1))
      .subscribe(user => resolve(true))    
  });
};
