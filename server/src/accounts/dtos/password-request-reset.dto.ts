import { IsNotEmpty, IsEmail } from 'class-validator';

export class PasswordRequestResetDto {
  @IsNotEmpty()
  public email: string;
}
