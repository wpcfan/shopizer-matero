import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { ProductType } from '@models';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@shared';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { distinctUntilChanged, map, tap } from 'rxjs';
import * as ProductTypeActions from '../+state/actions/product-type.actions';
import * as fromProductTypes from '../+state/selectors/product-type.selectors';

@Component({
  selector: 'app-product-types-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ProductTypesListComponent extends BaseCrudTable<ProductType> {
  state$ = this.store.select(fromProductTypes.selectProductTypeState);
  storeParam$ = this.route.queryParamMap.pipe(
    map(params => params.get('store') ?? localStorage.getItem('store') ?? environment.defaultStore),
    distinctUntilChanged(),
    tap(_ => this.store.dispatch(ProductTypeActions.loadProductTypes({ page: 0 })))
  );
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (e: Partial<ProductType>) => e.id,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'name',
      header: 'Name',
      cell: (e: Partial<ProductType>) => e.description?.name,
      type: 'string',
      filterable: true,
    },
    {
      name: 'code',
      header: 'Code',
      cell: (e: Partial<ProductType>) => e.code,
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
  public handleDelete(row: ProductType): void {
    throw new Error('Method not implemented.');
  }
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {
    const params = this.filterParams(appliedFilters);

    if (Object.keys(params).length > 0) {
      this.store.dispatch(ProductTypeActions.loadProductTypes({ page: 0, params }));
    } else {
      this.store.dispatch(ProductTypeActions.loadProductTypes({ page: 0 }));
    }
  }
  public handleItem(row: ProductType): void {
    this.handleEdit(row);
  }
  public handleEdit(row: ProductType): void {
    this.router.navigate(['/brands', 'update', row.id], {
      queryParams: { lang: this.local.get('setting').language },
    });
  }
  public handleAdd(): void {}

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private local: LocalStorageService
  ) {
    super();
  }
}
