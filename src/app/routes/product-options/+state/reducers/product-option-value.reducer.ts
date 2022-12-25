import { environment } from '@env/environment';
import { ProductOptionValue } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as ProductOptionValueActions from '../actions/product-option-value.actions';

export const productOptionValueFeatureKey = 'productOptionValue';

export interface State {
  productOptionValues: ProductOptionValue[];
  error?: any;
  total: number;
  page: number;
  loading: boolean;
  filters?: Record<string, string>;
  selected?: ProductOptionValue;
}

export const initialState: State = {
  productOptionValues: [],
  total: 0,
  page: 0,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(
    ProductOptionValueActions.loadProductOptionValuesSuccess,
    (state, action): State => ({
      ...state,
      productOptionValues: action.data.data,
      total: action.data.recordsTotal,
      page: Math.floor(action.data.recordsTotal / environment.defaultPageSize),
      loading: false,
    })
  ),
  on(
    ProductOptionValueActions.loadProductOptionValuesFailure,
    (state, action): State => ({ ...state, error: action.error, loading: false })
  ),
  on(
    ProductOptionValueActions.getByIdSuccess,
    (state, action): State => ({ ...state, selected: action.data })
  ),
  on(
    ProductOptionValueActions.getByIdFailure,
    (state, action): State => ({ ...state, error: action.error })
  )
);
