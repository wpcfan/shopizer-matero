import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductAttribute from '../reducers/product-attribute.reducer';

export const selectProductAttributeState = createFeatureSelector<fromProductAttribute.State>(
  fromProductAttribute.productAttributeFeatureKey
);
