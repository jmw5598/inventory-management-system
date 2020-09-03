import { ItemCondition } from './item-condition.model';
import { Location } from './location.model';
import { ProductItem } from './product-item.model';
import { Stockroom } from './stockroom.model';

export class StockItem {
  public id: number;
  public purchaseDate: Date;
  public purchasePrice: number;
  public quantity: number;
  public itemCondition: ItemCondition;
  public stockroom: Stockroom;
  public location: Location;
  public productItem: ProductItem;
  // @@@ TODO list of listings???
}
