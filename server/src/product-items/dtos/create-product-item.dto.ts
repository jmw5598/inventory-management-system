import { IsNotEmpty } from 'class-validator';
import { CategoryDto } from '../../categories/dtos/category.dto';

export class CreateProductItemDto {
  @IsNotEmpty()
  public title: string;
  
  @IsNotEmpty()
  public description: string;

  public sku: string;
  public make: string;
  public model: string;

  @IsNotEmpty()
  public category: CategoryDto;
}
