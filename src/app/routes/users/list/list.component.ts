import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Menu, Profile } from '@models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import * as UserActions from '../+state/actions/user.actions';
import * as fromUser from '../+state/selectors/user.selectors';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent extends BaseCrudTable<Profile> {
  data$: Observable<Profile[]> = this.store.select(fromUser.selectUsers);
  public columns: ColumnConfig[] = [
    {
      name: 'id',
      header: 'ID',
      cell: (e: Partial<Profile>) => e.id,
      type: 'string',
      sortable: false,
      sticky: 'start',
    },
    {
      name: 'name',
      header: 'Name',
      cell: (e: Profile) => e.firstName + ' ' + e.lastName,
      type: 'string',
      filterable: false,
    },
    {
      name: 'email',
      header: 'Email',
      cell: (e: Profile) => e.emailAddress,
      type: 'string',
      filterable: false,
    },
    {
      name: 'active',
      header: 'Active',
      cell: (e: Profile) => (e.active ? 'Yes' : 'No'),
      type: 'string',
      filterable: false,
    },
  ];
  public handlePageChange(ev: PageEvent): void {
    throw new Error('Method not implemented.');
  }
  public handleSortChange(ev: Record<string, Sort>): void {
    throw new Error('Method not implemented.');
  }
  public handleDelete(row: Profile): void {
    throw new Error('Method not implemented.');
  }
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {
    throw new Error('Method not implemented.');
  }
  public handleItem(row: Profile): void {
    throw new Error('Method not implemented.');
  }
  public handleEdit(row: Profile): void {
    throw new Error('Method not implemented.');
  }
  public handleAdd(): void {
    throw new Error('Method not implemented.');
  }
  menus$: Observable<Menu[]>;
  constructor(private store: Store) {
    super();
    this.menus$ = this.store.select(fromMenu.selectMenus);
    this.store.dispatch(UserActions.loadUsers());
  }
}
