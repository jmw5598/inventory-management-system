import { IsNotEmpty } from 'class-validator';

export class UpdateStockroomDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;
}