import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(fromUser.userFeatureKey);

export const selectUsers = createSelector(selectUserState, state => state.users);

export const selectTotal = createSelector(selectUserState, state => state.total);

export const selectPage = createSelector(selectUserState, state => state.page);

export const selectLoading = createSelector(selectUserState, state => state.loading);

export const selectError = createSelector(selectUserState, state => state.error);

export const selectUser = createSelector(selectUserState, state => state.selectedUser);
