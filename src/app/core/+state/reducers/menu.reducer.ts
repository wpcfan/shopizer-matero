import { Menu } from '@models';
import { createReducer, on } from '@ngrx/store';

import * as MenuActions from '../actions/menu.actions';

export const menuFeatureKey = 'menu';

export interface State {
  menus: Menu[];
}

export const initialState: State = {
  menus: [
    {
      route: 'dashboard',
      name: 'dashboard',
      type: 'link',
      icon: 'dashboard',
      badge: {
        color: 'red-500',
        value: '5',
      },
    },
    {
      route: '/',
      name: 'sessions',
      type: 'sub',
      icon: 'question_answer',
      children: [
        {
          route: '403',
          name: '403',
          type: 'link',
        },
        {
          route: '404',
          name: '404',
          type: 'link',
        },
        {
          route: '500',
          name: '500',
          type: 'link',
        },
      ],
    },
  ],
};

export const reducer = createReducer(
  initialState,
  on(MenuActions.loadMenus, (state, { menus }): State => ({ ...state, menus }))
);
