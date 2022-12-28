import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromExpedition from '../reducers/expedition.reducer';

export const selectExpeditionState = createFeatureSelector<fromExpedition.State>(
  fromExpedition.expeditionFeatureKey
);

export const selectExpedition = createSelector(selectExpeditionState, state => state.expedition);

export const selectCountries = createSelector(selectExpeditionState, state => state.countries);

export const selectError = createSelector(selectExpeditionState, state => state.error);

export const selectLoading = createSelector(selectExpeditionState, state => state.loading);
