import { Currency, Merchant } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as StoreActions from '../actions';

export const storeFeatureKey = 'store';

export interface State {
  stores: Merchant[];
  currencies: Currency[];
  dimensions: string[];
  weights: string[];
  retailers: Merchant[];
  error?: string;
  total: number;
  page: number;
  loading: boolean;
  filters?: Record<string, string>;
  selectedStore?: Merchant;
}

export const initialState: State = {
  stores: [],
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
    StoreActions.loadStores,
    (state): State => ({
      ...state,
      loading: true,
    })
  ),
  on(
    StoreActions.loadStoresSuccess,
    (state, { data }): State => ({
      ...state,
      stores: data.data,
      total: data.recordsTotal,
      page: Math.floor(data.recordsTotal / data.number),
      loading: false,
    })
  ),
  on(
    StoreActions.loadStoresFailure,
    (state, { error }): State => ({ ...state, error, loading: false })
  ),
  on(
    StoreActions.loadCurrenciesSuccess,
    (state, { data }): State => ({ ...state, currencies: data })
  ),
  on(
    StoreActions.loadMeasuresSuccess,
    (state, { data }): State => ({
      ...state,
      dimensions: data.dimensions,
      weights: data.weights,
    })
  ),
  on(StoreActions.loadCurrenciesFailure, (state, { error }): State => ({ ...state, error })),
  on(StoreActions.loadMeasuresFailure, (state, { error }): State => ({ ...state, error })),
  on(
    StoreActions.loadRetailersSuccess,
    (state, { data }): State => ({ ...state, retailers: data })
  ),
  on(StoreActions.loadRetailersFailure, (state, { error }): State => ({ ...state, error })),
  on(
    StoreActions.selectMerchantSuccess,
    (state, { data }): State => ({ ...state, selectedStore: data })
  ),
  on(StoreActions.selectMerchantFailure, (state, { error }): State => ({ ...state, error }))
);
