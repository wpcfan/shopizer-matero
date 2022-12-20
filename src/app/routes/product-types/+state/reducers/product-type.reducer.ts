import { ProductType } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as ProductTypeActions from '../actions/product-type.actions';

export const productTypeFeatureKey = 'productType';

export interface State {
  productTypes: ProductType[];
  error?: any;
  total: number;
  page: number;
  loading: boolean;
  filters?: Record<string, string>;
  selected?: ProductType;
}

export const initialState: State = {
  productTypes: [],
  total: 0,
  page: 0,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(
    ProductTypeActions.loadProductTypesSuccess,
    (state, action): State => ({
      ...state,
      productTypes: action.data.data,
      total: action.data.recordsTotal,
      page: Math.floor(action.data.recordsTotal / action.data.number),
      loading: false,
    })
  ),
  on(
    ProductTypeActions.loadProductTypesFailure,
    (state, action): State => ({ ...state, error: action.error, loading: false })
  ),
  on(
    ProductTypeActions.getByIdSuccess,
    (state, action): State => ({ ...state, selected: action.data, loading: false })
  ),
  on(
    ProductTypeActions.getByIdFailure,
    (state, action): State => ({ ...state, error: action.error, loading: false })
  )
);
