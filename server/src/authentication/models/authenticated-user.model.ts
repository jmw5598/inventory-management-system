import { UserDetails } from './user-details.model';

export class AuthenticatedUser {
  public accessToken: string;
  public refreshToken: string;
  public prefix: string;
  public expiresIn: string;
  public userDetails: UserDetails 
}