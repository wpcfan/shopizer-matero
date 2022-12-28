import { ProductOption, ProductOptionValue } from './product-option';

export interface ProductVariant {
  id: number;
  code: string;
  defaultValue: boolean;
  date: string;
  sortOrder: number;
  option: number | ProductOption;
  optionValue: number | ProductOptionValue;
}
