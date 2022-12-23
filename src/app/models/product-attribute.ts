import { ProductOption, ProductOptionValue } from './product-option';

export interface ProductAttribute {
  id: number;
  attributeDefault: boolean;
  attributeDisplayOnly: boolean;
  option: ProductOption;
  optionValue: ProductOptionValue;
  productAttributePrice: number;
  productAttributeWeight: number;
  productId: number;
  sortOrder: number;
}
