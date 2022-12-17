import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Category } from '@models';
import { Store } from '@ngrx/store';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { SelectFilter, TextFilter } from '@shared/components/dyna-table/table-filter';
import { Observable } from 'rxjs';
import * as CategoryActions from '../+state/actions/category.actions';
import { State } from '../+state/reducers/category.reducer';
import * as fromCategory from '../+state/selectors/category.selectors';
@Component({
  selector: 'app-categories-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent extends BaseCrudTable<Category> {
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (e: Partial<Category>) => e.id,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'store',
      header: 'Store',
      cell: (e: Partial<Category>) => e.store,
      type: 'string',
      sortable: false,
    },
    {
      name: 'name',
      header: 'Name',
      cell: (e: Category) => e.description.name,
      type: 'string',
      filterable: true,
    },
    {
      name: 'code',
      header: 'Code',
      cell: (e: Partial<Category>) => e.code,
      type: 'string',
      sortable: false,
    },
    {
      name: 'parent',
      header: 'Parent',
      cell: (e: Partial<Category>) => e.parent?.code,
      type: 'string',
      sortable: false,
    },
    {
      name: 'visible',
      header: 'Visible',
      cell: (e: Partial<Category>) => (e.visible ? 'Yes' : 'No'),
      type: 'string',
      sortable: false,
    },
  ];
  public handlePageChange(ev: PageEvent): void {
    this.store.dispatch(CategoryActions.loadCategories({ page: ev.pageIndex }));
  }
  public handleSortChange(ev: Record<string, Sort>): void {}
  public handleDelete(row: Category): void {}
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {
    const params: Record<string, string> = {};
    for (const key in appliedFilters) {
      const element = appliedFilters[key];
      if (element) {
        if (element instanceof TextFilter) {
          params[key] = (element as TextFilter).value;
        }
        if (element instanceof SelectFilter) {
          params[key] = (element as SelectFilter).value;
        }
      }
    }

    if (Object.keys(params).length > 0) {
      this.store.dispatch(CategoryActions.loadCategories({ page: 0, params }));
    } else {
      this.store.dispatch(CategoryActions.loadCategories({ page: 0 }));
    }
  }
  public handleItem(row: Category): void {
    this.handleEdit(row);
  }
  public handleEdit(row: Category): void {
    this.router.navigate(['categories', 'update', row.id]);
  }
  public handleAdd(): void {}
  state$: Observable<State> = this.store.select(fromCategory.selectCategoryState);
  constructor(private store: Store, private router: Router) {
    super();
    this.store.dispatch(CategoryActions.loadCategories({ page: 0 }));
  }
}
