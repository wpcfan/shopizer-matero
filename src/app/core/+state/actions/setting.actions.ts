import { createAction, props } from '@ngrx/store';

export const setTheme = createAction('[Setting] Set the theme', props<{ theme: string }>());
