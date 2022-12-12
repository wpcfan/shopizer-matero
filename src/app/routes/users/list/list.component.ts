import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Menu, Profile, SelectOption } from '@models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
import { SelectFilter, TextFilter } from '@shared/components/dyna-table/table-filter';
import * as UserActions from '../+state/actions/user.actions';
import { State } from '../+state/reducers/user.reducer';
import * as fromUser from '../+state/selectors/user.selectors';

@Component({
  selector: 'app-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent extends BaseCrudTable<Profile> {
  state$: Observable<State> = this.store.select(fromUser.selectUserState);
  store$: Observable<SelectOption[]> = this.store.select(fromProfile.selectStoreOptions);

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
      name: 'emailAddress',
      header: 'Email',
      cell: (e: Profile) => e.emailAddress,
      type: 'string',
      filterable: true,
    },
    {
      name: 'store',
      header: 'Store',
      cell: (e: Profile) => e.merchant,
      type: 'select',
      filterable: true,
      filterOptions: this.store$,
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
    this.store.dispatch(UserActions.loadUsers({ page: ev.pageIndex }));
  }
  public handleSortChange(ev: Record<string, Sort>): void {}
  public handleDelete(row: Profile): void {}
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {
    console.log(appliedFilters);
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

    if (Object.keys(params).length > 0) {
      this.store.dispatch(UserActions.loadUsers({ page: 0, params }));
    } else {
      this.store.dispatch(UserActions.loadUsers({ page: 0 }));
    }
  }
  public handleItem(row: Profile): void {
    this.handleEdit(row);
  }
  public handleEdit(row: Profile): void {
    this.router.navigate(['users', row.id]);
  }
  public handleAdd(): void {}
  menus$: Observable<Menu[]>;
  constructor(private store: Store, private router: Router) {
    super();
    this.menus$ = this.store.select(fromMenu.selectMenus);
    this.store.dispatch(UserActions.loadUsers({ page: 0 }));
  }
}
