import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export interface ColumnConfig {
  name: string;
  type: 'string' | 'date' | 'select' | 'image' | 'action';
  header?: string;
  cell?: (c: any) => any;
  options?: any;
  sticky?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: Observable<{ label: string; value: string }[]>;
  cellTpl?: TemplateRef<any>;
  headerTpl?: TemplateRef<any>;
}
