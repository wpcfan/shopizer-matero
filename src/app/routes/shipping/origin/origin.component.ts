import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Zone } from '@models';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@shared';
import { distinctUntilChanged, filter, Observable, Subscription, switchMap, take, tap } from 'rxjs';
import { ShippingService } from '../+state/services/shipping.service';
@Component({
  selector: 'app-shipping-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShippingOriginComponent implements OnInit {
  countries$ = this.service.shippingCountries();
  stateProvinces$!: Observable<Zone[]>;
  selected$ = this.service.getOrigin().pipe(
    tap(res => {
      if (res.kind === 'N' && res.value) {
        this.form.patchValue({ ...res.value });
      }
    })
  );
  form!: FormGroup;
  sub = new Subscription();
  constructor(
    private service: ShippingService,
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private local: LocalStorageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      stateProvince: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });

    this.stateProvinces$ = this.form.get('country')!.valueChanges.pipe(
      filter(country => !!country.code),
      distinctUntilChanged(),
      switchMap(country => this.service.zones(country.code))
    );
  }

  compareCode(c1: any, c2: any) {
    return c1 && c2 && c1.code === c2.code;
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.service
      .updateOrigin(this.form.value)
      .pipe(take(1))
      .subscribe(_ =>
        this.router.navigate(['/shipping', 'origin'], {
          queryParams: { lang: this.local.get('settings').language },
          queryParamsHandling: 'merge',
        })
      );
  }
}
