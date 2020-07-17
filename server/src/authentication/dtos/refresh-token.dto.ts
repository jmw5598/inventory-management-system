import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  public accessToken: string;

  @IsNotEmpty()
  public refreshToken: string;
}
