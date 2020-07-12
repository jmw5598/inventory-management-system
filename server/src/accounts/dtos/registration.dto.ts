import { IsNotEmpty } from 'class-validator';
import { CreateAccountDto } from './create-account.dto';
import { CreateUserDto } from './create-user.dto';

export class RegistrationDto {
  @IsNotEmpty()
  public account: CreateAccountDto;
  
  @IsNotEmpty()
  public user: CreateUserDto;
}