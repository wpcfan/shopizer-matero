import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ProductVariantActions from '../../+state/actions/product-variant.actions';
import { ProductVariantService } from '../../+state/services/product-variant.service';

@Component({
  selector: 'app-products-variants-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsVariantsCreateComponent implements OnInit {
  options$ = this.service.options();
  optionValues$ = this.service.optionValues();

  form!: FormGroup;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ProductVariantService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      defaultValue: [false],
      sortOrder: [0, [Validators.required]],
      date: [null],
      code: ['', [Validators.required]],
      option: [null, [Validators.required]],
      optionValue: [null, [Validators.required]],
    });
  }

  create() {
    this.store.dispatch(
      ProductVariantActions.createProductVariant({
        data: this.form.value,
      })
    );
  }
}
