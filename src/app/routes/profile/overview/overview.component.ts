import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Group, Language, Menu, Profile } from '@models';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';

import * as ProfileActions from '@core/+state/actions/profile.actions';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import * as fromProfile from '@core/+state/selectors/profile.selectors';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class ProfileOverviewComponent {
  form!: FormGroup;
  sub = new Subscription();
  groups$: Observable<Group[]>;
  languages$: Observable<Language[]>;
  menus$: Observable<Menu[]>;
  profile$: Observable<Profile | undefined>;
  model!: Profile;
  constructor(private store: Store) {
    this.menus$ = this.store.select(fromMenu.selectMenus);
    this.groups$ = this.store.select(fromProfile.selectGroups);
    this.languages$ = this.store.select(fromProfile.selectLanguages);
    this.profile$ = this.store.select(fromProfile.selectProfile).pipe(
      tap(it => {
        if (it) {
          this.model = Object.assign({}, it);
        }
      })
    );
  }

  update() {
    this.store.dispatch(
      ProfileActions.updateProfile({
        data: this.model,
        id: this.model.id,
        merchant: this.model.merchant,
      })
    );
  }

  compareGroup(a: Group, b: Group) {
    return a.id === b.id;
  }
}
