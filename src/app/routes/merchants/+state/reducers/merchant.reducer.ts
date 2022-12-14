import { Currency, Merchant } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as MerchantActions from '../actions';

export const merchantFeatureKey = 'merchant';

export interface State {
  merchants: Merchant[];
  currencies: Currency[];
  dimensions: string[];
  weights: string[];
  retailers: Merchant[];
  error?: string;
  total: number;
  page: number;
  loading: boolean;
  filters?: Record<string, string>;
  selectedMerchant?: Merchant;
}

export const initialState: State = {
  merchants: [],
  currencies: [],
  dimensions: [],
  weights: [],
  retailers: [],
  total: 0,
  page: 0,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(
    MerchantActions.loadMerchants,
    (state): State => ({
      ...state,
      loading: true,
    })
  ),
  on(
    MerchantActions.loadMerchantsSuccess,
    (state, { data }): State => ({
      ...state,
      merchants: data.data,
      total: data.recordsTotal,
      page: Math.floor(data.recordsTotal / data.number),
      loading: false,
    })
  ),
  on(
    MerchantActions.loadMerchantsFailure,
    (state, { error }): State => ({ ...state, error, loading: false })
  ),
  on(
    MerchantActions.loadCurrenciesSuccess,
    (state, { data }): State => ({ ...state, currencies: data })
  ),
  on(
    MerchantActions.loadMeasuresSuccess,
    (state, { data }): State => ({
      ...state,
      dimensions: data.dimensions,
      weights: data.weights,
    })
  ),
  on(MerchantActions.loadCurrenciesFailure, (state, { error }): State => ({ ...state, error })),
  on(MerchantActions.loadMeasuresFailure, (state, { error }): State => ({ ...state, error })),
  on(
    MerchantActions.loadRetailersSuccess,
    (state, { data }): State => ({ ...state, retailers: data })
  ),
  on(MerchantActions.loadRetailersFailure, (state, { error }): State => ({ ...state, error })),
  on(
    MerchantActions.selectMerchantSuccess,
    (state, { data }): State => ({ ...state, selectedMerchant: data })
  ),
  on(MerchantActions.selectMerchantFailure, (state, { error }): State => ({ ...state, error }))
);
