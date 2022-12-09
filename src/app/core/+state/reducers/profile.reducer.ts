import { Group, Language, Profile } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../actions';

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
  on(ProfileActions.loadProfileSuccess, (state, { data }): State => ({ ...state, profile: data })),
  on(ProfileActions.loadProfileFailure, (state, { error }): State => ({ ...state, error })),
  on(ProfileActions.loadGroupsSuccess, (state, { data }): State => ({ ...state, groups: data })),
  on(ProfileActions.loadGroupsFailure, (state, { error }): State => ({ ...state, error })),
  on(
    ProfileActions.loadLanguagesSuccess,
    (state, { data }): State => ({ ...state, languages: data })
  ),
  on(ProfileActions.loadLanguagesFailure, (state, { error }): State => ({ ...state, error }))
);
