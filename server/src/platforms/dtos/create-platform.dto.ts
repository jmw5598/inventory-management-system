import { IsNotEmpty, MinLength } from 'class-validator';

export class CreatePlatformDto {
  @IsNotEmpty()
  @MinLength(3)
  public description: string;
}