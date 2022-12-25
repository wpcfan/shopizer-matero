import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { Product } from '@models';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@shared';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { distinctUntilChanged, map, tap } from 'rxjs';
import * as ProductActions from '../+state/actions/product.actions';
import * as fromProducts from '../+state/selectors/product.selectors';

@Component({
  selector: 'app-products-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent extends BaseCrudTable<Product> {
  state$ = this.store.select(fromProducts.selectProductState);
  storeParam$ = this.route.queryParamMap.pipe(
    map(params => params.get('store') ?? localStorage.getItem('store') ?? environment.defaultStore),
    distinctUntilChanged(),
    tap(_ => this.store.dispatch(ProductActions.loadProducts({ page: 0 })))
  );
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (e: Partial<Product>) => e.id,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'name',
      header: 'Name',
      cell: (e: Partial<Product>) => e.description?.name,
      type: 'string',
      filterable: false,
    },
    {
      name: 'sku',
      header: 'Sku',
      cell: (e: Partial<Product>) => e.sku,
      type: 'string',
      sortable: false,
    },
    {
      name: 'order',
      header: 'Order',
      cell: (e: Partial<Product>) => `${e.sortOrder}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'type',
      header: 'Type',
      cell: (e: Partial<Product>) => e.type?.code,
      type: 'string',
      sortable: false,
    },
    {
      name: 'available',
      header: 'Available',
      cell: (e: Partial<Product>) => (e.available ? 'Yes' : 'No'),
      type: 'string',
      sortable: false,
    },
  ];
  public handlePageChange(ev: PageEvent): void {
    this.router.navigate([], {
      queryParams: { page: ev.pageIndex },
      queryParamsHandling: 'merge',
    });
  }
  public handleSortChange(ev: Record<string, Sort>): void {}
  public handleDelete(row: Product): void {}
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {
    const params = this.filterParams(appliedFilters);

    if (Object.keys(params).length > 0) {
      this.store.dispatch(ProductActions.loadProducts({ page: 0, params }));
    } else {
      this.store.dispatch(ProductActions.loadProducts({ page: 0 }));
    }
  }
  public handleItem(row: Product): void {
    this.handleEdit(row);
  }
  public handleEdit(row: Product): void {
    this.router.navigate(['/products', 'update', row.id], {
      queryParams: { lang: this.local.get('settings').language },
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
