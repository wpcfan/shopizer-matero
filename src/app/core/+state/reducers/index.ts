import { isDevMode } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromProfile from './profile.reducer';
import * as fromSetting from './setting.reducer';

export interface AppState {
  [fromSetting.settingFeatureKey]: fromSetting.State;
  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromProfile.profileFeatureKey]: fromProfile.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromSetting.settingFeatureKey]: fromSetting.reducer,
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromProfile.profileFeatureKey]: fromProfile.reducer,
};

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [debug] : [];
