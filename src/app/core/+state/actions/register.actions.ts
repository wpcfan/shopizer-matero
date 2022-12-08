import { Signup } from '@models';
import { createAction, props } from '@ngrx/store';

export const register = createAction(
  '[Register Page] register',
  props<{ signup: Partial<Signup> }>()
);

export const registerSuccess = createAction('[Register Api] Register success', props<any>());

export const registerFailure = createAction(
  '[Register Api] Register failure',
  props<{ error: string }>()
);
