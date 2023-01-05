import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Zone } from '@models';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';
import { CustomerService } from '../+state/services/customer.service';
@Component({
  selector: 'app-customer-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerUpdateComponent {
  form: FormGroup;
  languages$ = this.store.select(fromProfile.selectStoreLanguages);
  countries$ = this.service.countries();
  billingStateProvinces$!: Observable<Zone[]>;
  deliveryStateProvinces$!: Observable<Zone[]>;
  selected$ = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    map(params => Number(params.get('id')!)),
    switchMap(id => this.service.get(id)),
    tap(selected => {
      if (selected) {
        this.form.patchValue(selected);
      }
    })
  );

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

  update(ev: Event, id: number) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }

    this.service.update(id, this.form.value).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
