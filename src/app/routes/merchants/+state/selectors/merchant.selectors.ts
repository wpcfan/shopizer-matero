import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMerchant from '../reducers/merchant.reducer';

export const selectMerchantState = createFeatureSelector<fromMerchant.State>(
  fromMerchant.merchantFeatureKey
);

export const selectStores = createSelector(
  selectMerchantState,
  (state: fromMerchant.State) => state.merchants
);

export const selectTotal = createSelector(
  selectMerchantState,
  (state: fromMerchant.State) => state.total
);

export const selectPage = createSelector(
  selectMerchantState,
  (state: fromMerchant.State) => state.page
);

export const selectLoading = createSelector(
  selectMerchantState,
  (state: fromMerchant.State) => state.loading
);

export const selectFilters = createSelector(
  selectMerchantState,
  (state: fromMerchant.State) => state.filters
);

export const selectSelectedMerchant = createSelector(
  selectMerchantState,
  (state: fromMerchant.State) => state.selectedMerchant
);

export const selectCurrencies = createSelector(
  selectMerchantState,
  (state: fromMerchant.State) => state.currencies
);

export const selectDimensions = createSelector(
  selectMerchantState,
  (state: fromMerchant.State) => state.dimensions
);

export const selectWeights = createSelector(
  selectMerchantState,
  (state: fromMerchant.State) => state.weights
);

export const selectRetailers = createSelector(
  selectMerchantState,
  (state: fromMerchant.State) => state.retailers
);
