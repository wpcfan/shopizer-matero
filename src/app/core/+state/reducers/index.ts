import { isDevMode } from '@angular/core';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromSetting from './setting.reducer';

export interface AppState {
  [fromSetting.settingFeatureKey]: fromSetting.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromSetting.settingFeatureKey]: fromSetting.reducer,
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
