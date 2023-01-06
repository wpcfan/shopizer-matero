import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: ['', [Validators.required]],
      visible: [true],
      allowAddToCart: [true],
      descriptions: [[]],
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

  hanldeCountryChange(lang: string) {
    this.router.navigate([], {
      queryParams: { lang },
    });
  }

  delete(id: string) {
    this.store.dispatch(ProductTypeActions.deleteProductType({ id: parseInt(id) }));
  }
}
