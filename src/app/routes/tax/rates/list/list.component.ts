import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxRate } from '@models';
import { LocalStorageService } from '@shared';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { distinctUntilChanged, map, switchMap } from 'rxjs';
import { RateService } from '../../+state/services/rate.service';

@Component({
  selector: 'app-tax-rates-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxRatesListComponent extends BaseCrudTable<TaxRate> {
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'Id',
      cell: (e: Partial<TaxRate>) => e.id,
      type: 'string',
      sortable: false,
    },
    {
      name: 'code',
      header: 'Code',
      cell: (e: Partial<TaxRate>) => e.code,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },

    {
      name: 'rate',
      header: 'Rate',
      cell: (e: Partial<TaxRate>) => `${e.rate}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'taxClass',
      header: 'Tax class',
      cell: (e: Partial<TaxRate>) => `${e.taxClass}`,
      type: 'string',
      sortable: false,
    },
  ];
  showAdd = true;
  public handlePageChange(ev: PageEvent): void {
    this.router.navigate(['/tax', 'classes', 'list'], {
      queryParams: { page: ev.pageIndex, lang: this.local.get('lang') },
    });
  }
  public handleSortChange(ev: Record<string, Sort>): void {}
  public handleDelete(row: TaxRate): void {}
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {}
  public handleItem(row: TaxRate): void {
    this.handleEdit(row);
  }
  public handleEdit(row: TaxRate): void {
    this.router.navigate(['/tax', 'rates', 'update', row.id]);
  }
  public handleAdd(): void {
    this.router.navigate(['/tax', 'rates', 'create']);
  }
  page$ = this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')) ?? 0),
    distinctUntilChanged()
  );
  list$ = this.route.queryParams.pipe(switchMap(params => this.service.list(params)));

  constructor(
    private service: RateService,
    private router: Router,
    private route: ActivatedRoute,
    private local: LocalStorageService
  ) {
    super();
  }

  pageFunc(total: number, size: number) {
    return Math.floor(total / size);
  }
}
