import { createAction, props } from '@ngrx/store';
import { ProductItem, Page, IPageable, ResponseMessage } from '@inv/core';

export enum ProductItemActions {
  CREATE_PRODUCT_ITEM = '[Product Item] Create Product Item',
  CREATE_PRODUCT_ITEM_SUCCESS = '[Product Item] Create Product Item Success',
  CREATE_PRODUCT_ITEM_RESPONSE_MESSAGE = '[Product Item] Create Product Item Response Message',
  DELETE_PRODUCT_ITEM = '[Product Item] Delete Product Item',
  DELETE_PRODUCT_TIEM_SUCCESS = '[Product Item] Delete Product Item Success',
  GET_PRODUCT_ITEMS_BY_PAGE = '[Product Item] Get Product Items By Page',
  GET_PRODUCT_ITEMS_BY_PAGE_SUCCESS = '[Product Item] Get Product Items By Page Success',
  GET_PRODUCT_ITEM_BY_ID = '[Product Item] Get Product Item By Id',
  SET_SELECTED_PRODUCT_ITEM = '[Product Item] Set Selected Product Item',
  SEARCH_PRODUCT_ITEMS = '[Product Item] Search Product Items',
  SEARCH_PRODUCT_ITEMS_SUCCESS = '[Product Item] Search Product Items Success',
  UPDATE_PRODUCT_ITEM = '[Product Item] Update Product Item',
  UPDATE_PRODUCT_TIEM_SUCCESS = '[Product Item] Update Product Item Success',
  UPDATE_PRODUCT_ITEM_RESPONSE_MESSAGE = '[Product Item] Update Product Item Response Message'
};

export interface ProductItemSearch {
  searchTerm: string;
  pageable: IPageable;
}

export const createProductItem = createAction(
  ProductItemActions.CREATE_PRODUCT_ITEM,
  props<ProductItem>()
);

export const createProductItemSuccess = createAction(
  ProductItemActions.CREATE_PRODUCT_ITEM_SUCCESS,
  (product: ProductItem) => ({ payload: product })
);

export const getProductItemsByPage = createAction(
  ProductItemActions.GET_PRODUCT_ITEMS_BY_PAGE,
  props<IPageable>()
);

export const deleteProductItem = createAction(
  ProductItemActions.DELETE_PRODUCT_ITEM,
  props<{ id: number }>()
);

export const deleteProductItemSuccess = createAction(
  ProductItemActions.DELETE_PRODUCT_TIEM_SUCCESS,
  (product: ProductItem) => ({ payload: product })
);

export const getProductItemsByPageSuccess = createAction(
  ProductItemActions.GET_PRODUCT_ITEMS_BY_PAGE_SUCCESS,
  (products: Page<ProductItem>) => ({ payload: products })
)

export const getProductItemById = createAction(
  ProductItemActions.GET_PRODUCT_ITEM_BY_ID,
  props<{ id: number }>()
);

export const setSelectedProductItem = createAction(
  ProductItemActions.SET_SELECTED_PRODUCT_ITEM,
  (product: ProductItem) => ({ payload: product })
);

export const searchProductItems = createAction(
  ProductItemActions.SEARCH_PRODUCT_ITEMS,
  props<ProductItemSearch>()
);

export const searchProductItemsSuccess = createAction(
  ProductItemActions.SEARCH_PRODUCT_ITEMS_SUCCESS,
  (products: Page<ProductItem>) => ({ payload: products })
);

export const updateProductItem = createAction(
  ProductItemActions.UPDATE_PRODUCT_ITEM,
  props<{ id: number, product: ProductItem}>()
);

export const updateProductItemSuccess = createAction(
  ProductItemActions.UPDATE_PRODUCT_TIEM_SUCCESS,
  (product: ProductItem) => ({ payload: product})
);

export const setCreateProductItemResponseMessage = createAction(
  ProductItemActions.CREATE_PRODUCT_ITEM_RESPONSE_MESSAGE,
  (message: ResponseMessage) => ({ payload: message })
);

export const setUpdateProductItemResponseMessage = createAction(
  ProductItemActions.UPDATE_PRODUCT_ITEM_RESPONSE_MESSAGE,
  (message: ResponseMessage) => ({ payload: message })
);
