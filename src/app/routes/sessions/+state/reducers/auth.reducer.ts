import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions';

export const authFeatureKey = 'auth';

export interface State {
  username?: string;
  loggedIn: boolean;
  error?: string;
  token?: string;
}

export const initialState: State = {
  loggedIn: false,
};

export const reducer = createReducer(
  initialState,
  on(
    AuthActions.loginSuccess,
    (state, { data }): State => ({
      ...state,
      loggedIn: true,
      token: data.token,
    })
  ),
  on(
    AuthActions.loginFailure,
    (state, { error }): State => ({ ...state, loggedIn: false, error })
  ),
  on(
    AuthActions.registerSuccess,
    (state): State => ({ ...state, loggedIn: true })
  ),
  on(
    AuthActions.registerFailure,
    (state, { error }): State => ({ ...state, loggedIn: false, error })
  )
);
