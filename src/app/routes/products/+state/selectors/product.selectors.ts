import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from '../reducers/product.reducer';

export const selectProductState = createFeatureSelector<fromProduct.State>(
  fromProduct.productFeatureKey
);

export const selectProductSelected = createSelector(
  selectProductState,
  (state: fromProduct.State) => state.selected
);
