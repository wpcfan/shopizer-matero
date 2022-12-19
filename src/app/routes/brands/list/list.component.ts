import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Manufacturer } from '@models';
import { Store } from '@ngrx/store';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';

import * as BrandActions from '../+state/actions/brand.actions';
import * as fromBrand from '../+state/selectors/brand.selectors';

@Component({
  selector: 'app-brands-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsListComponent extends BaseCrudTable<Manufacturer> {
  state$ = this.store.select(fromBrand.selectBrandState);
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (e: Partial<Manufacturer>) => e.id,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'name',
      header: 'Name',
      cell: (e: Partial<Manufacturer>) => e.description?.name,
      type: 'string',
      filterable: true,
    },
    {
      name: 'code',
      header: 'Code',
      cell: (e: Partial<Manufacturer>) => e.code,
      type: 'string',
      sortable: false,
    },
  ];
  public handlePageChange(ev: PageEvent): void {
    throw new Error('Method not implemented.');
  }
  public handleSortChange(ev: Record<string, Sort>): void {
    throw new Error('Method not implemented.');
  }
  public handleDelete(row: Manufacturer): void {
    throw new Error('Method not implemented.');
  }
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {
    const params = this.filterParams(appliedFilters);

    if (Object.keys(params).length > 0) {
      this.store.dispatch(BrandActions.loadBrands({ page: 0, params }));
    } else {
      this.store.dispatch(BrandActions.loadBrands({ page: 0 }));
    }
  }
  public handleItem(row: Manufacturer): void {
    throw new Error('Method not implemented.');
  }
  public handleEdit(row: Manufacturer): void {
    throw new Error('Method not implemented.');
  }
  public handleAdd(): void {
    this.router.navigate(['brands', 'create']);
  }
  constructor(private store: Store, private router: Router) {
    super();
    this.store.dispatch(BrandActions.loadBrands({ page: 0 }));
  }
}
