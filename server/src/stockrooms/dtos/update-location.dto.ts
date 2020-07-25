import { IsNotEmpty } from 'class-validator';

export class UpdateLocationDto {
  public id: number;
  
  @IsNotEmpty()
  public description: string;
}