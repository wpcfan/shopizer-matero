import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSetting from '../reducers/setting.reducer';

export const selectSettingState = createFeatureSelector<fromSetting.State>(
  fromSetting.settingFeatureKey
);

export const selectTheme = createSelector(
  selectSettingState,
  (state) => state.theme
);
