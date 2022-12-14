import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfile from '../reducers/profile.reducer';

export const selectProfileFeatureState = createFeatureSelector<fromProfile.State>(
  fromProfile.profileFeatureKey
);

export const selectProfile = createSelector(selectProfileFeatureState, state => state.profile);

export const selectGroups = createSelector(selectProfileFeatureState, state => state.groups);

export const selectLanguages = createSelector(selectProfileFeatureState, state => state.languages);

export const selectCountries = createSelector(selectProfileFeatureState, state => state.countries);

export const selectStores = createSelector(selectProfileFeatureState, state => state.stores);

export const selectStoreOptions = createSelector(selectStores, stores =>
  stores.map(store => ({
    label: store.name,
    value: store.code,
  }))
);

export const selectZones = createSelector(selectProfileFeatureState, state => state.zones);
