import { TemplateRef } from '@angular/core';

export interface ColumnConfig {
  name: string;
  type: 'string' | 'date' | 'image' | 'action';
  header?: string;
  cell?: (c: any) => any;
  options?: any;
  sticky?: string;
  sortable?: boolean;
  filterable?: boolean;
  cellTpl?: TemplateRef<any>;
  headerTpl?: TemplateRef<any>;
}
