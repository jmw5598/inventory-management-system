import { Stockroom, StockroomSummary } from '@inv/core';

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
