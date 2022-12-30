import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ShippingPackage } from '@models';
import { LocalStorageService } from '@shared';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { distinctUntilChanged, map, switchMap } from 'rxjs';
import { ShippingService } from '../../+state/services/shipping.service';

@Component({
  selector: 'app-shipping-packaging-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingPackagingListComponent extends BaseCrudTable<ShippingPackage> {
  public columns: ColumnConfig[] = [
    {
      name: 'code',
      header: 'Code',
      cell: (e: Partial<ShippingPackage>) => e.code,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'type',
      header: 'Type',
      cell: (e: Partial<ShippingPackage>) => e.type,
      type: 'string',
      sortable: false,
    },
    {
      name: 'treshold',
      header: 'Threshold',
      cell: (e: Partial<ShippingPackage>) => `${e.treshold}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'shippingHeight',
      header: 'Height',
      cell: (e: Partial<ShippingPackage>) => `${e.shippingHeight}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'shippingWidth',
      header: 'Weight',
      cell: (e: Partial<ShippingPackage>) => `${e.shippingWidth}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'shippingLength',
      header: 'Length',
      cell: (e: Partial<ShippingPackage>) => `${e.shippingLength}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'shippingWeight',
      header: 'Weight',
      cell: (e: Partial<ShippingPackage>) => `${e.shippingWeight}`,
      type: 'string',
      sortable: false,
    },
  ];
  showAdd = true;
  public handlePageChange(ev: PageEvent): void {
    this.router.navigate(['/shipping', 'packaging', 'list'], {
      queryParams: { page: ev.pageIndex, lang: this.local.get('lang') },
    });
  }
  public handleSortChange(ev: Record<string, Sort>): void {}
  public handleDelete(row: ShippingPackage): void {}
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {}
  public handleItem(row: ShippingPackage): void {
    this.handleEdit(row);
  }
  public handleEdit(row: ShippingPackage): void {
    this.router.navigate(['/shipping', 'packaging', 'update', row.code]);
  }
  public handleAdd(): void {
    this.router.navigate(['/shipping', 'packaging', 'create']);
  }
  page$ = this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')) ?? 0),
    distinctUntilChanged()
  );
  list$ = this.route.queryParams.pipe(switchMap(params => this.service.packages(params)));
  constructor(
    private service: ShippingService,
    private router: Router,
    private route: ActivatedRoute,
    private local: LocalStorageService
  ) {
    super();
  }
}
