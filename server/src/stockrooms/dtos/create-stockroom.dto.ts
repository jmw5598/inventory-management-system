import { IsNotEmpty } from 'class-validator';

export class CreateStockroomDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;
}