import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductAttribute } from '@models';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@shared';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { combineLatest, filter, map, tap } from 'rxjs';
import * as ProductAttributeActions from '../../+state/actions/product-attribute.actions';
import * as fromProductAttribute from '../../+state/selectors/product-attribute.selectors';

@Component({
  selector: 'app-product-attribute-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAttributeListComponent extends BaseCrudTable<ProductAttribute> {
  state$ = this.store.select(fromProductAttribute.selectProductAttributeState);
  params$ = combineLatest([
    this.route.parent!.parent!.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => parseInt(params.get('id') as string))
    ),
    this.route.queryParamMap.pipe(map(params => parseInt((params.get('page') ?? '0') as string))),
  ]).pipe(
    map(([productId, page]) => ({ productId, page })),
    tap(console.log),
    tap(({ productId, page }) =>
      this.store.dispatch(ProductAttributeActions.loadProductAttributes({ productId, page }))
    )
  );
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (e: Partial<ProductAttribute>) => e.id,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'name',
      header: 'Name',
      cell: (e: Partial<ProductAttribute>) => e.option?.description?.name,
      type: 'string',
      filterable: false,
    },
    {
      name: 'type',
      header: 'type',
      cell: (e: Partial<ProductAttribute>) => e.option?.type,
      type: 'string',
      sortable: false,
    },
    {
      name: 'value',
      header: 'Value',
      cell: (e: Partial<ProductAttribute>) => `${e.optionValue?.description?.name}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'code',
      header: 'Value code',
      cell: (e: Partial<ProductAttribute>) => e.optionValue?.code,
      type: 'string',
      sortable: false,
    },
    {
      name: 'default',
      header: 'Default',
      cell: (e: Partial<ProductAttribute>) => (e.optionValue?.defaultValue ? 'Yes' : 'No'),
      type: 'string',
      sortable: false,
    },
  ];
  public handlePageChange(ev: PageEvent): void {
    this.router.navigate([], { queryParams: { page: ev.pageIndex }, queryParamsHandling: 'merge' });
  }
  public handleSortChange(ev: Record<string, Sort>): void {}
  public handleDelete(row: ProductAttribute): void {}
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {}
  public handleItem(row: ProductAttribute): void {
    this.handleEdit(row);
  }
  public handleEdit(row: ProductAttribute): void {
    this.router.navigate(['update', row.id], {
      relativeTo: this.route.parent,
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
