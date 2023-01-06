import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Manufacturer } from '@models';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';
import * as BrandActions from '../+state/actions/brand.actions';
import * as fromBrand from '../+state/selectors/brand.selectors';
@Component({
  selector: 'app-brands-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsUpdateComponent implements OnInit {
  languages$ = this.store.select(fromProfile.selectStoreLanguages);
  selected$!: Observable<Manufacturer | undefined>;
  idAndLang$ = combineLatest([
    this.route.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => params.get('id') as string),
      tap(console.log)
    ),
    this.route.queryParamMap.pipe(map(params => params.get('lang') as string)),
  ]).pipe(
    map(([id, lang]) => ({ id, lang })),
    tap(console.log),
    tap(({ id, lang }) => this.store.dispatch(BrandActions.getById({ id: parseInt(id), lang })))
  );
  form!: FormGroup;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      order: [0, [Validators.required]],
      descriptions: [[]],
    });
    this.selected$ = this.store.select(fromBrand.selectSelected).pipe(
      tap(brand => {
        if (brand) {
          this.form.patchValue({
            code: brand.code,
            order: brand.order,
            descriptions: [brand.description],
          });
        }
      })
    );
  }

  update(ev: Event, id: string, lang: string) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(
      BrandActions.updateBrand({ id: parseInt(id), data: this.form.value, lang })
    );
  }

  hanldeCountryChange(language: string) {
    this.router.navigate(['/brands', 'update', this.form.value.code], {
      queryParams: { lang: language },
    });
  }

  delete(id: string) {
    this.store.dispatch(BrandActions.deleteBrand({ id: parseInt(id) }));
  }
}
