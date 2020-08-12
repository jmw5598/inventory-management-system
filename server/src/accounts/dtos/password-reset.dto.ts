import { IsNotEmpty } from 'class-validator';

export class PasswordResetDto {
  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public passwordConfirm: string;

  @IsNotEmpty()
  public code: string
}