import { createAction, props } from '@ngrx/store';
import { State, ThemeType } from '../reducers/setting.reducer';

export const setNavPos = createAction(
  '[Setting] Set nav position',
  props<{ navPos: 'side' | 'top' }>()
);
export const setNavPosSuccess = createAction(
  '[Setting] Set nav position success',
  props<{ navPos: 'side' | 'top' }>()
);
export const setTheme = createAction('[Setting] Set the theme', props<{ theme: ThemeType }>());
export const setThemeSuccess = createAction(
  '[Setting] Set the theme success',
  props<{ theme: ThemeType }>()
);
export const setDir = createAction('[Setting] Set the direction', props<{ dir: 'ltr' | 'rtl' }>());
export const setDirSuccess = createAction(
  '[Setting] Set the direction success',
  props<{ dir: 'ltr' | 'rtl' }>()
);
export const setShowHeader = createAction(
  '[Setting] Set show header',
  props<{ showHeader: boolean }>()
);
export const setShowHeaderSuccess = createAction(
  '[Setting] Set show header success',
  props<{ showHeader: boolean }>()
);
export const setHeaderPos = createAction(
  '[Setting] Set header position',
  props<{ headerPos: 'fixed' | 'static' | 'above' }>()
);
export const setHeaderPosSuccess = createAction(
  '[Setting] Set header position success',
  props<{ headerPos: 'fixed' | 'static' | 'above' }>()
);
export const setShowUserPanel = createAction(
  '[Setting] Set show user panel',
  props<{ showUserPanel: boolean }>()
);
export const setShowUserPanelSuccess = createAction(
  '[Setting] Set show user panel success',
  props<{ showUserPanel: boolean }>()
);
export const setSidenavOpened = createAction(
  '[Setting] Set sidenav opened',
  props<{ sidenavOpened: boolean }>()
);
export const setSidenavOpenedSuccess = createAction(
  '[Setting] Set sidenav opened success',
  props<{ sidenavOpened: boolean }>()
);
export const setSidenavCollapsed = createAction(
  '[Setting] Set sidenav collapsed',
  props<{ sidenavCollapsed: boolean }>()
);
export const setSidenavCollapsedSuccess = createAction(
  '[Setting] Set sidenav collapsed success',
  props<{ sidenavCollapsed: boolean }>()
);
export const setLanguage = createAction('[Setting] Set language', props<{ language: string }>());
export const setLanguageSuccess = createAction(
  '[Setting] Set language success',
  props<{ language: string }>()
);
export const initSettings = createAction(
  '[Setting] Init settings',
  props<{ settings: Partial<State> }>()
);
export const updateSettings = createAction(
  '[Setting] Init settings',
  props<{ settings: Partial<State> }>()
);
export const setSidenavWhenLayoutChanges = createAction(
  '[Layout Changes] Set sidenav when layout changes',
  props<{ sidenavOpened: boolean; sidenavCollapsed: boolean }>()
);
export const setSidenavWhenLayoutChangesSuccess = createAction(
  '[Layout Changes] Set sidenav when layout changes success',
  props<{ sidenavOpened: boolean; sidenavCollapsed: boolean }>()
);
