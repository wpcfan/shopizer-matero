import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Group, Profile } from '@models';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import * as ProfileActions from '@core/+state/actions/profile.actions';
import * as fromProfile from '@core/+state/selectors/profile.selectors';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileOverviewComponent {
  groups$ = this.store.select(fromProfile.selectGroups);
  languages$ = this.store.select(fromProfile.selectLanguages);
  profile$ = this.store.select(fromProfile.selectProfile).pipe(
    tap(it => {
      if (it) {
        this.model = Object.assign({}, it);
      }
    })
  );
  model!: Profile;
  constructor(private store: Store) {}

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
