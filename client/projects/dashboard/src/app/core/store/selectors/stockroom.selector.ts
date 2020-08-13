import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IStockroomState } from '../state/stockroom.state';

export const selectStockroomState = createFeatureSelector<IStockroomState>('stockrooms');

export const selectCurrentStockrooms = createSelector(
  selectStockroomState,
  (state: IStockroomState) => state.stockrooms
);

export const selectSelectedStockroom = createSelector(
  selectStockroomState, 
  (state: IStockroomState) => state.selectedStockroom
);

export const selectStockroomSummaries = createSelector(
  selectStockroomState,
  (state: IStockroomState) => state.stockroomSummaries
);

export const selectCreateStockroomResponseMessage = createSelector(
  selectStockroomState,
  (state: IStockroomState) => state.createStockroomResponseMessage
);

export const selectUpdateStockroomResponseMessage = createSelector(
  selectStockroomState,
  (state: IStockroomState) => state.updateStockoormResponseMessage
);
