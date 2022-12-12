import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Group, Language, Menu, Merchant, Profile } from '@models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UserActions from '../+state/actions/user.actions';

@Component({
  selector: 'app-users-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCreateComponent {
  menus$: Observable<Menu[]>;
  groups$: Observable<Group[]>;
  languages$: Observable<Language[]>;
  stores$: Observable<Merchant[]>;
  model: Partial<Profile> = {
    emailAddress: undefined,
    merchant: undefined,
    firstName: undefined,
    lastName: undefined,
    groups: [],
    defaultLanguage: 'en',
    active: true,
  };
  constructor(private store: Store) {
    this.menus$ = this.store.select(fromMenu.selectMenus);
    this.groups$ = this.store.select(fromProfile.selectGroups);
    this.languages$ = this.store.select(fromProfile.selectLanguages);
    this.stores$ = this.store.select(fromProfile.selectStores);
  }

  compareGroup(a: Group, b: Group) {
    return a.id === b.id;
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.store.dispatch(UserActions.createUser({ data: this.model }));
  }
}
