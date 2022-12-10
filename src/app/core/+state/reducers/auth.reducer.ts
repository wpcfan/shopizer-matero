import { Group, Language } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions';

export const authFeatureKey = 'auth';

export interface State {
  groups: Group[];
  languages: Language[];
  loggedIn: boolean;
  rememberMe: boolean;
  error?: string;
  token?: string;
}

export const initialState: State = {
  loggedIn: false,
  rememberMe: false,
  groups: [],
  languages: [],
};

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.initAuth,
    (state, { rememberMe, token, loggedIn }): State => ({
      ...state,
      rememberMe,
      token,
      loggedIn,
    })
  ),
  on(AuthActions.login, (state, { rememberMe }): State => ({ ...state, rememberMe })),
  on(
    AuthActions.loginSuccess,
    (state, { data }): State => ({
      ...state,
      loggedIn: true,
      token: data.token,
    })
  ),
  on(AuthActions.loginFailure, (state, { error }): State => ({ ...state, loggedIn: false, error })),
  on(AuthActions.registerSuccess, (state): State => ({ ...state, loggedIn: true })),
  on(
    AuthActions.registerFailure,
    (state, { error }): State => ({ ...state, loggedIn: false, error })
  )
);
