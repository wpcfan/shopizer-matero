import { Pageable, ProductVariant } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadProductVariants = createAction(
  '[ProductVariant] Load ProductVariants',
  props<{ page: number }>()
);

export const loadProductVariantsSuccess = createAction(
  '[ProductVariant] Load ProductVariants Success',
  props<{ data: Pageable<ProductVariant> }>()
);

export const loadProductVariantsFailure = createAction(
  '[ProductVariant] Load ProductVariants Failure',
  props<{ error: any }>()
);

export const getById = createAction(
  '[Product Variant] Get Product Variant By Id',
  props<{ variantId: number; lang: string }>()
);

export const getByIdSuccess = createAction(
  '[Product Variant] Get Product Variant By Id Success',
  props<{ data: ProductVariant }>()
);

export const getByIdFailure = createAction(
  '[Product Variant] Get Product Variant By Id Failure',
  props<{ error: any }>()
);

export const createProductVariant = createAction(
  '[Product Variant] Create Product Variant',
  props<{ data: Partial<ProductVariant> }>()
);

export const createProductVariantSuccess = createAction(
  '[Product Variant] Create Product Variant Success',
  props<{ data: ProductVariant }>()
);

export const createProductVariantFailure = createAction(
  '[Product Variant] Create Product Variant Failure',
  props<{ error: any }>()
);

export const updateProductVariant = createAction(
  '[Product Variant] Update Product Variant',
  props<{ variantId: number; data: Partial<ProductVariant>; lang: string }>()
);

export const updateProductVariantSuccess = createAction(
  '[Product Variant] Update Product Variant Success',
  props<{ data: ProductVariant }>()
);

export const updateProductVariantFailure = createAction(
  '[Product Variant] Update Product Variant Failure',
  props<{ error: any }>()
);

export const deleteProductVariant = createAction(
  '[Product Variant] Delete Product Variant',
  props<{ id: number }>()
);

export const deleteProductVariantSuccess = createAction(
  '[Product Variant] Delete Product Variant Success'
);

export const deleteProductVariantFailure = createAction(
  '[Product Variant] Delete Product Variant Failure',
  props<{ error: any }>()
);
