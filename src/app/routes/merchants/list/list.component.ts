import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Merchant } from '@models';
import { Store } from '@ngrx/store';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { SelectFilter, TextFilter } from '@shared/components/dyna-table/table-filter';
import { Observable } from 'rxjs';
import * as MerchantActions from '../+state/actions/merchant.actions';
import { State } from '../+state/reducers/merchant.reducer';
import * as fromMerchant from '../+state/selectors/merchant.selectors';
@Component({
  selector: 'app-merchants-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantsListComponent extends BaseCrudTable<Merchant> {
  state$: Observable<State> = this.store.select(fromMerchant.selectMerchantState);
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
    this.store.dispatch(MerchantActions.loadMerchants({ page: ev.pageIndex }));
  }
  public handleSortChange(ev: Record<string, Sort>): void {}
  public handleDelete(row: Merchant): void {}
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
      this.store.dispatch(MerchantActions.loadMerchants({ page: 0, params }));
    } else {
      this.store.dispatch(MerchantActions.loadMerchants({ page: 0 }));
    }
  }
  public handleItem(row: Merchant): void {
    this.handleEdit(row);
  }
  public handleEdit(row: Merchant): void {
    this.router.navigate(['merchants', 'update', row.code]);
  }
  public handleAdd(): void {}
  constructor(private store: Store, private router: Router) {
    super();
    this.store.dispatch(MerchantActions.loadMerchants({ page: 0 }));
  }
}
