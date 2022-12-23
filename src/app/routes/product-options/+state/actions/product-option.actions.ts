import { Pageable, ProductOption } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadProductOptions = createAction(
  '[ProductOption] Load ProductOptions',
  props<{ page: number; params?: Record<string, string> }>()
);

export const loadProductOptionsSuccess = createAction(
  '[ProductOption] Load ProductOptions Success',
  props<{ data: Pageable<ProductOption> }>()
);

export const loadProductOptionsFailure = createAction(
  '[ProductOption] Load ProductOptions Failure',
  props<{ error: any }>()
);

export const getById = createAction(
  '[Product Option] Get Product Option By Id',
  props<{ id: number; lang: string }>()
);

export const getByIdSuccess = createAction(
  '[Product Option] Get Product Option By Id Success',
  props<{ data: ProductOption }>()
);

export const getByIdFailure = createAction(
  '[Product Option] Get Product Option By Id Failure',
  props<{ error: any }>()
);

export const createProductOption = createAction(
  '[Product Option] Create Product Option',
  props<{ data: Partial<ProductOption> }>()
);

export const createProductOptionSuccess = createAction(
  '[Product Option] Create Product Option Success',
  props<{ data: ProductOption }>()
);

export const createProductOptionFailure = createAction(
  '[Product Option] Create Product Option Failure',
  props<{ error: any }>()
);

export const updateProductOption = createAction(
  '[Product Option] Update Product Option',
  props<{ id: number; data: Partial<ProductOption>; lang: string }>()
);

export const updateProductOptionSuccess = createAction(
  '[Product Option] Update Product Option Success',
  props<{ data: ProductOption }>()
);

export const updateProductOptionFailure = createAction(
  '[Product Option] Update Product Option Failure',
  props<{ error: any }>()
);

export const deleteProductOption = createAction(
  '[Product Option] Delete Product Option',
  props<{ id: number }>()
);

export const deleteProductOptionSuccess = createAction(
  '[Product Option] Delete Product Option Success'
);

export const deleteProductOptionFailure = createAction(
  '[Product Option] Delete Product Option Failure',
  props<{ error: any }>()
);
