import { environment } from '@env/environment';
import { Product } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as ProductActions from '../actions/product.actions';

export const productFeatureKey = 'product';

export interface State {
  products: Product[];
  error?: any;
  total: number;
  page: number;
  loading: boolean;
  filters?: Record<string, string>;
  selected?: Product;
}

export const initialState: State = {
  products: [],
  total: 0,
  page: 0,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(
    ProductActions.loadProductsSuccess,
    (state, action): State => ({
      ...state,
      products: action.data.data,
      total: action.data.recordsTotal,
      page: Math.floor(action.data.recordsTotal / environment.defaultPageSize),
      loading: false,
    })
  ),
  on(
    ProductActions.loadProductsFailure,
    (state, action): State => ({ ...state, error: action.error, loading: false })
  ),
  on(
    ProductActions.getByIdSuccess,
    (state, action): State => ({ ...state, selected: action.data })
  ),
  on(ProductActions.getByIdFailure, (state, action): State => ({ ...state, error: action.error }))
);
