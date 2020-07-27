import { IsNotEmpty } from 'class-validator';

export class CreateStockItemDto {
  @IsNotEmpty()
  public purchaseDate: Date;

  @IsNotEmpty()
  public purchasePrice: number;

  @IsNotEmpty()
  public productItemId: number;

  @IsNotEmpty()
  public itemConditionId: number;

  public locationId: number;
}
