import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';
import { UserService } from '../service/user.service';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      exhaustMap(({ page, params }) =>
        this.userService.getUsers(page, params).pipe(
          map(data => UserActions.loadUsersSuccess({ data })),
          catchError(error => of(UserActions.loadUsersFailure({ error })))
        )
      )
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

  constructor(private actions$: Actions, private userService: UserService) {}
}
