import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { ProductType } from '@models';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';
import * as ProductTypeActions from '../+state/actions/product-type.actions';
import * as fromProductTypes from '../+state/selectors/product-type.selectors';

@Component({
  selector: 'app-product-types-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTypesUpdateComponent implements OnInit {
  languages$ = this.store.select(fromProfile.selectStoreLanguages);
  selected$!: Observable<ProductType | undefined>;
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
    tap(({ id, lang }) =>
      this.store.dispatch(ProductTypeActions.getById({ id: parseInt(id), lang }))
    )
  );
  form!: FormGroup;
  descriptions!: FormArray;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.descriptions = this.fb.array([
      this.fb.group({
        language: ['', Validators.required],
        title: [''],
        name: ['', Validators.required],
        friendlyUrl: [''],
        highlights: [''],
        metaDescription: [''],
        description: [''],
        keyWords: [''],
      }),
    ]);
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      visible: [true],
      allowAddToCart: [true],
      descriptions: this.descriptions,
    });
    this.selected$ = this.store.select(fromProductTypes.selectProductTypeSelected).pipe(
      tap(productType => {
        if (productType) {
          this.form.patchValue({
            code: productType.code,
            visible: productType.visible,
            allowAddToCart: productType.allowAddToCart,
            descriptions: [productType.description],
          });
        }
      })
    );
  }

  getIndexedFormGroup(index: number) {
    return this.descriptions.controls[index] as FormGroup;
  }

  update(ev: Event, id: string, lang: string) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(
      ProductTypeActions.updateProductType({ id: parseInt(id), data: this.form.value, lang })
    );
  }

  hanldeCountryChange(ev: MatSelectChange) {
    this.router.navigate(['/brands', 'update', this.form.value.code], {
      queryParams: { lang: ev.value },
    });
  }

  delete(id: string) {
    this.store.dispatch(ProductTypeActions.deleteProductType({ id: parseInt(id) }));
  }
}
