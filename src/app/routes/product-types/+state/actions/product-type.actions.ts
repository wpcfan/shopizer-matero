import { Pageable, ProductType } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadProductTypes = createAction(
  '[ProductType] Load ProductTypes',
  props<{ page: number; params?: Record<string, string> }>()
);

export const loadProductTypesSuccess = createAction(
  '[ProductType] Load ProductTypes Success',
  props<{ data: Pageable<ProductType> }>()
);

export const loadProductTypesFailure = createAction(
  '[ProductType] Load ProductTypes Failure',
  props<{ error: any }>()
);

export const getById = createAction(
  '[Product Type] Get Product Type By Id',
  props<{ id: number }>()
);

export const getByIdSuccess = createAction(
  '[Product Type] Get Product Type By Id Success',
  props<{ data: ProductType }>()
);

export const getByIdFailure = createAction(
  '[Product Type] Get Product Type By Id Failure',
  props<{ error: string }>()
);

export const createProductType = createAction(
  '[Product Type] Create Product Type',
  props<{ data: Partial<ProductType> }>()
);

export const createProductTypeSuccess = createAction(
  '[Product Type] Create Product Type Success',
  props<{ data: ProductType }>()
);

export const createProductTypeFailure = createAction(
  '[Product Type] Create Product Type Failure',
  props<{ error: string }>()
);

export const updateProductType = createAction(
  '[Product Type] Update Product Type',
  props<{ id: number; data: Partial<ProductType> }>()
);

export const updateProductTypeSuccess = createAction(
  '[Product Type] Update Product Type Success',
  props<{ data: ProductType }>()
);

export const updateProductTypeFailure = createAction(
  '[Product Type] Update Product Type Failure',
  props<{ error: string }>()
);

export const deleteProductType = createAction(
  '[Product Type] Delete Product Type',
  props<{ id: number }>()
);

export const deleteProductTypeSuccess = createAction('[Product Type] Delete Product Type Success');

export const deleteProductTypeFailure = createAction(
  '[Product Type] Delete Product Type Failure',
  props<{ error: string }>()
);
