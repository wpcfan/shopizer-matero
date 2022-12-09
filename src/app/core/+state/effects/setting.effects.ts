import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { LocalStorageService } from '@shared';
import { map } from 'rxjs';

import * as SettingActions from '../actions/setting.actions';
import { initialState } from '../reducers/setting.reducer';

@Injectable()
export class SettingEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const settings = this.local.get('settings');
        if (settings === null || settings === undefined || Object.keys(settings).length === 0) {
          this.local.set('settings', initialState);
          this.overlay.getContainerElement().classList.add('theme-' + initialState.theme);
          return SettingActions.initSettings({ settings: initialState });
        }
        this.overlay.getContainerElement().classList.add('theme-' + settings.theme);
        return SettingActions.initSettings({ settings });
      })
    );
  });

  navPos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setNavPos),
      map(({ navPos }) => {
        const settings = this.local.get('settings');
        this.local.set('settings', { ...settings, navPos });
        return SettingActions.setNavPosSuccess({ navPos });
      })
    );
  });

  theme$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setTheme),
      map(({ theme }) => {
        const settings = this.local.get('settings');
        this.overlay.getContainerElement().classList.remove('theme-' + settings.theme);
        this.overlay.getContainerElement().classList.add('theme-' + theme);
        this.local.set('settings', { ...settings, theme });
        return SettingActions.setThemeSuccess({ theme });
      })
    );
  });

  dir$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setDir),
      map(({ dir }) => {
        const settings = this.local.get('settings');
        this.local.set('settings', { ...settings, dir });
        return SettingActions.setDirSuccess({ dir });
      })
    );
  });

  showHeader$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setShowHeader),
      map(({ showHeader }) => {
        const settings = this.local.get('settings');
        this.local.set('settings', { ...settings, showHeader });
        return SettingActions.setShowHeaderSuccess({ showHeader });
      })
    );
  });

  headerPos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setHeaderPos),
      map(({ headerPos }) => {
        const settings = this.local.get('settings');
        this.local.set('settings', { ...settings, headerPos });
        return SettingActions.setHeaderPosSuccess({ headerPos });
      })
    );
  });

  showUserPanel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setShowUserPanel),
      map(({ showUserPanel }) => {
        const settings = this.local.get('settings');
        this.local.set('settings', { ...settings, showUserPanel });
        return SettingActions.setShowUserPanelSuccess({ showUserPanel });
      })
    );
  });

  sidenavOpened$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setSidenavOpened),
      map(({ sidenavOpened }) => {
        const settings = this.local.get('settings');
        this.local.set('settings', { ...settings, sidenavOpened });
        return SettingActions.setSidenavOpenedSuccess({ sidenavOpened });
      })
    );
  });

  sidenavCollapsed$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setSidenavCollapsed),
      map(({ sidenavCollapsed }) => {
        const settings = this.local.get('settings');
        this.local.set('settings', { ...settings, sidenavCollapsed });
        return SettingActions.setSidenavCollapsedSuccess({ sidenavCollapsed });
      })
    );
  });

  language$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setLanguage),
      map(({ language }) => {
        const settings = this.local.get('settings');
        this.local.set('settings', { ...settings, language });
        return SettingActions.setLanguageSuccess({ language });
      })
    );
  });

  sidenavWhenLayoutChanges$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingActions.setSidenavWhenLayoutChanges),
      map(({ sidenavOpened, sidenavCollapsed }) => {
        const settings = this.local.get('settings');
        this.local.set('settings', { ...settings, sidenavOpened, sidenavCollapsed });
        return SettingActions.setSidenavWhenLayoutChangesSuccess({
          sidenavOpened,
          sidenavCollapsed,
        });
      })
    );
  });

  constructor(
    private actions$: Actions,
    private overlay: OverlayContainer,
    private local: LocalStorageService
  ) {}
}
