import { createReducer, on } from '@ngrx/store';
import * as SettingActions from '../actions/setting.actions';

export const settingFeatureKey = 'setting';
export declare type ThemeType = 'light' | 'dark' | 'auto';
export interface State {
  navPos: 'side' | 'top';
  theme: ThemeType;
  dir: 'ltr' | 'rtl';
  showHeader: boolean;
  headerPos: 'fixed' | 'static' | 'above';
  showUserPanel: boolean;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  language: string;
}

export const initialState: State = {
  navPos: 'side',
  theme: 'light',
  dir: 'ltr',
  showHeader: true,
  headerPos: 'fixed',
  showUserPanel: false,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'en-US',
};

export const reducer = createReducer(
  initialState,
  on(SettingActions.initSettings, (state, { settings }): State => ({ ...state, ...settings })),
  on(
    SettingActions.updateSettingsSuccess,
    (state, { settings }): State => ({ ...state, ...settings })
  ),
  on(SettingActions.setNavPosSuccess, (state, { navPos }): State => ({ ...state, navPos })),
  on(SettingActions.setThemeSuccess, (state, { theme }): State => ({ ...state, theme })),
  on(SettingActions.setDirSuccess, (state, { dir }): State => ({ ...state, dir })),
  on(
    SettingActions.setShowHeaderSuccess,
    (state, { showHeader }): State => ({ ...state, showHeader })
  ),
  on(
    SettingActions.setHeaderPosSuccess,
    (state, { headerPos }): State => ({ ...state, headerPos })
  ),
  on(
    SettingActions.setShowUserPanelSuccess,
    (state, { showUserPanel }): State => ({ ...state, showUserPanel })
  ),
  on(
    SettingActions.setSidenavOpenedSuccess,
    (state, { sidenavOpened }): State => ({ ...state, sidenavOpened })
  ),
  on(
    SettingActions.setSidenavCollapsedSuccess,
    (state, { sidenavCollapsed }): State => ({ ...state, sidenavCollapsed })
  ),
  on(SettingActions.setLanguageSuccess, (state, { language }): State => ({ ...state, language })),
  on(
    SettingActions.setSidenavWhenLayoutChangesSuccess,
    (state, { sidenavOpened, sidenavCollapsed }): State => ({
      ...state,
      sidenavOpened,
      sidenavCollapsed,
    })
  )
);
