import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxClass } from '@models';
import { LocalStorageService } from '@shared';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { distinctUntilChanged, map, switchMap } from 'rxjs';
import { TaxService } from '../../+state/services/tax.service';

@Component({
  selector: 'app-tax-classes-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxClassesListComponent extends BaseCrudTable<TaxClass> {
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'Id',
      cell: (e: Partial<TaxClass>) => e.id,
      type: 'string',
      sortable: false,
    },
    {
      name: 'code',
      header: 'Code',
      cell: (e: Partial<TaxClass>) => e.code,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },

    {
      name: 'name',
      header: 'Name',
      cell: (e: Partial<TaxClass>) => `${e.name}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'store',
      header: 'Store',
      cell: (e: Partial<TaxClass>) => `${e.store}`,
      type: 'string',
      sortable: false,
    },
  ];
  showAdd = true;
  public handlePageChange(ev: PageEvent): void {
    this.router.navigate([], {
      queryParams: { page: ev.pageIndex, lang: this.local.get('lang') },
    });
  }
  public handleSortChange(ev: Record<string, Sort>): void {}
  public handleDelete(row: TaxClass): void {}
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {}
  public handleItem(row: TaxClass): void {
    this.handleEdit(row);
  }
  public handleEdit(row: TaxClass): void {
    this.router.navigate(['/tax', 'classes', 'update', row.code]);
  }
  public handleAdd(): void {
    this.router.navigate(['/tax', 'classes', 'create']);
  }
  page$ = this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')) ?? 0),
    distinctUntilChanged()
  );
  list$ = this.route.queryParams.pipe(switchMap(params => this.service.list(params)));

  constructor(
    private service: TaxService,
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
