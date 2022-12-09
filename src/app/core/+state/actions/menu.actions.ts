import { Menu } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadMenus = createAction('[Home Page] Load Menus', props<{ menus: Menu[] }>());
