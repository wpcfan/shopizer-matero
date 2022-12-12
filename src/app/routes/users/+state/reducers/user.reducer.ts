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
      page: Math.floor(data.recordsTotal / data.number),
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
  )
);
