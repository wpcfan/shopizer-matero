import { createAction, props } from '@ngrx/store';

export const loadCountries = createAction('[Profile] Load Countries');

export const loadCountriesSuccess = createAction(
  '[Profile] Load Countries Success',
  props<{ data: string[] }>()
);

export const loadCountriesFailure = createAction(
  '[Profile] Load Countries Failure',
  props<{ error: string }>()
);
