import { createReducer, on } from '@ngrx/store';
import { getCategoriesSuccess } from '../actions/category.actions';
import { initialCategoryState } from '../state/category.state';

const _categoryReducer = createReducer(
  initialCategoryState,
  on(getCategoriesSuccess, (state, { payload }) => {
    return {
      ...state,
      categories: payload
    };
  })
);

export function categoryReducer(state, action) {
  return _categoryReducer(state, action);
}
