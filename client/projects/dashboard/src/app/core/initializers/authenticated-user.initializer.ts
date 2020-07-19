import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { IAppState } from '../store/state/app.state';
import { refreshToken, loginUserSuccess, logoutUser } from '../store/actions/authentication.actions';
import { AuthenticatedUser } from '../models/authenticated-user.model';
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
