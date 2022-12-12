import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { of, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ColumnConfig } from './column-config.model';
import { ColumnFilter } from './column-filter.model';
import { ColumnFilterService } from './table-cell/column-filter.service';

import { Entity } from './models/entity.model';
import { SelectFilter } from './table-filter';

export const DEFAULT_PAGE_SIZE = 20;

@Component({
  selector: 'ngx-dyna-table',
  templateUrl: './dyna-table.component.html',
  styleUrls: ['./dyna-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynaTableComponent implements OnInit, OnDestroy {
  @Input() data: Entity[] = [];
  @Input() columns: ColumnConfig[] = [];
  @Input() total = 0;
  @Input() pageIndex = 0;
  @Input() pageSize = DEFAULT_PAGE_SIZE;
  @Input() pageSizeOptions = [20, 50, 100];
  @Input() showPaginator = true;
  @Input() stickyHeader = false;
  @Input() selectable = false;
  @Input() sortable = true;
  @Input() showAction = true;
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Input() showAdd = true;
  @Input() showMore = true;
  @Input() showExportExcel = false;
  @Input() multiSortable = true;
  @Input() expandTpl?: TemplateRef<any>;
  @Input() moreMenuTpl?: TemplateRef<any>;
  @Input() permsToAdd: string[] = [];
  @Input() permsToEdit: string[] = [];
  @Input() permsToDelete: string[] = [];
  @Input() tableHeight = '35rem';
  @Input() tableWidth = '90%';
  @Output() selectChange = new EventEmitter<any[]>();
  @Output() rowClick = new EventEmitter();
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<{ [key: string]: Sort }>();
  @Output() filterChange = new EventEmitter();
  @Output() actionEdit = new EventEmitter();
  @Output() actionDelete = new EventEmitter();
  @Output() actionAdd = new EventEmitter();

  @ViewChildren(MatSort) sorts?: MatSort[];
  @ViewChild(MatPaginator, { read: MatPaginator })
  paginator?: MatPaginator;

  readonly DEFAULT_COLUMN_SELECT = 'ngx-select';
  readonly DEFAULT_COLUMN_ACTION = 'ngx-action';
  displayedColumns: string[] = [];
  selection = new SelectionModel<Entity>(true, []);
  isHighlight = false;
  selectedIndex = -1;

  private appliedFilters: Record<string, ColumnFilter> = {};
  private appliedSorts: Record<string, Sort> = {};

  subs: Subscription[] = [];

  constructor(
    private readonly columnFilterService: ColumnFilterService,
    private readonly dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.validateConfig();
    this.appendDefaultColumnToConfig();
  }

  private validateConfig() {
    if (this.data == null) {
      throw Error('DynaTable must be provided with data stream.');
    }
    if (this.columns == null) {
      throw Error('DynaTable must be provided with column definitions.');
    }
    this.columns.forEach(col => {
      if (col.cell == null && col.cellTpl == null) {
        throw new Error(
          'Invalid DynaTable Column Definition, cell function and cellTpl are null, at least one shall be configured'
        );
      }
      if (col.header == null && col.headerTpl == null) {
        throw new Error(
          'Invalid DynaTable Column Definition, header and headerTpl are null, at least one shall be configured'
        );
      }
      if (col.name === this.DEFAULT_COLUMN_ACTION || col.name === this.DEFAULT_COLUMN_SELECT) {
        throw new Error(`${col.name} has the same name with the reserved name, please change it`);
      }
    });
  }

  private appendDefaultColumnToConfig() {
    this.displayedColumns =
      this.selectable && this.showAction
        ? [this.DEFAULT_COLUMN_SELECT, ...this.columns.map(c => c.name), this.DEFAULT_COLUMN_ACTION]
        : this.selectable
        ? [this.DEFAULT_COLUMN_SELECT, ...this.columns.map(c => c.name)]
        : this.showAction
        ? [...this.columns.map(c => c.name), this.DEFAULT_COLUMN_ACTION]
        : this.columns.map(c => c.name);
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach(row => this.selection.select(row));
    this.selectChange.emit(this.selection.selected);
  }

  canFilter(column: ColumnConfig) {
    const filter = this.columnFilterService.getFilter(column.type);

    return filter != null;
  }

  isFiltered(column: ColumnConfig) {
    return this.appliedFilters[column.name];
  }

  filter(column: ColumnConfig) {
    const filter = this.columnFilterService.getFilter(column.type);

    if (filter) {
      const dialogConfig = new MatDialogConfig();
      const columnFilter = new ColumnFilter();
      columnFilter.column = column;

      if (this.appliedFilters[column.name]) {
        columnFilter.filter = Object.create(this.appliedFilters[column.name]);
        if (columnFilter.filter instanceof SelectFilter) {
          columnFilter.filter.options = column.filterOptions ?? of([]);
        }
      }

      dialogConfig.data = columnFilter;

      const dialogRef = this.dialog.open(filter, dialogConfig);

      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe(result => {
          if (result) {
            this.appliedFilters[column.name] = result;
          } else if (result === '') {
            delete this.appliedFilters[column.name];
          }

          if (result || result === '') {
            this.filterChange.emit(this.appliedFilters);
          }
        });
    }
  }

  resetFiltersAndSorts() {
    this.appliedFilters = {};
    this.appliedSorts = {};
  }

  clearFilters() {
    this.appliedFilters = {};
    this.filterChange.emit(this.appliedFilters);
  }

  clearSorts() {
    this.appliedSorts = {};
    this.sorts?.forEach(sort => {
      sort.direction = '';
      sort._stateChanges.next();
    });
    this.sortChange.emit(this.appliedSorts);
  }

  getFilters() {
    const filters = this.appliedFilters;
    const filterArray = Object.keys(filters).map(key => filters[key]);
    return filterArray;
  }

  emitPage(ev: PageEvent) {
    this.selection.clear();
    this.pageChange.emit(ev);
  }

  toggleHighlight(enable: boolean, index: number) {
    this.isHighlight = enable;
    this.selectedIndex = index;
  }

  handleRowClick(row: any, ev: Event) {
    ev.stopPropagation();
    this.rowClick.emit(this.getOriginalData(row));
  }

  handleSortChange(sort: Sort) {
    if (!this.multiSortable) {
      this.sorts
        ?.filter(s => s.active !== sort.active)
        .forEach(s => {
          s.direction = '';
          s._stateChanges.next();
        });
      this.appliedSorts = {};
    }
    this.appliedSorts[sort.active] = sort;
    this.sortChange.emit(this.appliedSorts);
  }

  handleSelectChange(ev: MatCheckboxChange, row: any) {
    if (!ev) {
      return;
    }
    this.selection.toggle(row);
    this.selectChange.emit(this.selection.selected);
  }

  handleRowActionEdit(row: any, ev: Event) {
    ev.stopPropagation();
    this.actionEdit.emit(this.getOriginalData(row));
  }

  handleRowActionDelete(row: any, ev: Event) {
    ev.stopPropagation();
    this.actionDelete.emit(this.getOriginalData(row));
  }

  handleRowActionAdd(ev: Event) {
    ev.stopPropagation();
    this.actionAdd.emit();
  }

  private getOriginalData(row: Entity) {
    return row.id
      ? this.data.some(d => d.id === row.id)
        ? this.data.filter(d => d.id === row.id)[0]
        : row
      : row;
  }
}
