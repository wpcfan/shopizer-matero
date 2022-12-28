import { Country, Expedition } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as ExpeditionActions from '../actions/expedition.actions';

export const expeditionFeatureKey = 'expedition';

export interface State {
  expedition?: Expedition;
  countries: Country[];
  loading: boolean;
  error?: any;
}

export const initialState: State = {
  countries: [],
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(ExpeditionActions.loadExpedition, (state, _): State => ({ ...state, loading: true })),
  on(
    ExpeditionActions.loadExpeditionSuccess,
    (state, action): State => ({ ...state, expedition: action.data, loading: false })
  ),
  on(
    ExpeditionActions.loadExpeditionFailure,
    (state, action): State => ({ ...state, error: action.error, loading: false })
  )
);
