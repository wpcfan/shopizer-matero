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
      route: '/users',
      name: 'users',
      type: 'sub',
      icon: 'group',
      children: [
        {
          route: 'list',
          name: 'User list',
          type: 'link',
        },
        {
          route: 'create',
          name: 'Create user',
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
