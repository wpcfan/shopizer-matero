import { Pageable, Product } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction(
  '[Product] Load Products',
  props<{ page: number; params?: Record<string, string> }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ data: Pageable<Product> }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);

export const getById = createAction(
  '[Product] Get Product By Id',
  props<{ id: number; lang: string }>()
);

export const getByIdSuccess = createAction(
  '[Product] Get Product By Id Success',
  props<{ data: Product }>()
);

export const getByIdFailure = createAction(
  '[Product] Get Product By Id Failure',
  props<{ error: any }>()
);

export const createProduct = createAction(
  '[Product] Create Product',
  props<{ data: Partial<Product> }>()
);

export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ data: Product }>()
);

export const createProductFailure = createAction(
  '[Product] Create Product Failure',
  props<{ error: any }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ id: number; data: Partial<Product>; lang: string }>()
);

export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ data: Product }>()
);

export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: any }>()
);

export const deleteProduct = createAction('[Product] Delete Product', props<{ id: number }>());

export const deleteProductSuccess = createAction('[Product] Delete Product Success');

export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: any }>()
);
