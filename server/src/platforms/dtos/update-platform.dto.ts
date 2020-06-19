import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePlatformDto {
  @IsNotEmpty()
  @MinLength(3)
  public description: string;
}