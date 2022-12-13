import { Measure } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadMeasures = createAction('[Measures] Load Measures');

export const loadMeasuresSuccess = createAction(
  '[Measures] Load Measures Success',
  props<{ data: Measure }>()
);

export const loadMeasuresFailure = createAction(
  '[Measures] Load Measures Failure',
  props<{ error: string }>()
);
