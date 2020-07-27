import { createAction } from '@ngrx/store';
import { Category } from '@inv/core';

export enum CategoryActions {
  GET_CATEGORIES = '[Category] Get Categories',
  GET_CATEGORIES_SUCCESS = '[Category] Get Categories Success'
};

export const getCategories = createAction(
  CategoryActions.GET_CATEGORIES
);

export const getCategoriesSuccess = createAction(
  CategoryActions.GET_CATEGORIES_SUCCESS,
  (categories: Category[]) => ({ payload: categories })
);
