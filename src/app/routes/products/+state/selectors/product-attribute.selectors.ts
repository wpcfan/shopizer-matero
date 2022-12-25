import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductAttribute from '../reducers/product-attribute.reducer';

export const selectProductAttributeState = createFeatureSelector<fromProductAttribute.State>(
  fromProductAttribute.productAttributeFeatureKey
);

export const selectProductAttributes = createSelector(
  selectProductAttributeState,
  (state: fromProductAttribute.State) => state.productAttributes
);

export const selectSelected = createSelector(
  selectProductAttributeState,
  (state: fromProductAttribute.State) => state.selected
);
