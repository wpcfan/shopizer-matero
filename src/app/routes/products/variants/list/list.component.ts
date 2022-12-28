import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { ProductOption, ProductOptionValue, ProductVariant } from '@models';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@shared';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { distinctUntilChanged, map, tap } from 'rxjs';
import * as ProductVariantActions from '../../+state/actions/product-variant.actions';
import * as fromProductVariants from '../../+state/selectors/product-variant.selectors';

@Component({
  selector: 'app-products-variants-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsVariantsListComponent extends BaseCrudTable<ProductVariant> {
  state$ = this.store.select(fromProductVariants.selectProductVariantState);
  storeParam$ = this.route.queryParamMap.pipe(
    map(params => params.get('store') ?? localStorage.getItem('store') ?? environment.defaultStore),
    distinctUntilChanged(),
    tap(_ => this.store.dispatch(ProductVariantActions.loadProductVariants({ page: 0 })))
  );
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (e: Partial<ProductVariant>) => e.id,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'code',
      header: 'Code',
      cell: (e: Partial<ProductVariant>) => e.code,
      type: 'string',
      filterable: false,
    },
    {
      name: 'date',
      header: 'Date',
      cell: (e: Partial<ProductVariant>) => e.date,
      type: 'string',
      sortable: false,
    },
    {
      name: 'order',
      header: 'Order',
      cell: (e: Partial<ProductVariant>) => `${e.sortOrder}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'option',
      header: 'Option',
      cell: (e: Partial<ProductVariant>) => (e.option as ProductOption).name,
      type: 'string',
      sortable: false,
    },
    {
      name: 'optionValue',
      header: 'Option value',
      cell: (e: Partial<ProductVariant>) => (e.optionValue as ProductOptionValue).name,
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
  public handleDelete(row: ProductVariant): void {}
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {}
  public handleItem(row: ProductVariant): void {
    this.handleEdit(row);
  }
  public handleEdit(row: ProductVariant): void {
    this.router.navigate(['/products', 'variants', 'update', row.id], {
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
