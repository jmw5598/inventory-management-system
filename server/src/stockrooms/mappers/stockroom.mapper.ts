import { Stockroom } from '../entities/stockroom.entity';
import { StockroomSummary } from '../dtos/stockroom-summary.dto';

export class StockroomMapper {
  public static toStockroomSummary(raw: any[]): StockroomSummary[] {
    return raw.map(s => {
      return {
        stockroom: {
          id: s.id,
          name: s.name,
          description: s.description,
          createdAt: new Date(s.created_at),
          updatedAt: new Date(s.updated_at)
        } as Stockroom,
        itemCount: parseInt(s.item_count),
        purchaseValue: parseFloat(s.purchase_value || 0)
      } as StockroomSummary
    })
  }
}