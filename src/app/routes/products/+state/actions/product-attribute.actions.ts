import { Pageable, ProductAttribute } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadProductAttributes = createAction(
  '[ProductAttribute] Load ProductAttributes',
  props<{ productId: number; page: number }>()
);

export const loadProductAttributesSuccess = createAction(
  '[ProductAttribute] Load ProductAttributes Success',
  props<{ data: Pageable<ProductAttribute> }>()
);

export const loadProductAttributesFailure = createAction(
  '[ProductAttribute] Load ProductAttributes Failure',
  props<{ error: any }>()
);

export const getById = createAction(
  '[Product Attribute] Get Product Attribute By Id',
  props<{ productId: number; attributeId: number; lang: string }>()
);

export const getByIdSuccess = createAction(
  '[Product Attribute] Get Product Attribute By Id Success',
  props<{ data: ProductAttribute }>()
);

export const getByIdFailure = createAction(
  '[Product Attribute] Get Product Attribute By Id Failure',
  props<{ error: any }>()
);

export const createProductAttribute = createAction(
  '[Product Attribute] Create Product Attribute',
  props<{ productId: number; data: Partial<ProductAttribute> }>()
);

export const createProductAttributeSuccess = createAction(
  '[Product Attribute] Create Product Attribute Success',
  props<{ data: ProductAttribute }>()
);

export const createProductAttributeFailure = createAction(
  '[Product Attribute] Create Product Attribute Failure',
  props<{ error: any }>()
);

export const updateProductAttribute = createAction(
  '[Product Attribute] Update Product Attribute',
  props<{ productId: number; attributeId: number; data: Partial<ProductAttribute>; lang: string }>()
);

export const updateProductAttributeSuccess = createAction(
  '[Product Attribute] Update Product Attribute Success',
  props<{ data: ProductAttribute }>()
);

export const updateProductAttributeFailure = createAction(
  '[Product Attribute] Update Product Attribute Failure',
  props<{ error: any }>()
);

export const deleteProductAttribute = createAction(
  '[Product Attribute] Delete Product Attribute',
  props<{ productId: number; id: number }>()
);

export const deleteProductAttributeSuccess = createAction(
  '[Product Attribute] Delete Product Attribute Success'
);

export const deleteProductAttributeFailure = createAction(
  '[Product Attribute] Delete Product Attribute Failure',
  props<{ error: any }>()
);
