import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMenu from '../reducers/menu.reducer';

export const selectMenuFeatureState = createFeatureSelector<fromMenu.State>(
  fromMenu.menuFeatureKey
);

export const selectMenus = createSelector(selectMenuFeatureState, state => state.menus);
