import { ProductOption } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as ProductOptionActions from '../actions/product-option.actions';

export const productOptionFeatureKey = 'productOption';

export interface State {
  productOptions: ProductOption[];
  error?: string;
  total: number;
  page: number;
  loading: boolean;
  filters?: Record<string, string>;
  selected?: ProductOption;
}

export const initialState: State = {
  productOptions: [],
  total: 0,
  page: 0,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(
    ProductOptionActions.loadProductOptionsSuccess,
    (state, action): State => ({
      ...state,
      productOptions: action.data.data,
      total: action.data.recordsTotal,
      page: Math.floor(action.data.recordsTotal / action.data.number),
      loading: false,
    })
  ),
  on(
    ProductOptionActions.loadProductOptionsFailure,
    (state, action): State => ({ ...state, error: action.error, loading: false })
  ),
  on(
    ProductOptionActions.getByIdSuccess,
    (state, action): State => ({ ...state, selected: action.data })
  ),
  on(
    ProductOptionActions.getByIdFailure,
    (state, action): State => ({ ...state, error: action.error })
  )
);
