import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductVariant from '../reducers/product-variant.reducer';

export const selectProductVariantState = createFeatureSelector<fromProductVariant.State>(
  fromProductVariant.productVariantFeatureKey
);

export const selectProductVariants = createSelector(
  selectProductVariantState,
  (state: fromProductVariant.State) => state.variants
);

export const selectProductVariantSelected = createSelector(
  selectProductVariantState,
  (state: fromProductVariant.State) => state.selected
);
