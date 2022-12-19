import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as AuthActions from '@core/+state/actions';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-store-select',
  templateUrl: './store-select.component.html',
  styleUrls: ['./store-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreSelectComponent {
  stores$ = this.store.select(fromProfile.selectStoreOptions);
  selectedStore?: string;
  storeParam$ = this.route.queryParamMap.pipe(
    map(params => params.get('store') ?? localStorage.getItem('store') ?? environment.defaultStore),
    tap(store => {
      this.selectedStore = store;
    })
  );
  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.store.dispatch(AuthActions.loadStores());
  }

  public handleStoreChange(ev: MatSelectChange): void {
    if (ev.value) {
      localStorage.setItem('store', ev.value);
      const queryParams: Params = { store: ev.value };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
    }
  }
}
