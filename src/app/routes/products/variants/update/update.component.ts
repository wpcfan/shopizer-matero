import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductVariant } from '@models';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';
import * as ProductVariantActions from '../../+state/actions/product-variant.actions';
import * as fromProductVariant from '../../+state/selectors/product-variant.selectors';
import { ProductVariantService } from '../../+state/services/product-variant.service';

@Component({
  selector: 'app-products-variants-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsVariantsUpdateComponent implements OnInit {
  options$ = this.service.options();
  optionValues$ = this.service.optionValues();
  form!: FormGroup;
  idAndLang$ = combineLatest([
    this.route.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => params.get('id') as string)
    ),
    this.route.queryParamMap.pipe(map(params => params.get('lang') as string)),
  ]).pipe(
    map(([id, lang]) => ({ id, lang })),
    tap(console.log),
    tap(({ id, lang }) =>
      this.store.dispatch(ProductVariantActions.getById({ variantId: parseInt(id), lang }))
    )
  );
  selected$!: Observable<ProductVariant | undefined>;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductVariantService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      defaultValue: [false],
      sortOrder: [0, [Validators.required]],
      date: [null],
      code: ['', [Validators.required]],
      option: [null, [Validators.required]],
      optionValue: [null, [Validators.required]],
    });
    this.selected$ = this.store.select(fromProductVariant.selectProductVariantSelected).pipe(
      tap(selected => {
        if (selected) {
          this.form.patchValue({ ...selected });
        }
      })
    );
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(ProductVariantActions.createProductVariant({ data: this.form.value }));
  }

  update(ev: Event, id: string, lang: string) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(
      ProductVariantActions.updateProductVariant({
        variantId: parseInt(id),
        data: this.form.value,
        lang,
      })
    );
  }

  hanldeCountryChange(ev: MatSelectChange) {
    this.router.navigate(['/products', 'update', this.form.value.code], {
      queryParams: { lang: ev.value },
    });
  }

  delete(id: string) {
    this.store.dispatch(ProductVariantActions.deleteProductVariant({ id: parseInt(id) }));
  }

  compareId(a: any, b: any) {
    return a?.id === b?.id;
  }

  compareCode(a: any, b: any) {
    return a?.code === b?.code;
  }
}
