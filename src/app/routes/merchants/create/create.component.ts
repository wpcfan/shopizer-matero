import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '@core/+state/actions';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import * as MerchantActions from '../+state/actions/merchant.actions';
import * as fromMerchant from '../+state/selectors/merchant.selectors';
@Component({
  selector: 'app-merchants-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantsCreateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  languages$ = this.store.select(fromProfile.selectLanguages);
  countries$ = this.store.select(fromProfile.selectCountries);
  currencies$ = this.store.select(fromMerchant.selectCurrencies);
  dimensions$ = this.store.select(fromMerchant.selectDimensions);
  weights$ = this.store.select(fromMerchant.selectWeights);
  retailerStores$ = this.store.select(fromMerchant.selectRetailers);
  stateProvinces$ = this.store.select(fromProfile.selectZones);
  sub = new Subscription();

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

  ngOnInit(): void {
    this.sub.add(
      this.form
        .get('address')
        ?.get('country')
        ?.valueChanges.pipe(filter(country => !!country))
        .subscribe(country => {
          this.store.dispatch(AuthActions.loadZones({ countryCode: country }));
        })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    const formattedDate = this.form.value.inBusinessSince.format('YYYY-MM-DD');
    this.store.dispatch(
      MerchantActions.createMerchant({
        data: { ...this.form.value, inBusinessSince: formattedDate },
      })
    );
  }
}
