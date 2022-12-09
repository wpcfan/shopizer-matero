import { Profile } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadProfile = createAction('[Profile] Load Profile');

export const loadProfileSuccess = createAction(
  '[Profile] Load Profile Success',
  props<{ data: Profile }>()
);

export const loadProfileFailure = createAction(
  '[Profile] Load Profile Failure',
  props<{ error: string }>()
);

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ data: Partial<Profile>; id: number; merchant: string }>()
);

export const updateProfileSuccess = createAction(
  '[Profile] Update Profile Success',
  props<{ data: Profile }>()
);

export const updateProfileFailure = createAction(
  '[Profile] Update Profile Failure',
  props<{ error: string }>()
);
