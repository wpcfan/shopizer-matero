import { Country, Group, Language, Merchant, Profile, Zone } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../actions';

export const profileFeatureKey = 'profile';

export interface State {
  profile?: Profile;
  groups: Group[];
  languages: Language[];
  storeLanguages: Language[];
  countries: Country[];
  zones: Zone[];
  stores: Merchant[];
  error?: string;
}

export const initialState: State = {
  groups: [],
  languages: [],
  storeLanguages: [],
  countries: [],
  zones: [],
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
  on(ProfileActions.loadLanguagesFailure, (state, { error }): State => ({ ...state, error })),
  on(
    ProfileActions.loadCountriesSuccess,
    (state, { data }): State => ({ ...state, countries: data })
  ),
  on(ProfileActions.loadCountriesFailure, (state, { error }): State => ({ ...state, error })),
  on(ProfileActions.loadZonesSuccess, (state, { data }): State => ({ ...state, zones: data })),
  on(ProfileActions.loadZonesFailure, (state, { error }): State => ({ ...state, error })),
  on(
    ProfileActions.loadStoreLanguagesSuccess,
    (state, { data }): State => ({ ...state, storeLanguages: data })
  ),
  on(ProfileActions.loadStoreLanguagesFailure, (state, { error }): State => ({ ...state, error }))
);
