import { ProductAttribute } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as ProductAttributeActions from '../actions/product-attribute.actions';

export const productAttributeFeatureKey = 'productAttribute';

export interface State {
  productAttributes: ProductAttribute[];
  error?: any;
  total: number;
  page: number;
  loading: boolean;
  filters?: Record<string, string>;
  selected?: ProductAttribute;
}

export const initialState: State = {
  productAttributes: [],
  total: 0,
  page: 0,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(
    ProductAttributeActions.loadProductAttributesSuccess,
    (state, action): State => ({
      ...state,
      productAttributes: action.data.data,
      total: action.data.recordsTotal,
      page: Math.floor(action.data.recordsTotal / action.data.number),
      loading: false,
    })
  ),
  on(
    ProductAttributeActions.loadProductAttributesFailure,
    (state, action): State => ({ ...state, error: action.error, loading: false })
  ),
  on(
    ProductAttributeActions.getByIdSuccess,
    (state, action): State => ({ ...state, selected: action.data })
  ),
  on(
    ProductAttributeActions.getByIdFailure,
    (state, action): State => ({ ...state, error: action.error })
  )
);
