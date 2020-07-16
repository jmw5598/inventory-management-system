import { Category } from '../../models/category.model';

export interface ICategoryState {
  categories: Category[]
};

export const initialCategoryState: ICategoryState = {
  categories: []  
};
