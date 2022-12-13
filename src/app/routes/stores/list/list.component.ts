import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import { Menu, Merchant } from '@models';
import { Store } from '@ngrx/store';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { SelectFilter, TextFilter } from '@shared/components/dyna-table/table-filter';
import { Observable } from 'rxjs';
import * as StoreActions from '../+state/actions/store.actions';
import { State } from '../+state/reducers/store.reducer';
import * as fromStore from '../+state/selectors/store.selectors';
@Component({
  selector: 'app-stores-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoresListComponent extends BaseCrudTable<Merchant> {
  state$: Observable<State> = this.store.select(fromStore.selectStoreState);
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (e: Partial<Merchant>) => e.id,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'name',
      header: 'Name',
      cell: (e: Merchant) => e.name,
      type: 'string',
      filterable: true,
    },
    {
      name: 'email',
      header: 'Email',
      cell: (e: Merchant) => e.email,
      type: 'string',
      filterable: false,
    },
    {
      name: 'code',
      header: 'Code',
      cell: (e: Merchant) => e.code,
      type: 'string',
      filterable: false,
    },
    {
      name: 'retailer',
      header: 'Retailer',
      cell: (e: Merchant) => (e.retailer ? 'Yes' : 'No'),
      type: 'string',
      filterable: false,
    },
  ];
  public handlePageChange(ev: PageEvent): void {
    this.store.dispatch(StoreActions.loadStores({ page: ev.pageIndex }));
  }
  public handleSortChange(ev: Record<string, Sort>): void {}
  public handleDelete(row: Merchant): void {}
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {
    console.log(appliedFilters);
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
      this.store.dispatch(StoreActions.loadStores({ page: 0, params }));
    } else {
      this.store.dispatch(StoreActions.loadStores({ page: 0 }));
    }
  }
  public handleItem(row: Merchant): void {
    this.handleEdit(row);
  }
  public handleEdit(row: Merchant): void {
    this.router.navigate(['users', row.id]);
  }
  public handleAdd(): void {}
  menus$: Observable<Menu[]>;
  constructor(private store: Store, private router: Router) {
    super();
    this.menus$ = this.store.select(fromMenu.selectMenus);
    this.store.dispatch(StoreActions.loadStores({ page: 0 }));
  }
}
