import { createAction, props } from '@ngrx/store';
import { ProductItem, Stockroom, Page, IPageable } from '@inv/core';

export enum ProductItemActions {
  CREATE_PRODUCT_ITEM = '[Product Item] Create Product Item',
  CREATE_PRODUCT_ITEM_SUCCESS = '[Product Item] Create Product Item Success',
  GET_PRODUCT_ITEMS_BY_PAGE = '[Product Item] Get Product Items By Page',
  GET_PRODUCT_ITEMS_BY_PAGE_SUCCESS = '[Product Item] Get Product Items By Page Success',
  SEARCH_PRODUCT_ITEMS = '[Product Item] Search Product Items',
  SEARCH_PRODUCT_ITEMS_SUCCESS = '[Product Item] Search Product Items Success'
};

export const createProductItem = createAction(
  ProductItemActions.CREATE_PRODUCT_ITEM,
  props<Stockroom>()
);

export const createProductItemSuccess = createAction(
  ProductItemActions.CREATE_PRODUCT_ITEM_SUCCESS,
  (product: ProductItem) => ({ payload: product })
);

export const getProductItemsByPage = createAction(
  ProductItemActions.GET_PRODUCT_ITEMS_BY_PAGE,
  props<IPageable>()
);

export const getProductItemsByPageSuccess = createAction(
  ProductItemActions.GET_PRODUCT_ITEMS_BY_PAGE_SUCCESS,
  (products: Page<ProductItem>) => ({ payload: products })
)

export const searchProductItems = createAction(
  ProductItemActions.SEARCH_PRODUCT_ITEMS,
  props<{ searchTerm: string }>()
);

export const searchProductItemsSuccess = createAction(
  ProductItemActions.SEARCH_PRODUCT_ITEMS_SUCCESS,
  (products: Page<ProductItem>) => ({ payload: products })
);
