import { IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  public description: string;
}
