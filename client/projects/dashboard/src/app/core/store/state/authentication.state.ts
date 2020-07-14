import { AuthenticatedUser } from '../../models/authenticated-user.model';
import { AuthenticatedStatus } from '../../enums/authenticated-status.enum';

export interface IAuthenticationState {
  authenticatedUser: AuthenticatedUser;
  authenticatedStatus: AuthenticatedStatus;
  errorMessage: string;
}

export const initialAuthenticationState: IAuthenticationState = {
  authenticatedUser: null,
  authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
  errorMessage: null
}
