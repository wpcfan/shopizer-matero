import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import * as AuthActions from '@core/+state/actions';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { TaxRate } from '@models';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '@shared';
import {
  distinctUntilChanged,
  filter,
  map,
  Observable,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { RateService } from '../../+state/services/rate.service';
import { TaxService } from '../../+state/services/tax.service';

@Component({
  selector: 'app-tax-rates-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxRatesUpdateComponent implements OnInit {
  languages$ = this.store.select(fromProfile.selectStoreLanguages);
  selected$!: Observable<TaxRate | undefined>;
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
    private store: Store,
    private local: LocalStorageService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: [{ value: '', disabled: false }],
      country: ['', [Validators.required]],
      zone: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      priority: [0, [Validators.required]],
      taxClass: [''],
      descriptions: this.fb.array([
        this.fb.group({
          language: [this.local.get('settings').language, [Validators.required]],
          name: ['', [Validators.required]],
        }),
      ]),
    });

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
    this.selected$ = this.route.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => Number(params.get('id')) ?? 0),
      switchMap(id => this.service.getById(id)),
      tap(selected => {
        if (selected) {
          this.form.patchValue({
            code: selected.code,
            country: selected.country,
            rate: selected.rate,
            zone: selected.zone,
            priority: selected.priority,
            taxClass: selected.taxClass,
            descriptions: [selected.description],
          });
        }
      })
    );
  }

  getIndexedFormGroup(index: number) {
    return (this.form.get('descriptions') as FormArray).controls[index] as FormGroup;
  }

  codeValidator() {
    return (control: AbstractControl) => this.service.unique(control.value);
  }

  update(ev: Event, id: number) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.service
      .update(id, this.form.value)
      .pipe(take(1))
      .subscribe(() => this.router.navigate(['../../'], { relativeTo: this.route }));
  }

  hanldeLanguageChange(ev: MatSelectChange) {
    this.router.navigate([], {
      queryParams: { lang: ev.value },
      queryParamsHandling: 'merge',
    });
  }
}
