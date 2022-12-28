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
      name: 'users management',
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
    {
      route: '/merchants',
      name: 'Merchants',
      type: 'sub',
      icon: 'storefront',
      children: [
        {
          route: 'list',
          name: 'Merchant list',
          type: 'link',
        },
        {
          route: 'create',
          name: 'Create merchant',
          type: 'link',
        },
      ],
    },
    {
      route: '/categories',
      name: 'categories',
      type: 'sub',
      icon: 'category',
      children: [
        {
          route: 'list',
          name: 'Category list',
          type: 'link',
        },
        {
          route: 'create',
          name: 'Create category',
          type: 'link',
        },
        {
          route: 'hierarchy',
          name: 'Category hierarchy',
          type: 'link',
        },
      ],
    },
    {
      route: '/brands',
      name: 'brands',
      type: 'sub',
      icon: 'factory',
      children: [
        {
          route: 'list',
          name: 'Brand list',
          type: 'link',
        },
        {
          route: 'create',
          name: 'Create brand',
          type: 'link',
        },
      ],
    },
    {
      route: '/product-types',
      name: 'Product types',
      type: 'sub',
      icon: 'edit_attributes',
      children: [
        {
          route: 'list',
          name: 'Product type list',
          type: 'link',
        },
        {
          route: 'create',
          name: 'Create product type',
          type: 'link',
        },
      ],
    },
    {
      route: '/product-options',
      name: 'Product options',
      type: 'sub',
      icon: 'edit_attributes',
      children: [
        {
          route: 'options/list',
          name: 'Product option list',
          type: 'link',
        },
        {
          route: 'options/create',
          name: 'Create product option',
          type: 'link',
        },
        {
          route: 'values/list',
          name: 'Product option value list',
          type: 'link',
        },
        {
          route: 'values/create',
          name: 'Create product option value',
          type: 'link',
        },
      ],
    },
    {
      route: '/products',
      name: 'products',
      type: 'sub',
      icon: 'inventory',
      children: [
        {
          route: 'list',
          name: 'Product list',
          type: 'link',
        },
        {
          route: 'create',
          name: 'Create product',
          type: 'link',
        },
      ],
    },
    {
      route: '/shipping',
      name: 'shipping',
      type: 'sub',
      icon: 'delivery',
      children: [
        {
          route: 'expedition',
          name: 'Expedition',
          type: 'link',
        },
        {
          route: 'methods',
          name: 'Shipping Methods',
          type: 'link',
        },
        {
          route: 'origin',
          name: 'Shipping origin',
          type: 'link',
        },
        {
          route: 'packaging',
          name: 'Packaging',
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
