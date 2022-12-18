import { Category, Pageable } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadCategories = createAction(
  '[Category] Load Categories',
  props<{ page: number; params?: Record<string, string> }>()
);

export const loadCategoriesSuccess = createAction(
  '[Category] Load Categories Success',
  props<{ data: Pageable<Category> }>()
);

export const loadCategoriesFailure = createAction(
  '[Category] Load Categories Failure',
  props<{ error: string }>()
);

export const getById = createAction(
  '[Category] Get Category By Id',
  props<{ id: number; lang: string }>()
);

export const getByIdSuccess = createAction(
  '[Category] Get Category By Id Success',
  props<{ data: Category }>()
);

export const getByIdFailure = createAction(
  '[Category] Get Category By Id Failure',
  props<{ error: string }>()
);

export const createCategory = createAction(
  '[Category] Create Category',
  props<{ data: Partial<Category> }>()
);

export const createCategorySuccess = createAction(
  '[Category] Create Category Success',
  props<{ data: Category }>()
);

export const createCategoryFailure = createAction(
  '[Category] Create Category Failure',
  props<{ error: string }>()
);

export const updateCategory = createAction(
  '[Category] Update Category',
  props<{ id: number; data: Partial<Category>; lang: string }>()
);

export const updateCategorySuccess = createAction(
  '[Category] Update Category Success',
  props<{ data: Category }>()
);

export const updateCategoryFailure = createAction(
  '[Category] Update Category Failure',
  props<{ error: string }>()
);

export const deleteCategory = createAction('[Category] Delete Category', props<{ id: number }>());

export const deleteCategorySuccess = createAction('[Category] Delete Category Success');

export const deleteCategoryFailure = createAction(
  '[Category] Delete Category Failure',
  props<{ error: string }>()
);

export const loadAll = createAction('[Category] Load All Categories');

export const loadAllSuccess = createAction(
  '[Category] Load All Categories Success',
  props<{ data: Category[] }>()
);

export const loadAllFailure = createAction(
  '[Category] Load All Categories Failure',
  props<{ error: string }>()
);
