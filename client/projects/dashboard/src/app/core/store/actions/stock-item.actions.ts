import { createAction, props } from '@ngrx/store';
import { StockItem, Page, IPageable } from '@inv/core';

export enum StockItemActions {
  CREATE_STOCK_ITEM = '[Stock Item] Create Stock Item',
  CREATE_STOCK_ITEM_SUCCESS = '[Stock Item] Create Stock Item Success',
  DELETE_STOCK_ITEM = '[Stock Item] Delete Stock Item',
  DELETE_STOCK_ITEM_SUCCESS = '[Stock Item] Delete Stock Item Success',
  LIST_STOCK_ITEM = '[Stock Item] List Stock Item',
  LIST_STOCK_ITEM_SUCCESS = '[Stock Item] List Stock Item Success',
  SEARCH_STOCK_ITEMS = '[Stock Item] Search Stock Items',
  SEARCH_STOCK_ITEMS_SUCCESS = '[Stock Item] Search Stock Items Success',
  UPDATE_STOCK_ITEM = '[Stock Item] Update Stock Item',
  UPDATE_STOCK_ITEM_SUCCESS = '[Stock Item] Update Stock Item Success'
};

export interface StockItemSearch {
  searchTerm: string;
  // @@@ TODO - Additional search aptions, stockroom id, listed or unlisted ect..
  pageable: IPageable;
}

export const createStockItem = createAction(
  StockItemActions.CREATE_STOCK_ITEM,
  props<StockItem>()
);

export const createStockItemSuccess = createAction(
  StockItemActions.CREATE_STOCK_ITEM_SUCCESS,
  (item: StockItem) => ({ payload: item })
);

export const deleteStockItem = createAction(
  StockItemActions.DELETE_STOCK_ITEM,
  props<{ id: number }>()
);

export const deleteStockItemSuccess = createAction(
  StockItemActions.DELETE_STOCK_ITEM_SUCCESS,
  (item: StockItem) => ({ payload: item })
);

export const listStockItem = createAction(
  StockItemActions.LIST_STOCK_ITEM,
  props<StockItem>()
);

export const listStockItemSuccess = createAction(
  StockItemActions.LIST_STOCK_ITEM_SUCCESS,
  // @@@ TODO - Should have a payload of type listed item???
)

export const searchStockItems = createAction(
  StockItemActions.SEARCH_STOCK_ITEMS,
  props<StockItemSearch>()
);

export const searchStockItemSuccess = createAction(
  StockItemActions.SEARCH_STOCK_ITEMS_SUCCESS,
  (items: Page<StockItem>) => ({ payload: items })
);

export const updateStockItem = createAction(
  StockItemActions.UPDATE_STOCK_ITEM,
  props<{ id: number, stockroom: StockItem }>()
);

export const updateStockItemSuccess = createAction(
  StockItemActions.UPDATE_STOCK_ITEM_SUCCESS,
  (item: StockItem) => ({ payload: item })
);
