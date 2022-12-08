import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSetting from '../reducers/setting.reducer';

export const selectSettingState = createFeatureSelector<fromSetting.State>(
  fromSetting.settingFeatureKey
);

export const selectTheme = createSelector(selectSettingState, state => state.theme);

export const selectDir = createSelector(selectSettingState, state => state.dir);

export const selectShowHeader = createSelector(selectSettingState, state => state.showHeader);

export const selectHeaderPos = createSelector(selectSettingState, state => state.headerPos);

export const selectShowUserPanel = createSelector(selectSettingState, state => state.showUserPanel);

export const selectSidenavOpened = createSelector(selectSettingState, state => state.sidenavOpened);

export const selectSidenavCollapsed = createSelector(
  selectSettingState,
  state => state.sidenavCollapsed
);

export const selectLanguage = createSelector(selectSettingState, state => state.language);
export const selectThemeClass = createSelector(selectTheme, theme => `theme-${theme}`);
