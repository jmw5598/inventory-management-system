import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  public id: number;

  @IsNotEmpty()
  public description: string;
}
