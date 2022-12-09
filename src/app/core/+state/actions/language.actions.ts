import { Language } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadLanguages = createAction('[Profile] Load Languages');

export const loadLanguagesSuccess = createAction(
  '[Profile] Load Languages Success',
  props<{ data: Language[] }>()
);

export const loadLanguagesFailure = createAction(
  '[Profile] Load Languages Failure',
  props<{ error: string }>()
);
