import { createAction, props } from '@ngrx/store';
import { ThemeType } from '../reducers/root.reducer';

export const setTheme = createAction('[Setting] Set the theme', props<{ theme: ThemeType }>());
