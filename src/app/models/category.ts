import { Description } from './description';

export interface Category {
  id: number;
  code: string;
  depth: number;
  description: Description;
  featured: boolean;
  lineage?: string;
  parent?: Category;
  sortOrder: number;
  productCount: number;
  store: string;
  visible: boolean;
  children: Category[];
}
