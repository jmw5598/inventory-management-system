import { BaseModel } from './base.model';
import { Platform } from './platform.model';

export class ListedItem extends BaseModel {
  public listedDate: Date;
  public listedPrice: number;
  public soldDate: Date;
  public soldPrice: number;
  public shippingCost: number;
  public additionalFees: number;
  public quantity: number;
  public externalId: string;
  public platform: Platform;
}
