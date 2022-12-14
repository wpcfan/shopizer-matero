import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';
import * as StoreActions from '../+state/actions/merchant.actions';
import * as fromStore from '../+state/selectors/merchant.selectors';
import { MerchantService } from '../+state/services/merchant.service';

@Component({
  selector: 'app-stores-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantsUpdateComponent {
  form: FormGroup;
  groups$ = this.store.select(fromProfile.selectGroups);
  languages$ = this.store.select(fromProfile.selectLanguages);
  countries$ = this.store.select(fromProfile.selectCountries);
  currencies$ = this.store.select(fromStore.selectCurrencies);
  dimensions$ = this.store.select(fromStore.selectDimensions);
  weights$ = this.store.select(fromStore.selectWeights);
  retailerStores$ = this.store.select(fromStore.selectRetailers);
  selectedStore$ = this.store.select(fromStore.selectSelectedMerchant).pipe(
    tap(store => {
      if (store) {
        this.form.patchValue(store);
      }
    })
  );
  code$ = this.route.paramMap.pipe(
    filter(params => params.has('code')),
    map(params => params.get('code') as string),
    tap(code => {})
  );
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: MerchantService
  ) {
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
    this.service.getBy('DEFAULT').subscribe(store => {
      console.log(store);
    });
  }

  update(ev: Event, code: string) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!this.form.valid) {
      return;
    }
    this.store.dispatch(StoreActions.updateMerchant({ code, data: this.form.value }));
  }
}
