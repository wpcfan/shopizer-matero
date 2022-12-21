import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductOption from '../reducers/product-option.reducer';

export const selectProductOptionState = createFeatureSelector<fromProductOption.State>(
  fromProductOption.productOptionFeatureKey
);

export const selectProductOptionSelected = createSelector(
  selectProductOptionState,
  state => state.selected
);
