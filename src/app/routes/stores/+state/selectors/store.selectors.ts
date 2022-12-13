import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStore from '../reducers/store.reducer';

export const selectStoreState = createFeatureSelector<fromStore.State>(fromStore.storeFeatureKey);

export const selectStores = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.stores
);

export const selectTotal = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.total
);

export const selectPage = createSelector(selectStoreState, (state: fromStore.State) => state.page);

export const selectLoading = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.loading
);

export const selectFilters = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.filters
);

export const selectSelectedStore = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.selectedStore
);

export const selectCurrencies = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.currencies
);

export const selectDimensions = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.dimensions
);

export const selectWeights = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.weights
);

export const selectRetailers = createSelector(
  selectStoreState,
  (state: fromStore.State) => state.retailers
);
