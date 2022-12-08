import { Injectable } from '@angular/core';
import { State } from '@core/+state/reducers/setting.reducer';
import * as fromRoot from '@core/+state/selectors/setting.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private store: Store) {}

  getOptions(): Observable<State> {
    return this.store.select(fromRoot.selectSettingState);
  }
}
