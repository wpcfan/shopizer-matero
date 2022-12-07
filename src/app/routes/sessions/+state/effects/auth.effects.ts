import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/authentication';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as AuthActions from '../actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map(data => {
            sessionStorage.setItem('token', data.token);
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

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
