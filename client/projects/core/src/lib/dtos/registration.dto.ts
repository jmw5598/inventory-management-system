import { RegistrationAccount } from './registration-account.dto';
import { RegistrationProfile } from './registration-profile.dto';
import { RegistrationUser } from './registration-user.dto';

export class Registration {
  public account: RegistrationAccount
  public profile: RegistrationProfile;
  public user: RegistrationUser;
}