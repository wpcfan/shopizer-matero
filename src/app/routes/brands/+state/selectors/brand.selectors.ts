import { Manufacturer } from '@models';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBrands from '../reducers/brand.reducer';

export const selectBrandState = createFeatureSelector<fromBrands.State>(fromBrands.brandFeatureKey);

export const selectBrands = createSelector(
  selectBrandState,
  (state): Manufacturer[] => state.manufactures
);

export const selectBrandLoading = createSelector(
  selectBrandState,
  (state): boolean => state.loading
);

export const selectBrandError = createSelector(
  selectBrandState,
  (state): string | undefined => state.error
);

export const selectBrandTotal = createSelector(selectBrandState, (state): number => state.total);

export const selectBrandPage = createSelector(selectBrandState, (state): number => state.page);

export const selectSelected = createSelector(
  selectBrandState,
  (state): Manufacturer | undefined => state.selected
);
