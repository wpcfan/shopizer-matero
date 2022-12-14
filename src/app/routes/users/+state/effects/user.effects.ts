import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as AuthActions from '@core/+state/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { LocalStorageService } from '@shared';
import { of } from 'rxjs';
import { catchError, exhaustMap, filter, map, tap } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { UserService } from '../service/user.service';
@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      exhaustMap(({ page, params }) => {
        if (params?.store) {
          localStorage.setItem('store', params.store);
        }
        return this.userService.getUsers(page, params).pipe(
          map(data => UserActions.loadUsersSuccess({ data })),
          catchError(error => of(UserActions.loadUsersFailure({ error })))
        );
      })
    );
  });

  loadGroupsWhenRoutedToCreateOrEditUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/users/create' ||
          /\/users\/\d+/.test(payload.routerState.url)
      ),
      map(() => AuthActions.loadGroups())
    );
  });

  loadLanguagesWhenRoutedToCreateOrEditUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/users/create' ||
          /\/users\/\d+/.test(payload.routerState.url)
      ),
      map(() => AuthActions.loadLanguages())
    );
  });

  loadStoresWhenRoutedToCreateOrEditUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/users/list' ||
          payload.routerState.url === '/users/create' ||
          /\/users\/\d+/.test(payload.routerState.url)
      ),
      map(() => AuthActions.loadStores())
    );
  });

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.createUser),
      exhaustMap(({ data }) =>
        this.userService.create(data).pipe(
          map(data => UserActions.createUserSuccess({ data })),
          catchError(error => of(UserActions.createUserFailure({ error })))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ data, id }) =>
        this.userService.update(id, data).pipe(
          map(data => UserActions.updateUserSuccess({ data })),
          catchError(error => of(UserActions.updateUserFailure({ error })))
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      exhaustMap(({ id }) =>
        this.userService.delete(id).pipe(
          map(() => UserActions.deleteUserSuccess({ id })),
          catchError(error => of(UserActions.deleteUserFailure({ error })))
        )
      )
    );
  });

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getById),
      exhaustMap(({ id }) =>
        this.userService.getById(id).pipe(
          map(data => UserActions.getByIdSuccess({ data })),
          catchError(error => of(UserActions.getByIdFailure({ error })))
        )
      )
    );
  });

  createUserSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.createUserSuccess),
        tap(({ data }) =>
          this.router.navigate(['/users', data.id], {
            queryParams: { lang: this.local.get('settings').language },
          })
        )
      );
    },
    { dispatch: false }
  );

  deleteUserSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.deleteUserSuccess),
        tap(() => this.router.navigate(['/users', 'list']))
      );
    },
    { dispatch: false }
  );

  updateSuccessAndDisplayMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        tap(() => {
          this.snackBar.open('User updated successfully', 'Close', {
            duration: 2000,
          });
        })
      );
    },
    { dispatch: false }
  );

  changePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.changePassword),
      exhaustMap(({ id, password, repeatPassword }) =>
        this.userService.changePassword(id, password, repeatPassword).pipe(
          map(() => UserActions.changePasswordSuccess()),
          catchError(error => of(UserActions.changePasswordFailure({ error })))
        )
      )
    );
  });

  changePasswordSuccessAndDisplayMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.changePasswordSuccess),
        tap(() => {
          this.snackBar.open('Password changed successfully', 'Close', {
            duration: 2000,
          });
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private local: LocalStorageService
  ) {}
}
