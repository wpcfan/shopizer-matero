import { Merchant } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadRetailers = createAction('[Retailer] Load Retailers');

export const loadRetailersSuccess = createAction(
  '[Retailer] Load Retailers Success',
  props<{ data: Merchant[] }>()
);

export const loadRetailersFailure = createAction(
  '[Retailer] Load Retailers Failure',
  props<{ error: string }>()
);
