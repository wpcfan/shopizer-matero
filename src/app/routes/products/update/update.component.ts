import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Language, Product } from '@models';
import { Store } from '@ngrx/store';
import { FilteredOption } from '@shared/components/autocomplete-select/autocomplete-select.component';
import { SimpleTreeNode } from '@shared/components/simple-tree/model';
import { convertNestedToFlat } from '@shared/utils/tree';
import { filter, map, Observable, tap } from 'rxjs';
import * as ProductActions from '../+state/actions/product.actions';
import * as fromProduct from '../+state/selectors/product.selectors';
import { ProductService } from '../+state/services/product.service';
@Component({
  selector: 'app-products-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsUpdateComponent implements OnInit {
  manufacturers$!: Observable<FilteredOption[]>;
  categories$!: Observable<SimpleTreeNode[]>;
  productTypes$!: Observable<FilteredOption[]>;
  languages$!: Observable<Language[]>;
  form!: FormGroup;
  properties: FormArray = this.fb.array([]);
  id$ = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    map(params => params.get('id') as string),
    tap(id => this.store.dispatch(ProductActions.getById({ id: parseInt(id) })))
  );
  selected$!: Observable<Product | undefined>;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
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
    this.selected$ = this.store.select(fromProduct.selectProductSelected).pipe(
      tap(product => {
        if (product) {
          const categories = convertNestedToFlat(product.categories);
          this.form.patchValue({
            ...product,
            manufacturer: { label: product.manufacturer?.code, value: product.manufacturer },
            type: { label: product.type?.code, value: product.type },
            categories,
          });
        }
      })
    );
    this.categories$ = this.service.categories();
    this.manufacturers$ = this.service
      .manufacturers()
      .pipe(map(items => items.map(it => ({ label: it.code, value: it }))));
    this.productTypes$ = this.service
      .productTypes()
      .pipe(map(items => items.map(it => ({ label: it.code, value: it }))));
  }

  createProperty() {
    this.properties.push(
      this.fb.group({
        attributeDefault: [false],
        attributeDisplayOnly: [false],
        option: ['', Validators.required],
        optionValue: ['', Validators.required],
      })
    );
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
    this.store.dispatch(ProductActions.createProduct({ data: this.form.value }));
  }

  update(ev: Event, id: string) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(ProductActions.updateProduct({ id: parseInt(id), data: this.form.value }));
  }

  delete(id: string) {
    this.store.dispatch(ProductActions.deleteProduct({ id: parseInt(id) }));
  }

  compareId(a: any, b: any) {
    return a?.id === b?.id;
  }

  compareCode(a: any, b: any) {
    return a?.code === b?.code;
  }
}
