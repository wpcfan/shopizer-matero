import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@models';
import { LocalStorageService } from '@shared';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { distinctUntilChanged, filter, map, switchMap, take } from 'rxjs';
import { CustomerService } from '../+state/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent extends BaseCrudTable<Customer> {
  page$ = this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')) ?? 0),
    distinctUntilChanged()
  );
  list$ = this.route.queryParams.pipe(switchMap(params => this.service.list(params)));
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'Id',
      cell: (e: Partial<Customer>) => e.id,
      type: 'string',
      sortable: false,
    },
    {
      name: 'emailAddress',
      header: 'Email',
      cell: (e: Partial<Customer>) => e.emailAddress,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'name',
      header: 'Name',
      cell: (e: Partial<Customer>) => `${e.firstName} ${e.lastName}`,
      type: 'string',
      sortable: false,
    },
    {
      name: 'store',
      header: 'Store',
      cell: (e: Partial<Customer>) => `${e.storeCode}`,
      type: 'string',
      sortable: false,
    },
  ];
  showAdd = true;
  showDelete = true;
  public handlePageChange(ev: PageEvent): void {
    this.router.navigate([], {
      queryParams: { page: ev.pageIndex, lang: this.local.get('lang') },
      queryParamsHandling: 'merge',
    });
  }
  public handleSortChange(ev: Record<string, Sort>): void {}
  public handleDelete(row: Customer): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete User',
        message: 'Are you sure you want to delete this user?',
        type: 'warning',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(result => result),
        switchMap(_ => this.service.delete(row.id))
      )
      .subscribe(_ => {
        this.router.navigate([], {
          queryParams: { page: 0, lang: this.local.get('lang') },
          queryParamsHandling: 'merge',
        });
      });
  }
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {}
  public handleItem(row: Customer): void {
    this.handleEdit(row);
  }
  public handleEdit(row: Customer): void {
    this.router.navigate(['../', 'update', row.id], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }
  public handleAdd(): void {
    this.router.navigate(['../', 'create'], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private local: LocalStorageService,
    private service: CustomerService,
    public dialog: MatDialog
  ) {
    super();
  }
}
