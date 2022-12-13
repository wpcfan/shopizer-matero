import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromMenu from '@core/+state/selectors/menu.selectors';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Store } from '@ngrx/store';
import * as StoreActions from '../+state/actions/store.actions';
import * as fromStore from '../+state/selectors/store.selectors';
@Component({
  selector: 'app-stores-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class StoresCreateComponent {
  form: FormGroup;
  menus$ = this.store.select(fromMenu.selectMenus);
  groups$ = this.store.select(fromProfile.selectGroups);
  languages$ = this.store.select(fromProfile.selectLanguages);
  currencies$ = this.store.select(fromStore.selectCurrencies);
  dimensions$ = this.store.select(fromStore.selectDimensions);
  weights$ = this.store.select(fromStore.selectWeights);
  retailerStores$ = this.store.select(fromStore.selectRetailers);
  constructor(private store: Store, private fb: FormBuilder) {
    this.form = this.fb.nonNullable.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        stateProvince: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        country: ['', [Validators.required]],
      }),
      supportedLanguages: [[], [Validators.required]],
      defaultLanguage: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      currencyFormatNational: [false],
      dimension: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      inBusinessSince: ['', [Validators.required]],
      useCache: [false],
      retailer: [false],
      retailerStore: [''],
    });
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(StoreActions.createStore({ data: this.form.value }));
  }
}
