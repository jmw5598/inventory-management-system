import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { IAppState } from '../store/state/app.state';
import { refreshToken, loginUserSuccess, logoutUser } from '../store/actions/authentication.actions';
import { AuthenticatedUser } from '../models/authenticated-user.model';
import { selectAuthenticatedUser } from '../store/selectors/authentication.selector';

export function authenticatedUserInitializer(store: Store<IAppState>) {
  const authenticatedUser: AuthenticatedUser = JSON.parse(
    localStorage.getItem('authenticatedUser')) as AuthenticatedUser;
  
  return () => new Promise<boolean>(resolve => {
    if (authenticatedUser) {
      store.dispatch(loginUserSuccess(authenticatedUser));
      store.dispatch(refreshToken());
    } else {
      store.dispatch(logoutUser())
    }

    store.select(selectAuthenticatedUser)
      .pipe(take(1))
      .subscribe(user => resolve(true))    
  });
};