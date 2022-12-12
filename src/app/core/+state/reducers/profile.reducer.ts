import { Group, Language, Merchant, Profile } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../actions';

export const profileFeatureKey = 'profile';

export interface State {
  profile?: Profile;
  groups: Group[];
  languages: Language[];
  stores: Merchant[];
  error?: string;
}

export const initialState: State = {
  groups: [],
  languages: [],
  stores: [],
};

export const reducer = createReducer(
  initialState,
  on(ProfileActions.loadStoresSuccess, (state, { data }): State => ({ ...state, stores: data })),
  on(ProfileActions.loadStoresFailure, (state, { error }): State => ({ ...state, error })),
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
