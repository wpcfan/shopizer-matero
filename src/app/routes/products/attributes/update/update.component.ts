import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { ProductAttribute, ProductOption, ProductOptionValue } from '@models';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';
import * as ProductAttributeActions from '../../+state/actions/product-attribute.actions';
import * as fromProductAttribute from '../../+state/selectors/product-attribute.selectors';
import { ProductAttributeService } from '../../+state/services/product-attribute.service';
@Component({
  selector: 'app-product-attribute-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAttributeUpdateComponent implements OnInit {
  options$ = this.service.options();
  optionValues$ = this.service.optionValues();
  selected$!: Observable<ProductAttribute | undefined>;
  params$ = combineLatest([
    this.route.parent!.parent!.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => parseInt(params.get('id') as string))
    ),
    this.route.paramMap.pipe(
      filter(params => params.has('attributeId')),
      map(params => parseInt(params.get('attributeId') as string))
    ),
    this.route.queryParamMap.pipe(
      map(params => (params.get('lang') ?? environment.defaultLanguage) as string)
    ),
  ]).pipe(
    map(([productId, attributeId, lang]) => ({ productId, attributeId, lang })),
    tap(({ productId, attributeId, lang }) =>
      this.store.dispatch(ProductAttributeActions.getById({ productId, attributeId, lang }))
    )
  );
  form!: FormGroup;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ProductAttributeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      attributeDefault: [false],
      attributeDisplayOnly: [false],
      option: [null, [Validators.required]],
      optionValue: [null, [Validators.required]],
    });
    this.selected$ = this.store.select(fromProductAttribute.selectSelected).pipe(
      tap(selected => {
        if (selected) {
          this.form.patchValue({
            attributeDefault: selected.attributeDefault,
            attributeDisplayOnly: selected.attributeDisplayOnly,
            option: selected.option,
            optionValue: selected.optionValue,
          });
        }
      })
    );
  }

  update({
    productId,
    attributeId,
    lang,
  }: {
    productId: number;
    attributeId: number;
    lang: string;
  }) {
    this.store.dispatch(
      ProductAttributeActions.updateProductAttribute({
        productId,
        attributeId,
        lang,
        data: this.form.value,
      })
    );
  }

  compareOption(a: ProductOption, b: ProductOption) {
    return a && b && a.id === b.id;
  }

  compareOptionValue(a: ProductOptionValue, b: ProductOptionValue) {
    return a && b && a.id === b.id;
  }
}
