import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as AuthActions from '@core/+state/actions';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Language } from '@models';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, filter, map, Observable, Subscription, take } from 'rxjs';
import { RateService } from '../../+state/services/rate.service';
import { TaxService } from '../../+state/services/tax.service';

@Component({
  selector: 'app-tax-rates-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxRatesCreateComponent implements OnInit {
  languages$!: Observable<Language[]>;
  countries$ = this.service.countries();
  stateProvinces$ = this.store.select(fromProfile.selectZones);
  taxClasses$ = this.taxService.list({ count: 1000, page: 0 }).pipe(map(it => it.data));
  form!: FormGroup;
  sub = new Subscription();
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: RateService,
    private taxService: TaxService,
    private store: Store
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: ['', [Validators.required], [this.codeValidator()]],
      country: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      priority: [0, [Validators.required]],
      taxClass: ['', [Validators.required]],
      descriptions: [[]],
    });
    this.languages$ = this.store.select(fromProfile.selectStoreLanguages);
    this.sub.add(
      this.form
        ?.get('country')
        ?.valueChanges.pipe(
          filter(country => !!country),
          distinctUntilChanged()
        )
        .subscribe(country => {
          this.store.dispatch(AuthActions.loadZones({ countryCode: country }));
        })
    );
  }

  codeValidator() {
    return (control: AbstractControl) => this.service.unique(control.value);
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.service
      .create(this.form.value)
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }));
  }
}
