import { BaseModel } from './base.model';
import { Category } from './category.model';
import { ItemCondition } from './item-condition.model';

export class ProductItem extends BaseModel {
  public title: string;
  public description: string;
  public sku: string;
  public make: string;
  public model: string;
  public category: Category;
}
