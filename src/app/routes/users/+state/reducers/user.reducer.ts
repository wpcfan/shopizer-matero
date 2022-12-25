import { environment } from '@env/environment';
import { Profile } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface State {
  users: Profile[];
  total: number;
  page: number;
  loading: boolean;
  error?: string;
  filters?: Record<string, string>;
  selectedUser?: Profile;
}

export const initialState: State = {
  users: [],
  total: 0,
  page: 0,
  loading: false,
};

export const reducer = createReducer(
  initialState,
  on(
    UserActions.loadUsers,
    (state): State => ({
      ...state,
      loading: true,
    })
  ),
  on(
    UserActions.loadUsersSuccess,
    (state, { data }): State => ({
      ...state,
      users: data.data,
      total: data.recordsTotal,
      page: Math.floor(data.recordsTotal / environment.defaultPageSize),
      loading: false,
    })
  ),
  on(
    UserActions.loadUsersFailure,
    (state, action): State => ({
      ...state,
      error: action.error,
      loading: false,
    })
  ),
  on(
    UserActions.getByIdSuccess,
    (state, { data }): State => ({
      ...state,
      selectedUser: data,
    })
  ),
  on(
    UserActions.getByIdFailure,
    (state, action): State => ({
      ...state,
      error: action.error,
    })
  ),
  on(
    UserActions.updateUserSuccess,
    (state, { data }): State => ({
      ...state,
      selectedUser: data,
    })
  ),
  on(
    UserActions.updateUserFailure,
    (state, action): State => ({
      ...state,
      error: action.error,
    })
  ),
  on(
    UserActions.deleteUserSuccess,
    (state): State => ({
      ...state,
      selectedUser: undefined,
    })
  ),
  on(
    UserActions.deleteUserFailure,
    (state, action): State => ({
      ...state,
      error: action.error,
    })
  )
);
