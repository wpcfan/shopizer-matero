import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductType from '../reducers/product-type.reducer';

export const selectProductTypeState = createFeatureSelector<fromProductType.State>(
  fromProductType.productTypeFeatureKey
);

export const selectProductTypes = createSelector(
  selectProductTypeState,
  (state: fromProductType.State) => state.productTypes
);

export const selectProductTypeTotal = createSelector(
  selectProductTypeState,
  (state: fromProductType.State) => state.total
);

export const selectProductTypePage = createSelector(
  selectProductTypeState,
  (state: fromProductType.State) => state.page
);

export const selectProductTypeLoading = createSelector(
  selectProductTypeState,
  (state: fromProductType.State) => state.loading
);

export const selectProductTypeFilters = createSelector(
  selectProductTypeState,
  (state: fromProductType.State) => state.filters
);

export const selectProductTypeSelected = createSelector(
  selectProductTypeState,
  (state: fromProductType.State) => state.selected
);

export const selectProductTypeError = createSelector(
  selectProductTypeState,
  (state: fromProductType.State) => state.error
);
