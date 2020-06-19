import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateItemConditionDto {
  @IsNotEmpty()
  @MinLength(3)
  public description: string;
}