import { LoginRes } from '@models';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction('[Login Api] Login success', props<{ data: LoginRes }>());

export const loginFailure = createAction('[Login Api] Login failure', props<{ error: string }>());
