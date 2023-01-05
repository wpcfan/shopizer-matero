import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentPage } from '@models/content';
import { LocalStorageService } from '@shared';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { distinctUntilChanged, filter, map, switchMap, take } from 'rxjs';
import { ContentPageService } from '../+state/services/content-page.service';

@Component({
  selector: 'app-content-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentPageListComponent extends BaseCrudTable<ContentPage> {
  page$ = this.route.queryParamMap.pipe(
    map(params => Number(params.get('page')) ?? 0),
    distinctUntilChanged()
  );
  list$ = this.route.queryParams.pipe(switchMap(params => this.service.list(params)));
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'Id',
      cell: (e: Partial<ContentPage>) => e.id,
      type: 'string',
      sortable: false,
    },
    {
      name: 'code',
      header: 'Code',
      cell: (e: Partial<ContentPage>) => e.code,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'visible',
      header: 'Visible',
      cell: (e: Partial<ContentPage>) => (e.visible ? 'Yes' : 'No'),
      type: 'string',
      sortable: false,
    },
    {
      name: 'linkToMenu',
      header: 'Link to Menu',
      cell: (e: Partial<ContentPage>) => (e.linkToMenu ? 'Yes' : 'No'),
      type: 'string',
      sortable: false,
    },
    {
      name: 'contentType',
      header: 'Content Type',
      cell: (e: Partial<ContentPage>) => `${e.contentType}`,
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
  public handleDelete(row: ContentPage): void {
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
  public handleItem(row: ContentPage): void {
    this.handleEdit(row);
  }
  public handleEdit(row: ContentPage): void {
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
    private service: ContentPageService,
    public dialog: MatDialog
  ) {
    super();
  }
}
