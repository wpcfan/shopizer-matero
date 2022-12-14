import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import * as AuthActions from '@core/+state/actions';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Store } from '@ngrx/store';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { filter, map, take, tap } from 'rxjs';
import * as MerchantActions from '../+state/actions/merchant.actions';
import * as fromMerchant from '../+state/selectors/merchant.selectors';
@Component({
  selector: 'app-merchants-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantsUpdateComponent {
  form: FormGroup;
  groups$ = this.store.select(fromProfile.selectGroups);
  languages$ = this.store.select(fromProfile.selectLanguages);
  countries$ = this.store.select(fromProfile.selectCountries);
  currencies$ = this.store.select(fromMerchant.selectCurrencies);
  dimensions$ = this.store.select(fromMerchant.selectDimensions);
  weights$ = this.store.select(fromMerchant.selectWeights);
  retailerStores$ = this.store.select(fromMerchant.selectRetailers);
  selectedStore$ = this.store.select(fromMerchant.selectSelectedMerchant).pipe(
    tap(store => {
      if (store) {
        this.form.patchValue(store);
      }
    })
  );
  code$ = this.route.paramMap.pipe(
    filter(params => params.has('code')),
    map(params => params.get('code') as string),
    tap(code => this.store.dispatch(MerchantActions.getByCode({ code })))
  );
  stateProvinces$ = this.store.select(fromProfile.selectZones);
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog
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
    this.form
      .get('address')
      ?.get('country')
      ?.valueChanges.pipe(filter(country => !!country))
      .subscribe(country => {
        this.store.dispatch(AuthActions.loadZones({ countryCode: country }));
      });
  }

  update(ev: Event, code: string) {
    ev.preventDefault();
    ev.stopPropagation();
    if (!this.form.valid) {
      return;
    }
    this.store.dispatch(MerchantActions.updateMerchant({ code, data: this.form.value }));
  }

  get disableDelete() {
    return localStorage.getItem('store') === this.form.get('code')?.value;
  }

  delete(code: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Store',
        message: 'Are you sure you want to delete this store?',
        type: 'warning',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(result => {
        if (result) {
          this.store.dispatch(MerchantActions.deleteMerchant({ code }));
        }
      });
  }
}
