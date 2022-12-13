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

export const selectMerchant = createAction('[Store] Select Store', props<{ code: string }>());

export const selectMerchantSuccess = createAction(
  '[Store] Select Store Success',
  props<{ data: Merchant }>()
);

export const selectMerchantFailure = createAction(
  '[Store] Select Store Failure',
  props<{ error: string }>()
);

export const updateStore = createAction(
  '[Store] Update Store',
  props<{ code: string; data: Partial<Merchant> }>()
);

export const updateStoreSuccess = createAction(
  '[Store] Update Store Success',
  props<{ data: Merchant }>()
);

export const updateStoreFailure = createAction(
  '[Store] Update Store Failure',
  props<{ error: string }>()
);

export const deleteStore = createAction('[Store] Delete Store', props<{ code: string }>());
export const deleteStoreSuccess = createAction('[Store] Delete Store Success');
export const deleteStoreFailure = createAction(
  '[Store] Delete Store Failure',
  props<{ error: string }>()
);
