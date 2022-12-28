import { Country, Expedition } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadExpedition = createAction('[Expedition] Load Expedition');

export const loadExpeditionSuccess = createAction(
  '[Expedition] Load Expedition Success',
  props<{ data: Expedition }>()
);

export const loadExpeditionFailure = createAction(
  '[Expedition] Load Expedition Failure',
  props<{ error: any }>()
);

export const loadShippingCountries = createAction('[Expedition] Load Shipping Countries');

export const loadShippingCountriesSuccess = createAction(
  '[Expedition] Load Shipping Countries Success',
  props<{ data: Country[] }>()
);

export const loadShippingCountriesFailure = createAction(
  '[Expedition] Load Shipping Countries Failure',
  props<{ error: any }>()
);

export const updateExpedition = createAction(
  '[Expedition] Update Expedition',
  props<{ data: Partial<Expedition> }>()
);

export const updateExpeditionSuccess = createAction(
  '[Expedition] Update Expedition Success',
  props<{ data: Partial<Expedition> }>()
);

export const updateExpeditionFailure = createAction(
  '[Expedition] Update Expedition Failure',
  props<{ error: any }>()
);
