import { Group } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadGroups = createAction('[Profile] Load Groups');

export const loadGroupsSuccess = createAction(
  '[Profile] Load Groups Success',
  props<{ data: Group[] }>()
);

export const loadGroupsFailure = createAction(
  '[Profile] Load Groups Failure',
  props<{ error: string }>()
);
