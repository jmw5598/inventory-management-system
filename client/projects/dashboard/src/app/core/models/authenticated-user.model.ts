import { UserDetails } from './user-details.model';

export class AuthenticatedUser {
  public accessToken: string;
  public refreshToken: string;
  public createdAd: string;
  public expiresIn: string;
  public userDetails: UserDetails;
}
