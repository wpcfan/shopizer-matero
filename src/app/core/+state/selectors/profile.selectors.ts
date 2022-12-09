import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfile from '../reducers/profile.reducer';

export const selectProfileFeatureState = createFeatureSelector<fromProfile.State>(
  fromProfile.profileFeatureKey
);

export const selectProfile = createSelector(selectProfileFeatureState, state => state.profile);

export const selectGroups = createSelector(selectProfileFeatureState, state => state.groups);

export const selectLanguages = createSelector(selectProfileFeatureState, state => state.languages);
