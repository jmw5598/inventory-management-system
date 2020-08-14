import { IsNotEmpty, IsInt, IsIn } from 'class-validator';
import { CategoryDto } from '../../categories/dtos/category.dto';

export class UpdateProductItemDto {
  @IsNotEmpty()
  @IsInt()
  public id: number;
  public title: string;
  public description: string;
  public sku: string;
  public make: string;
  public model: string;
  public category: CategoryDto;
}
