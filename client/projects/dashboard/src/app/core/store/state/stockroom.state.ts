import { Stockroom } from '../../models/stockroom.model';

export interface IStockroomState {
  stockrooms: Stockroom[];
  selectedStockroom: Stockroom;
}

export const initialStockroomState: IStockroomState = {
  stockrooms: [],
  selectedStockroom: null,
}
