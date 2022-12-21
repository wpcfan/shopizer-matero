import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { ProductOptionValue } from '@models';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@shared';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { distinctUntilChanged, map, tap } from 'rxjs';
import * as ProductOptionValueActions from '../../+state/actions/product-option-value.actions';
import * as fromProductOptionValue from '../../+state/selectors/product-option-value.selectors';

@Component({
  selector: 'app-product-options-values-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductOptionsValuesListComponent extends BaseCrudTable<ProductOptionValue> {
  state$ = this.store.select(fromProductOptionValue.selectProductOptionValueState);
  storeParam$ = this.route.queryParamMap.pipe(
    map(params => params.get('store') ?? localStorage.getItem('store') ?? environment.defaultStore),
    distinctUntilChanged(),
    tap(_ => this.store.dispatch(ProductOptionValueActions.loadProductOptionValues({ page: 0 })))
  );
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (e: Partial<ProductOptionValue>) => e.id,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'name',
      header: 'Name',
      cell: (e: Partial<ProductOptionValue>) =>
        e.descriptions?.find(it => it.language === this.local.get('settings').language)?.name,
      type: 'string',
      filterable: false,
    },
    {
      name: 'code',
      header: 'Code',
      cell: (e: Partial<ProductOptionValue>) => e.code,
      type: 'string',
      sortable: false,
    },
    {
      name: 'order',
      header: 'Order',
      cell: (e: Partial<ProductOptionValue>) => `${e.order}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'sortOrder',
      header: 'Sort Order',
      cell: (e: Partial<ProductOptionValue>) => `${e.sortOrder}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'defaultValue',
      header: 'Default?',
      cell: (e: Partial<ProductOptionValue>) => (e.defaultValue ? 'Yes' : 'No'),
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
  public handleDelete(row: ProductOptionValue): void {
    throw new Error('Method not implemented.');
  }
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {
    const params = this.filterParams(appliedFilters);

    if (Object.keys(params).length > 0) {
      this.store.dispatch(ProductOptionValueActions.loadProductOptionValues({ page: 0, params }));
    } else {
      this.store.dispatch(ProductOptionValueActions.loadProductOptionValues({ page: 0 }));
    }
  }
  public handleItem(row: ProductOptionValue): void {
    this.handleEdit(row);
  }
  public handleEdit(row: ProductOptionValue): void {
    this.router.navigate(['/product-options', 'values', 'update', row.id], {
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
