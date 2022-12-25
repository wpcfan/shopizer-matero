import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { ProductOption } from '@models';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@shared';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { distinctUntilChanged, map, tap } from 'rxjs';
import * as ProductOptionsActions from '../../+state/actions/product-option.actions';
import * as fromProductOptions from '../../+state/selectors/product-option.selectors';

@Component({
  selector: 'app-product-options-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductOptionsListComponent extends BaseCrudTable<ProductOption> {
  state$ = this.store.select(fromProductOptions.selectProductOptionState);
  storeParam$ = this.route.queryParamMap.pipe(
    map(params => params.get('store') ?? localStorage.getItem('store') ?? environment.defaultStore),
    distinctUntilChanged(),
    tap(_ => this.store.dispatch(ProductOptionsActions.loadProductOptions({ page: 0 })))
  );
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (e: Partial<ProductOption>) => e.id,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'name',
      header: 'Name',
      cell: (e: Partial<ProductOption>) =>
        e.descriptions?.find(it => it.language === this.local.get('settings').language)?.name,
      type: 'string',
      filterable: false,
    },
    {
      name: 'code',
      header: 'Code',
      cell: (e: Partial<ProductOption>) => e.code,
      type: 'string',
      sortable: false,
    },
    {
      name: 'order',
      header: 'Order',
      cell: (e: Partial<ProductOption>) => `${e.order}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'type',
      header: 'Type',
      cell: (e: Partial<ProductOption>) => e.type,
      type: 'string',
      sortable: false,
    },
    {
      name: 'readonly',
      header: 'Readonly',
      cell: (e: Partial<ProductOption>) => (e.readonly ? 'Yes' : 'No'),
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
  public handleDelete(row: ProductOption): void {}
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {
    const params = this.filterParams(appliedFilters);

    if (Object.keys(params).length > 0) {
      this.store.dispatch(ProductOptionsActions.loadProductOptions({ page: 0, params }));
    } else {
      this.store.dispatch(ProductOptionsActions.loadProductOptions({ page: 0 }));
    }
  }
  public handleItem(row: ProductOption): void {
    this.handleEdit(row);
  }
  public handleEdit(row: ProductOption): void {
    this.router.navigate(['/product-options', 'options', 'update', row.id], {
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
