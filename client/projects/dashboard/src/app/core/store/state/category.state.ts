import { Category } from '@inv/core';

export interface ICategoryState {
  categories: Category[]
};

export const initialCategoryState: ICategoryState = {
  categories: []  
};
