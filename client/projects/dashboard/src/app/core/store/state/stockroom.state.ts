import { Stockroom } from '../../models/stockroom.model';
import { StockroomSummary } from '../../models/stockroom-summary.model';

export interface IStockroomState {
  stockrooms: Stockroom[];
  selectedStockroom: Stockroom;
  stockroomSummaries: StockroomSummary[];
}

export const initialStockroomState: IStockroomState = {
  stockrooms: [],
  selectedStockroom: null,
  stockroomSummaries: []
}
