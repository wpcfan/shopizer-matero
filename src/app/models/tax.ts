import { Description } from './description';

export interface TaxClass {
  id: number;
  code: string;
  name: string;
  store: string;
}

export interface TaxRate {
  code: string;
  country: string;
  descriptions?: Description[];
  description?: Description;
  id: number;
  priority: number;
  rate: number;
  store: string;
  taxClass: string;
  zone: string;
}
