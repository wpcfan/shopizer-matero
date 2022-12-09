import { Group, Language, Profile } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions';

export const profileFeatureKey = 'profile';

export interface State {
  profile?: Profile;
  groups: Group[];
  languages: Language[];
  error?: string;
}

export const initialState: State = {
  groups: [],
  languages: [],
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loadProfileSuccess, (state, { data }): State => ({ ...state, profile: data })),
  on(AuthActions.loadProfileFailure, (state, { error }): State => ({ ...state, error })),
  on(AuthActions.loadGroupsSuccess, (state, { data }): State => ({ ...state, groups: data })),
  on(AuthActions.loadGroupsFailure, (state, { error }): State => ({ ...state, error })),
  on(AuthActions.loadLanguagesSuccess, (state, { data }): State => ({ ...state, languages: data })),
  on(AuthActions.loadLanguagesFailure, (state, { error }): State => ({ ...state, error }))
);
