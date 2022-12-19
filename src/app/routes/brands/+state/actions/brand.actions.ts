import { Manufacturer, Pageable } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadBrands = createAction(
  '[Brands] Load Brands',
  props<{ page: number; params?: Record<string, string> }>()
);

export const loadBrandsSuccess = createAction(
  '[Brands] Load Brands Success',
  props<{ data: Pageable<Manufacturer> }>()
);

export const loadBrandsFailure = createAction(
  '[Brands] Load Brands Failure',
  props<{ error: any }>()
);

export const getById = createAction(
  '[Brand] Get Brand By Id',
  props<{ id: number; lang: string }>()
);

export const getByIdSuccess = createAction(
  '[Brand] Get Brand By Id Success',
  props<{ data: Manufacturer }>()
);

export const getByIdFailure = createAction(
  '[Brand] Get Brand By Id Failure',
  props<{ error: string }>()
);

export const createBrand = createAction(
  '[Brand] Create Brand',
  props<{ data: Partial<Manufacturer> }>()
);

export const createBrandSuccess = createAction(
  '[Brand] Create Brand Success',
  props<{ data: Manufacturer }>()
);

export const createBrandFailure = createAction(
  '[Brand] Create Brand Failure',
  props<{ error: string }>()
);

export const updateBrand = createAction(
  '[Brand] Update Brand',
  props<{ id: number; data: Partial<Manufacturer>; lang: string }>()
);

export const updateBrandSuccess = createAction(
  '[Brand] Update Brand Success',
  props<{ data: Manufacturer }>()
);

export const updateBrandFailure = createAction(
  '[Brand] Update Brand Failure',
  props<{ error: string }>()
);

export const deleteBrand = createAction('[Brand] Delete Brand', props<{ id: number }>());

export const deleteBrandSuccess = createAction('[Brand] Delete Brand Success');

export const deleteBrandFailure = createAction(
  '[Brand] Delete Brand Failure',
  props<{ error: string }>()
);
