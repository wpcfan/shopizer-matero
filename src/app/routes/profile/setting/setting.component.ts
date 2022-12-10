import { ChangeDetectionStrategy, Component } from '@angular/core';
import { State } from '@core/+state/reducers/setting.reducer';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import * as fromSetting from '@core/+state/selectors/setting.selectors';
import { Menu } from '@models';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import * as SettingActions from '@core/+state/actions/setting.actions';
@Component({
  selector: 'app-profile-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingComponent {
  menus$: Observable<Menu[]>;
  setting$: Observable<State>;
  model!: State;
  constructor(private store: Store) {
    this.menus$ = this.store.select(fromMenu.selectMenus);
    this.setting$ = this.store.select(fromSetting.selectSettingState).pipe(
      tap(setting => {
        this.model = Object.assign({}, setting);
      })
    );
  }

  update() {
    this.store.dispatch(SettingActions.updateSettings({ settings: this.model }));
  }
}
