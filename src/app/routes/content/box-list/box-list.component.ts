import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentBox } from '@models/content';
import { LocalStorageService } from '@shared';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { distinctUntilChanged, filter, map, switchMap, take } from 'rxjs';
import { ContentBoxService } from '../+state/services/content-box.service';

@Component({
  selector: 'app-content-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBoxListComponent extends BaseCrudTable<ContentBox> {
  page$ = this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')) ?? 0),
    distinctUntilChanged()
  );
  list$ = this.route.queryParams.pipe(switchMap(params => this.service.list(params)));
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'Id',
      cell: (e: Partial<ContentBox>) => e.id,
      type: 'string',
      sortable: false,
    },
    {
      name: 'code',
      header: 'Code',
      cell: (e: Partial<ContentBox>) => e.code,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'visible',
      header: 'Visible',
      cell: (e: Partial<ContentBox>) => (e.visible ? 'Yes' : 'No'),
      type: 'string',
      sortable: false,
    },
    {
      name: 'contentType',
      header: 'Content Type',
      cell: (e: Partial<ContentBox>) => `${e.contentType}`,
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
  public handleDelete(row: ContentBox): void {
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
  public handleItem(row: ContentBox): void {
    this.handleEdit(row);
  }
  public handleEdit(row: ContentBox): void {
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
    private service: ContentBoxService,
    public dialog: MatDialog
  ) {
    super();
  }
}
