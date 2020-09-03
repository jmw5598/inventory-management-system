import { createAction, props } from '@ngrx/store';
import { ProductItem, StockItem, Page, IPageable, ResponseMessage } from '@inv/core';

export enum StockItemActions {
  CREATE_STOCK_ITEM = '[Stock Item] Create Stock Item',
  CREATE_STOCK_ITEM_SUCCESS = '[Stock Item] Create Stock Item Success',
  CREATE_STOCK_ITEM_RESPONSE_MESSAGE = '[Stock Item] Create Stock Item Response Message',
  DELETE_STOCK_ITEM = '[Stock Item] Delete Stock Item',
  DELETE_STOCK_ITEM_SUCCESS = '[Stock Item] Delete Stock Item Success',
  LIST_STOCK_ITEM = '[Stock Item] List Stock Item',
  LIST_STOCK_ITEM_SUCCESS = '[Stock Item] List Stock Item Success',
  SEARCH_STOCK_ITEMS = '[Stock Item] Search Stock Items',
  SEARCH_STOCK_ITEMS_SUCCESS = '[Stock Item] Search Stock Items Success',
  UPDATE_STOCK_ITEM = '[Stock Item] Update Stock Item',
  UPDATE_STOCK_ITEM_SUCCESS = '[Stock Item] Update Stock Item Success',
  SET_SELECTED_PRODUCT_ITEM_FROM_SEARCH = '[Stock Item] Set Selected Product Item From Search',
  GET_STOCK_ITEM_BY_ID = '[Stock Item] Get Stock Item By Id',
  SET_SELECTED_STOCK_ITEM = '[Stock Item] Set Selected Stock Item'
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

export const setSelectedProductItemFromSearch = createAction(
  StockItemActions.SET_SELECTED_PRODUCT_ITEM_FROM_SEARCH,
  (item: ProductItem) => ({ payload: item })
);

export const setCreateStockItemResponseMessage = createAction(
  StockItemActions.CREATE_STOCK_ITEM_RESPONSE_MESSAGE,
  (message: ResponseMessage) => ({ payload: message })
)

export const getStockItemById = createAction(
  StockItemActions.GET_STOCK_ITEM_BY_ID,
  props<{ id: number }>()
);

export const setSelectedStockItem = createAction(
  StockItemActions.SET_SELECTED_STOCK_ITEM,
  (stockItem: StockItem) => ({ payload: stockItem})
);
