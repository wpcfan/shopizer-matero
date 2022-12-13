import { Currency } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadCurrencies = createAction('[Currency] Load Currencies');

export const loadCurrenciesSuccess = createAction(
  '[Currency] Load Currencies Success',
  props<{ data: Currency[] }>()
);

export const loadCurrenciesFailure = createAction(
  '[Currency] Load Currencies Failure',
  props<{ error: string }>()
);
