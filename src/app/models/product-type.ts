import { Description } from './description';

export interface ProductType {
  id: number;
  code: string;
  visible: boolean;
  allowAddToCart: boolean;
  description?: Description;
  descriptions?: Description[];
}
