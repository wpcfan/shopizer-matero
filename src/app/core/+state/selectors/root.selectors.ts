import { createSelector } from '@ngrx/store';
import { AppState } from '../reducers/root.reducer';

export const selectTheme = createSelector(
  (state: AppState) => state.theme,
  theme => theme
);
