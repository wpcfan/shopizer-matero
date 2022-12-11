import { createAction, props } from '@ngrx/store';

export const loadStores = createAction('[Profile] Load Stores');

export const loadStoresSuccess = createAction(
  '[Profile] Load Stores Success',
  props<{ data: string[] }>()
);

export const loadStoresFailure = createAction(
  '[Profile] Load Stores Failure',
  props<{ error: string }>()
);
