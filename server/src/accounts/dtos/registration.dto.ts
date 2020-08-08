import { IsNotEmpty } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';
import { CreateAddressDto } from './create-address.dto';
import { CreateUserDto } from './create-user.dto';
import { CreateProfileDto } from './create-profile.dto';

export class RegistrationDto {
  @IsNotEmpty()
  public account: CreateAccountDto;

  @IsNotEmpty()
  public profile: CreateProfileDto;
  
  @IsNotEmpty()
  public user: CreateUserDto;
}