import { Pageable, Profile } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction(
  '[User] Load Users',
  props<{ page: number; params?: Record<string, string> }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ data: Pageable<Profile> }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);

export const createUser = createAction(
  '[Create User Page] Create user',
  props<{ data: Partial<Profile> }>()
);

export const createUserSuccess = createAction(
  '[User Service] User creation successfully',
  props<{ data: Profile }>()
);

export const createUserFailure = createAction(
  '[User Service] User creation failed',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[Update User Page] Update user',
  props<{ data: Partial<Profile>; id: number }>()
);

export const updateUserSuccess = createAction(
  '[User Service] User update successfully',
  props<{ data: Profile }>()
);

export const updateUserFailure = createAction(
  '[User Service] User update failed',
  props<{ error: string }>()
);

export const deleteUser = createAction('[User List Page] Delete user', props<{ id: number }>());

export const deleteUserSuccess = createAction(
  '[User Service] User deletion successfully',
  props<{ id: number }>()
);

export const deleteUserFailure = createAction(
  '[User Service] User deletion failed',
  props<{ error: string }>()
);

export const getById = createAction('[User List Page] Get user by id', props<{ id: number }>());

export const getByIdSuccess = createAction(
  '[User Service] Get user by id successfully',
  props<{ data: Profile }>()
);

export const getByIdFailure = createAction(
  '[User Service] Get user by id failed',
  props<{ error: string }>()
);

export const changePassword = createAction(
  '[Change Password Page] Change password',
  props<{ id: number; password: string; repeatPassword: string }>()
);

export const changePasswordSuccess = createAction('[User Service] Change password successfully');

export const changePasswordFailure = createAction(
  '[User Service] Change password failed',
  props<{ error: string }>()
);
