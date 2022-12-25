import { environment } from '@env/environment';
import { Category } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from '../actions/category.actions';

export const categoryFeatureKey = 'category';

export interface State {
  categories: Category[];
  error?: string;
  total: number;
  page: number;
  loading: boolean;
  filters?: Record<string, string>;
  selectedCategory?: Category;
  allCategories: Category[];
}

export const initialState: State = {
  categories: [],
  total: 0,
  page: 0,
  loading: false,
  allCategories: [],
};

export const reducer = createReducer(
  initialState,

  on(
    CategoryActions.loadCategoriesSuccess,
    (state, action): State => ({
      ...state,
      categories: action.data.data,
      total: action.data.recordsTotal,
      page: Math.floor(action.data.recordsTotal / environment.defaultPageSize),
      loading: false,
    })
  ),
  on(
    CategoryActions.loadCategoriesFailure,
    (state, action): State => ({ ...state, error: action.error, loading: false })
  ),
  on(
    CategoryActions.getByIdSuccess,
    (state, action): State => ({ ...state, selectedCategory: action.data })
  ),
  on(CategoryActions.getByIdFailure, (state, action): State => ({ ...state, error: action.error })),
  on(
    CategoryActions.loadAllSuccess,
    (state, action): State => ({ ...state, allCategories: action.data })
  ),
  on(CategoryActions.loadAllFailure, (state, action): State => ({ ...state, error: action.error }))
);
