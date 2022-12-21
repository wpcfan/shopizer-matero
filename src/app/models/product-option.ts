import { Description } from './description';

export interface ProductOption {
  id: number;
  order: number;
  code: string;
  readonly: boolean;
  type: 'select' | 'radio' | 'checkbox' | 'text';
  description?: Description;
  descriptions?: Description[];
}

export interface ProductOptionValue {
  id: number;
  order: number;
  code: string;
  name: string;
  defaultValue: boolean;
  descriptions?: Description[];
  description?: Description;
  image?: string;
  sortOrder: number;
}
