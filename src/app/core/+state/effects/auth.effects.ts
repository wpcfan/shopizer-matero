import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import * as AuthActions from '../actions';

@Injectable()
export class AuthEffects {
  initAuth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const token = rememberMe ? localStorage.getItem('token') : sessionStorage.getItem('token');
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          return AuthActions.initAuth({
            rememberMe: true,
            token: token || undefined,
            loggedIn: !!token,
          });
        } else {
          localStorage.setItem('rememberMe', 'false');
          return AuthActions.initAuth({
            rememberMe: false,
            token: token || undefined,
            loggedIn: !!token,
          });
        }
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ username, password, rememberMe }) =>
        this.authService.login(username, password).pipe(
          map(data => {
            localStorage.setItem('rememberMe', rememberMe ? 'true' : 'false');
            if (rememberMe) {
              localStorage.setItem('token', data.token);
            } else {
              sessionStorage.setItem('token', data.token);
            }
            return AuthActions.loginSuccess({ data });
          }),
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              return of(AuthActions.loginFailure({ error: error.error.message }));
            }
            return of(AuthActions.loginFailure({ error: 'Unknown Error' }));
          })
        )
      )
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ signup }) =>
        this.authService.register(signup).pipe(
          map(data => AuthActions.registerSuccess({ data })),
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              return of(AuthActions.registerFailure({ error: error.error.message }));
            }
            return of(AuthActions.registerFailure({ error: 'Unknown Error' }));
          })
        )
      )
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          this.router.navigate(['/auth/login']);
        })
      );
    },
    { dispatch: false }
  );

  loadCountriesWhenRoutedToRegister$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(({ payload }) => payload.routerState.url === '/register'),
      map(() => AuthActions.loadCountries())
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
