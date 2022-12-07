import { createReducer, on } from '@ngrx/store';
import * as SettingActions from '../actions/setting.actions';

export declare type NavPosType = 'side' | 'top';
export declare type ThemeType = 'light' | 'dark' | 'auto';
export declare type DirType = 'ltr' | 'rtl';
export declare type HeaderPosType = 'fixed' | 'static' | 'above';

export interface AppState {
  navPos: NavPosType;
  theme: ThemeType;
  dir: DirType;
  showHeader: boolean;
  headerPos: HeaderPosType;
  showUserPanel: boolean;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  language: string;
}

export const initialState: AppState = {
  navPos: 'side',
  theme: 'auto',
  dir: 'ltr',
  showHeader: true,
  headerPos: 'fixed',
  showUserPanel: true,
  sidenavOpened: true,
  sidenavCollapsed: false,
  language: 'en-US',
};

export const reducer = createReducer(
  initialState,
  on(SettingActions.setTheme, (state, { theme }): AppState => ({ ...state, theme }))
);
