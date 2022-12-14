import { Merchant, Pageable } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadMerchants = createAction(
  '[Merchant] Load Merchants',
  props<{ page: number; params?: Record<string, string> }>()
);

export const loadMerchantsSuccess = createAction(
  '[Merchant] Load Merchants Success',
  props<{ data: Pageable<Merchant> }>()
);

export const loadMerchantsFailure = createAction(
  '[Merchant] Load Merchants Failure',
  props<{ error: string }>()
);

export const createMerchant = createAction(
  '[Merchant] Create Merchant',
  props<{ data: Partial<Merchant> }>()
);

export const createMerchantSuccess = createAction(
  '[Merchant] Create Merchant Success',
  props<{ data: Merchant }>()
);

export const createMerchantFailure = createAction(
  '[Merchant] Create Merchant Failure',
  props<{ error: string }>()
);

export const getByCode = createAction('[Merchant] Get Merchant By Code', props<{ code: string }>());

export const getByCodeSuccess = createAction(
  '[Merchant] Get Merchant By Code Success',
  props<{ data: Merchant }>()
);

export const getByCodeFailure = createAction(
  '[Merchant] Get Merchant By Code Failure',
  props<{ error: string }>()
);

export const updateMerchant = createAction(
  '[Merchant] Update Merchant',
  props<{ code: string; data: Partial<Merchant> }>()
);

export const updateMerchantSuccess = createAction(
  '[Merchant] Update Merchant Success',
  props<{ data: Merchant }>()
);

export const updateMerchantFailure = createAction(
  '[Merchant] Update Merchant Failure',
  props<{ error: string }>()
);

export const deleteMerchant = createAction('[Merchant] Delete Merchant', props<{ code: string }>());
export const deleteMerchantSuccess = createAction('[Merchant] Delete Merchant Success');
export const deleteMerchantFailure = createAction(
  '[Merchant] Delete Merchant Failure',
  props<{ error: string }>()
);
