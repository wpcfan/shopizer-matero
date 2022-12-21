import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductOptionValue from '../reducers/product-option-value.reducer';

export const selectProductOptionValueState = createFeatureSelector<fromProductOptionValue.State>(
  fromProductOptionValue.productOptionValueFeatureKey
);

export const selectProductOptionValueSelected = createSelector(
  selectProductOptionValueState,
  state => state.selected
);
