import { Directive, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ColumnConfig } from './column-config.model';
import { ColumnFilter } from './column-filter.model';
import { DynaTableComponent } from './dyna-table.component';
import { Entity } from './models/entity.model';
import { SelectFilter, TextFilter } from './table-filter';

@Directive()
export abstract class BaseCrudTable<T extends Entity> {
  public abstract columns: ColumnConfig[];
  public selectable = false;
  public sortable = false;
  public showAction = true;
  public permsToAdd: string[] = [];
  public showEdit = true;
  public permsToEdit: string[] = [];
  public showDelete = false;
  public permsToDelete: string[] = [];
  public showAdd = false;
  public showMore = false;
  public showExportExcel = false;
  public multiSortable = false;
  public stickyHeader = true;
  public tableWidth = '90%';
  public tableHeight = '35rem';
  public pageSize = 20;
  public pageIndex = 0;
  public total = 0;

  @ViewChild('table', { read: DynaTableComponent })
  table!: DynaTableComponent;
  sortDict: Record<string, string> = {
    id: 'desc',
  };

  public abstract handlePageChange(ev: PageEvent): void;

  public abstract handleSortChange(ev: Record<string, Sort>): void;

  public abstract handleDelete(row: T): void;

  public abstract handleFilter(appliedFilters: Record<string, ColumnFilter>): void;

  public abstract handleItem(row: T): void;

  public abstract handleEdit(row: T): void;

  public abstract handleAdd(): void;

  public resetFiltersAndSorts() {
    this.table.resetFiltersAndSorts();
  }

  public clearFilters() {
    this.table.clearFilters();
  }

  public clearSorts() {
    this.table.clearSorts();
  }

  protected handleRemoveState(ids: string[]) {}

  filterParams(appliedFilters: Record<string, ColumnFilter>): Record<string, string> {
    const params: Record<string, string> = {};
    for (const key in appliedFilters) {
      const element = appliedFilters[key];
      if (element) {
        if (element instanceof TextFilter) {
          params[key] = (element as TextFilter).value;
        }
        if (element instanceof SelectFilter) {
          params[key] = (element as SelectFilter).value;
        }
      }
    }
    return params;
  }
}
