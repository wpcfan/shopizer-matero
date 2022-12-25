import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs';
import * as ProductAttributeActions from '../../+state/actions/product-attribute.actions';
import { ProductAttributeService } from '../../+state/services/product-attribute.service';
@Component({
  selector: 'app-product-attributes-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAttributeCreateComponent implements OnInit {
  options$ = this.service.options();
  optionValues$ = this.service.optionValues();
  productId$ = this.route.parent?.parent?.paramMap.pipe(
    tap(console.log),
    filter(params => params.has('id')),
    map(params => parseInt(params.get('id') as string))
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
  }

  create(productId: number) {
    this.store.dispatch(
      ProductAttributeActions.createProductAttribute({
        productId,
        data: this.form.value,
      })
    );
  }
}
