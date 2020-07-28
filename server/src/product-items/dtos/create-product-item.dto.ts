import { IsNotEmpty } from 'class-validator';
import { CategoryDto } from '../../categories/dtos/category.dto';

export class CreateProductItemDto {
  @IsNotEmpty()
  public title: string;
  
  @IsNotEmpty()
  public description: string;

  public sku: string;

  @IsNotEmpty()
  public brand: string;

  @IsNotEmpty()
  public model: string;

  @IsNotEmpty()
  public category: CategoryDto;
}
