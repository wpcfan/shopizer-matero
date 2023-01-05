import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Zone } from '@models';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable, switchMap, take } from 'rxjs';
import { CustomerService } from '../+state/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerCreateComponent {
  form: FormGroup;
  languages$ = this.store.select(fromProfile.selectStoreLanguages);
  countries$ = this.service.countries();
  billingStateProvinces$!: Observable<Zone[]>;
  deliveryStateProvinces$!: Observable<Zone[]>;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private service: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.nonNullable.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      language: ['', [Validators.required]],
      gender: ['M', [Validators.required]],
      billing: this.fb.nonNullable.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        company: [''],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zone: [''],
        phone: ['', [Validators.required]],
      }),
      delivery: this.fb.nonNullable.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        country: ['', [Validators.required]],
        zone: [''],
        phone: ['', [Validators.required]],
      }),
    });

    this.billingStateProvinces$ = this.billing.get('country')!.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap(countryCode => this.service.zones(countryCode))
    );

    this.deliveryStateProvinces$ = this.delivery.get('country')!.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap(countryCode => this.service.zones(countryCode))
    );
  }

  get billing() {
    return this.form.get('billing') as FormGroup;
  }

  get delivery() {
    return this.form.get('delivery') as FormGroup;
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.service
      .create({
        ...this.form.value,
        billing: {
          ...this.form.value.billing,
          billingAddress: true,
          stateProvince: this.form.value.billing.zone,
        },
        delivery: {
          ...this.form.value.delivery,
          billingAddress: false,
          stateProvince: this.form.value.delivery.zone,
        },
        userName: this.form.value.emailAddress,
        storeCode: localStorage.getItem('store'),
      })
      .pipe(take(1))
      .subscribe(customer =>
        this.router.navigate(['../', 'update', customer.id], {
          relativeTo: this.route,
          queryParamsHandling: 'preserve',
        })
      );
  }
}
