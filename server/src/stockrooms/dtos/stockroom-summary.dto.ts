import { Stockroom } from '../entities//stockroom.entity';

export class StockroomSummary {
  public stockroom: Stockroom;
  public itemCount: number;
  public listedCount: number;
  public purchaseValue: number;
}
