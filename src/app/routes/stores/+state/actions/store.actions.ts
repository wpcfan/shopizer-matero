import { Merchant, Pageable } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadStores = createAction(
  '[Store] Load Stores',
  props<{ page: number; params?: Record<string, string> }>()
);

export const loadStoresSuccess = createAction(
  '[Store] Load Stores Success',
  props<{ data: Pageable<Merchant> }>()
);

export const loadStoresFailure = createAction(
  '[Store] Load Stores Failure',
  props<{ error: string }>()
);

export const createStore = createAction(
  '[Store] Create Store',
  props<{ data: Partial<Merchant> }>()
);

export const createStoreSuccess = createAction(
  '[Store] Create Store Success',
  props<{ data: Merchant }>()
);

export const createStoreFailure = createAction(
  '[Store] Create Store Failure',
  props<{ error: string }>()
);
