import { Stockroom, StockroomSummary, ResponseMessage } from '@inv/core';

export interface IStockroomState {
  stockrooms: Stockroom[];
  selectedStockroom: Stockroom;
  stockroomSummaries: StockroomSummary[];
  createStockroomResponseMessage: ResponseMessage,
  updateStockoormResponseMessage: ResponseMessage
}

export const initialStockroomState: IStockroomState = {
  stockrooms: [],
  selectedStockroom: null,
  stockroomSummaries: [],
  createStockroomResponseMessage: null,
  updateStockoormResponseMessage: null
}
