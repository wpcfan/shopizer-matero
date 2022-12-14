import { Merchant, Pageable } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadMerchants = createAction(
  '[Store] Load Stores',
  props<{ page: number; params?: Record<string, string> }>()
);

export const loadMerchantsSuccess = createAction(
  '[Store] Load Stores Success',
  props<{ data: Pageable<Merchant> }>()
);

export const loadMerchantsFailure = createAction(
  '[Store] Load Stores Failure',
  props<{ error: string }>()
);

export const createMerchant = createAction(
  '[Store] Create Store',
  props<{ data: Partial<Merchant> }>()
);

export const createMerchantSuccess = createAction(
  '[Store] Create Store Success',
  props<{ data: Merchant }>()
);

export const createMerchantFailure = createAction(
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

export const updateMerchant = createAction(
  '[Store] Update Store',
  props<{ code: string; data: Partial<Merchant> }>()
);

export const updateMerchantSuccess = createAction(
  '[Store] Update Store Success',
  props<{ data: Merchant }>()
);

export const updateMerchantFailure = createAction(
  '[Store] Update Store Failure',
  props<{ error: string }>()
);

export const deleteMerchant = createAction('[Store] Delete Store', props<{ code: string }>());
export const deleteMerchantSuccess = createAction('[Store] Delete Store Success');
export const deleteMerchantFailure = createAction(
  '[Store] Delete Store Failure',
  props<{ error: string }>()
);
