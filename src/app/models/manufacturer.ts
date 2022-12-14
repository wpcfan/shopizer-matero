import { Description } from './description';

export interface Manufacturer {
  id: number;
  code: string;
  description?: Description;
  descriptions?: Description[];
  order: number;
}
