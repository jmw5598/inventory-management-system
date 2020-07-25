import { IsNotEmpty } from 'class-validator';
import { CreateLocationDto } from './create-location.dto';

export class CreateStockroomDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;

  public locations: CreateLocationDto[]
}