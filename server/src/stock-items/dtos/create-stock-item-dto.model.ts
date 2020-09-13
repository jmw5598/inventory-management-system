import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

import { ProductItem } from '../../product-items/entities/product-item.entity';

export class CreateStockItemDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  public purchaseDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  public purchasePrice: number;

  @IsNotEmpty()
  public quantity: number;

  @IsNotEmpty()
  public itemConditionId: number; 
  
  @IsNotEmpty()
  public stockroomId: number;

  public locationId: number;

  @IsNotEmpty()
  public productItem: ProductItem;
}
