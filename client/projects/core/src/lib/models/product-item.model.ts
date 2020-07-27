import { BaseModel } from './base.model';
import { Category } from './category.model';
import { ItemCondition } from './item-condition.model';

export class ProductItem extends BaseModel {
  public description: string;
  public sku: string;
  public brand: string;
  public model: string;
  public purchaseDate: Date;
  public itemCondition: ItemCondition;
  public stockroomId: number;
  public categories: Category[]; 
}
