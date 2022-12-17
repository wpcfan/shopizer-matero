export interface CategoryDescription {
  id: number;
  description: string;
  friendlyUrl?: string;
  highlights: string;
  keyWords: string;
  language: string;
  metaDescription: string;
  name: string;
  title: string;
}
export interface Category {
  id: number;
  code: string;
  depth: number;
  description: CategoryDescription;
  featured: boolean;
  lineage?: string;
  parent?: Category;
  sortOrder: number;
  productCount: number;
  store: string;
  visible: boolean;
  children: Category[];
}
