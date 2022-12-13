import { ChangeDetectionStrategy, Component } from '@angular/core';
import { State } from '@core/+state/reducers/setting.reducer';
import * as fromSetting from '@core/+state/selectors/setting.selectors';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import * as SettingActions from '@core/+state/actions/setting.actions';
@Component({
  selector: 'app-profile-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingComponent {
  setting$ = this.store.select(fromSetting.selectSettingState).pipe(
    tap(setting => {
      this.model = Object.assign({}, setting);
    })
  );
  model!: State;
  constructor(private store: Store) {}

  update() {
    this.store.dispatch(SettingActions.updateSettings({ settings: this.model }));
  }
}
