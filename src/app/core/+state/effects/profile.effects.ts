import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from '@core/authentication';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { catchError, exhaustMap, filter, map, of } from 'rxjs';

import * as AuthActions from '../actions';

@Injectable()
export class ProfileEffects {
  loadGroupsWhenRoutedToGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(({ payload }) => payload.routerState.url === '/profile/overview'),
      map(() => AuthActions.loadGroups())
    );
  });

  loadLanguagesWhenRoutedToGroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(({ payload }) => payload.routerState.url === '/profile/overview'),
      map(() => AuthActions.loadLanguages())
    );
  });

  loadProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadProfile),
      exhaustMap(() =>
        this.profileService.user().pipe(
          map(data => {
            localStorage.setItem('store', data.merchant);
            return AuthActions.loadProfileSuccess({ data });
          }),
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              return of(AuthActions.loadProfileFailure({ error: error.error.message }));
            }
            return of(AuthActions.loadProfileFailure({ error: 'Unknown Error' }));
          })
        )
      )
    );
  });

  groups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadGroups),
      exhaustMap(() =>
        this.profileService.groups().pipe(
          map(data => AuthActions.loadGroupsSuccess({ data })),
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              return of(AuthActions.loadGroupsFailure({ error: error.error.message }));
            }
            return of(AuthActions.loadGroupsFailure({ error: 'Unknown Error' }));
          })
        )
      )
    );
  });

  languages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadLanguages),
      exhaustMap(() =>
        this.profileService.languages().pipe(
          map(data => AuthActions.loadLanguagesSuccess({ data })),
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              return of(AuthActions.loadLanguagesFailure({ error: error.error.message }));
            }
            return of(AuthActions.loadLanguagesFailure({ error: 'Unknown Error' }));
          })
        )
      )
    );
  });

  stores$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadStores),
      exhaustMap(() =>
        this.profileService.stores().pipe(
          map(data => AuthActions.loadStoresSuccess({ data })),
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              return of(AuthActions.loadStoresFailure({ error: error.error.message }));
            }
            return of(AuthActions.loadStoresFailure({ error: 'Unknown Error' }));
          })
        )
      )
    );
  });

  countries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadCountries),
      exhaustMap(() =>
        this.profileService.countries().pipe(
          map(data => AuthActions.loadCountriesSuccess({ data })),
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              return of(AuthActions.loadCountriesFailure({ error: error.error.message }));
            }
            return of(AuthActions.loadCountriesFailure({ error: 'Unknown Error' }));
          })
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.updateProfile),
      exhaustMap(({ data: profile, id, merchant }) =>
        this.profileService.update(profile, id, merchant).pipe(
          map(data => AuthActions.updateProfileSuccess({ data })),
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              return of(AuthActions.updateProfileFailure({ error: error.error.message }));
            }
            return of(AuthActions.updateProfileFailure({ error: 'Unknown Error' }));
          })
        )
      )
    );
  });

  constructor(private actions$: Actions, private profileService: ProfileService) {}
}
