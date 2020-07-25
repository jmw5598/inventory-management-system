import { IsNotEmpty } from 'class-validator';
import { UpdateLocationDto } from './update-location.dto';

export class UpdateStockroomDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;

  public locations: UpdateLocationDto[];
}