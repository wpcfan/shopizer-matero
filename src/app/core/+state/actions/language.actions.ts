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

export const loadStoreLanguages = createAction('[Profile] Load Store Languages');

export const loadStoreLanguagesSuccess = createAction(
  '[Profile] Load Store Languages Success',
  props<{ data: Language[] }>()
);

export const loadStoreLanguagesFailure = createAction(
  '[Profile] Load Store Languages Failure',
  props<{ error: string }>()
);
