import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  public password: string;
}