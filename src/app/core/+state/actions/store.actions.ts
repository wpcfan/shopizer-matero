import { Merchant } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadStores = createAction('[Profile] Load Stores');

export const loadStoresSuccess = createAction(
  '[Profile] Load Stores Success',
  props<{ data: Merchant[] }>()
);

export const loadStoresFailure = createAction(
  '[Profile] Load Stores Failure',
  props<{ error: string }>()
);
