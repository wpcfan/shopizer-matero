import { createReducer, on } from '@ngrx/store';
import * as SettingActions from '../actions/setting.actions';

export const settingFeatureKey = 'setting';

export interface State {
  theme: string;
}

export const initialState: State = {
  theme: 'theme-light',
};

export const reducer = createReducer(
  initialState,
  on(SettingActions.setTheme, (state, { theme }): State => ({ ...state, theme }))
);
