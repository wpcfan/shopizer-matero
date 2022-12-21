import { Pageable, ProductOptionValue } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadProductOptionValues = createAction(
  '[Product Option Value] Load ProductOptionValues',
  props<{ page: number; params?: Record<string, string> }>()
);

export const loadProductOptionValuesSuccess = createAction(
  '[Product Option Value] Load ProductOptionValues Success',
  props<{ data: Pageable<ProductOptionValue> }>()
);

export const loadProductOptionValuesFailure = createAction(
  '[Product Option Value] Load ProductOptionValues Failure',
  props<{ error: any }>()
);

export const getById = createAction(
  '[Product Option Value] Get Product Option Value By Id',
  props<{ id: number; lang: string }>()
);

export const getByIdSuccess = createAction(
  '[Product Option Value] Get Product Option Value By Id Success',
  props<{ data: ProductOptionValue }>()
);

export const getByIdFailure = createAction(
  '[Product Option Value] Get Product Option Value By Id Failure',
  props<{ error: string }>()
);

export const createProductOptionValue = createAction(
  '[Product Option Value] Create Product Option Value',
  props<{ data: Partial<ProductOptionValue> }>()
);

export const createProductOptionValueSuccess = createAction(
  '[Product Option Value] Create Product Option Value Success',
  props<{ data: ProductOptionValue }>()
);

export const createProductOptionValueFailure = createAction(
  '[Product Option Value] Create Product Option Value Failure',
  props<{ error: string }>()
);

export const updateProductOptionValue = createAction(
  '[Product Option Value] Update Product Option Value',
  props<{ id: number; data: Partial<ProductOptionValue>; lang: string }>()
);

export const updateProductOptionValueSuccess = createAction(
  '[Product Option Value] Update Product Option Value Success',
  props<{ data: ProductOptionValue }>()
);

export const updateProductOptionValueFailure = createAction(
  '[Product Option Value] Update Product Option Value Failure',
  props<{ error: string }>()
);

export const deleteProductOptionValue = createAction(
  '[Product Option Value] Delete Product Option Value',
  props<{ id: number }>()
);

export const deleteProductOptionValueSuccess = createAction(
  '[Product Option Value] Delete Product Option Value Success'
);

export const deleteProductOptionValueFailure = createAction(
  '[Product Option Value] Delete Product Option Value Failure',
  props<{ error: string }>()
);
