import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Language } from '@models';
import { Store } from '@ngrx/store';
import { FilteredOption } from '@shared/components/autocomplete-select/autocomplete-select.component';
import { SimpleTreeNode } from '@shared/components/simple-tree/model';
import { map, Observable } from 'rxjs';
import * as ProductActions from '../+state/actions/product.actions';
import { ProductService } from '../+state/services/product.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCreateComponent implements OnInit {
  manufacturers$!: Observable<FilteredOption[]>;
  categories$!: Observable<SimpleTreeNode[]>;
  productTypes$!: Observable<FilteredOption[]>;
  languages$!: Observable<Language[]>;
  form!: FormGroup;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ProductService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      identifier: ['', [Validators.required]],
      sortOrder: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
      categories: [[], Validators.required],
      dateAvailable: ['', Validators.required],
      manufacturer: ['', [Validators.required]],
      type: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
      quantity: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
      shipeable: [true],
      canBePurchased: [true],
      visible: [true],
      virtual: [false],
      productSpecifications: this.fb.group({
        height: [0, [Validators.min(0), Validators.max(100000)]],
        length: [0, [Validators.min(0), Validators.max(100000)]],
        width: [0, [Validators.min(0), Validators.max(100000)]],
        weight: [0, [Validators.min(0), Validators.max(100000)]],
      }),
      descriptions: [[]],
    });
    this.languages$ = this.store.select(fromProfile.selectStoreLanguages);
    this.categories$ = this.service.categories();
    this.manufacturers$ = this.service
      .manufacturers()
      .pipe(map(items => items.map(it => ({ label: it.code, value: it }))));
    this.productTypes$ = this.service
      .productTypes()
      .pipe(map(items => items.map(it => ({ label: it.code, value: it }))));
  }

  get productSpecifications() {
    return this.form.get('productSpecifications') as FormGroup;
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(
      ProductActions.createProduct({
        data: {
          ...this.form.value,
          manufacturer: this.form.controls.manufacturer.value.code,
          type: this.form.controls.type.value.code,
        },
      })
    );
  }
}
