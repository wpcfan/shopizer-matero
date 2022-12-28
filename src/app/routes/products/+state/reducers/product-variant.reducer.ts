import { environment } from '@env/environment';
import { ProductVariant } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as ProductVariantActions from '../actions/product-variant.actions';

export const productVariantFeatureKey = 'productVariant';

export interface State {
  variants: ProductVariant[];
  error?: any;
  total: number;
  page: number;
  loading: boolean;
  selected?: ProductVariant;
}

export const initialState: State = {
  variants: [],
  total: 0,
  page: 0,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    ProductVariantActions.loadProductVariantsSuccess,
    (state, action): State => ({
      ...state,
      variants: action.data.data,
      total: action.data.recordsTotal,
      page: Math.floor(action.data.recordsTotal / environment.defaultPageSize),
      loading: false,
    })
  ),
  on(
    ProductVariantActions.loadProductVariantsFailure,
    (state, action): State => ({ ...state, error: action.error, loading: false })
  ),
  on(
    ProductVariantActions.getByIdSuccess,
    (state, action): State => ({ ...state, selected: action.data })
  ),
  on(
    ProductVariantActions.getByIdFailure,
    (state, action): State => ({ ...state, error: action.error })
  )
);
