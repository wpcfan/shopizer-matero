import { environment } from '@env/environment';
import { Manufacturer } from '@models';
import { createReducer, on } from '@ngrx/store';
import * as BrandsActions from '../actions/brand.actions';

export const brandFeatureKey = 'brand';

export interface State {
  manufactures: Manufacturer[];
  error?: string;
  total: number;
  page: number;
  loading: boolean;
  filters?: Record<string, string>;
  selected?: Manufacturer;
}

export const initialState: State = {
  manufactures: [],
  total: 0,
  page: 0,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(
    BrandsActions.loadBrandsSuccess,
    (state, action): State => ({
      ...state,
      manufactures: action.data.data,
      total: action.data.recordsTotal,
      page: Math.floor(action.data.recordsTotal / environment.defaultPageSize),
      loading: false,
    })
  ),
  on(
    BrandsActions.loadBrandsFailure,
    (state, action): State => ({ ...state, error: action.error, loading: false })
  ),
  on(BrandsActions.getByIdSuccess, (state, action): State => ({ ...state, selected: action.data })),
  on(BrandsActions.getByIdFailure, (state, action): State => ({ ...state, error: action.error }))
);
