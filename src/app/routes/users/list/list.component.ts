import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Profile } from '@models';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, Observable, tap } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { BaseCrudTable, ColumnConfig, ColumnFilter } from '@shared/components/dyna-table';
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
  storeParam$ = this.route.queryParamMap.pipe(
    map(params => params.get('store') ?? localStorage.getItem('store') ?? environment.defaultStore),
    distinctUntilChanged(),
    tap(_ => this.store.dispatch(UserActions.loadUsers({ page: 0 })))
  );
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
    this.store.dispatch(UserActions.loadUsers({ page: ev.pageIndex }));
  }
  public handleSortChange(ev: Record<string, Sort>): void {}
  public handleDelete(row: Profile): void {}
  public handleFilter(appliedFilters: Record<string, ColumnFilter>): void {
    const params = this.filterParams(appliedFilters);

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
  constructor(private store: Store, private router: Router, private route: ActivatedRoute) {
    super();
  }
}
