import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { map } from 'rxjs';

import * as SettingActions from '../actions/setting.actions';
import { initialState } from '../reducers/setting.reducer';

@Injectable()
export class SettingEffects {
  initSetting$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const settings = localStorage.getItem('settings');
        if (!settings) {
          localStorage.setItem('settings', JSON.stringify(initialState));
          this.overlay.getContainerElement().classList.add('theme-' + initialState.theme);
          return SettingActions.initSettings({ settings: initialState });
        }
        this.overlay.getContainerElement().classList.add('theme-' + JSON.parse(settings).theme);
        return SettingActions.initSettings({ settings: JSON.parse(settings) });
      })
    );
  });

  navPos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setNavPos),
      map(({ navPos }) => {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        localStorage.setItem('settings', JSON.stringify({ ...settings, navPos }));
        return SettingActions.setNavPosSuccess({ navPos });
      })
    );
  });

  theme$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setTheme),
      map(({ theme }) => {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        this.overlay.getContainerElement().classList.remove('theme-' + settings.theme);
        this.overlay.getContainerElement().classList.add('theme-' + theme);
        localStorage.setItem('settings', JSON.stringify({ ...settings, theme }));
        return SettingActions.setThemeSuccess({ theme });
      })
    );
  });

  dir$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setDir),
      map(({ dir }) => {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        localStorage.setItem('settings', JSON.stringify({ ...settings, dir }));
        return SettingActions.setDirSuccess({ dir });
      })
    );
  });

  showHeader$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setShowHeader),
      map(({ showHeader }) => {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        localStorage.setItem('settings', JSON.stringify({ ...settings, showHeader }));
        return SettingActions.setShowHeaderSuccess({ showHeader });
      })
    );
  });

  headerPos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setHeaderPos),
      map(({ headerPos }) => {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        localStorage.setItem('settings', JSON.stringify({ ...settings, headerPos }));
        return SettingActions.setHeaderPosSuccess({ headerPos });
      })
    );
  });

  showUserPanel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setShowUserPanel),
      map(({ showUserPanel }) => {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        localStorage.setItem('settings', JSON.stringify({ ...settings, showUserPanel }));
        return SettingActions.setShowUserPanelSuccess({ showUserPanel });
      })
    );
  });

  sidenavOpened$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setSidenavOpened),
      map(({ sidenavOpened }) => {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        localStorage.setItem('settings', JSON.stringify({ ...settings, sidenavOpened }));
        return SettingActions.setSidenavOpenedSuccess({ sidenavOpened });
      })
    );
  });

  sidenavCollapsed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setSidenavCollapsed),
      map(({ sidenavCollapsed }) => {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        localStorage.setItem('settings', JSON.stringify({ ...settings, sidenavCollapsed }));
        return SettingActions.setSidenavCollapsedSuccess({ sidenavCollapsed });
      })
    );
  });

  language$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setLanguage),
      map(({ language }) => {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        localStorage.setItem('settings', JSON.stringify({ ...settings, language }));
        return SettingActions.setLanguageSuccess({ language });
      })
    );
  });

  sidenavWhenLayoutChanges$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setSidenavWhenLayoutChanges),
      map(({ sidenavOpened, sidenavCollapsed }) => {
        const settings = JSON.parse(localStorage.getItem('settings') || '{}');
        localStorage.setItem(
          'settings',
          JSON.stringify({ ...settings, sidenavOpened, sidenavCollapsed })
        );
        return SettingActions.setSidenavWhenLayoutChangesSuccess({
          sidenavOpened,
          sidenavCollapsed,
        });
      })
    );
  });

  constructor(private actions$: Actions, private overlay: OverlayContainer) {}
}
