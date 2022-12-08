import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthFeatureState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectLoggedIn = createSelector(selectAuthFeatureState, state => state.loggedIn);
