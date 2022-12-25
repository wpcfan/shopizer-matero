import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Language, Product } from '@models';
import { Store } from '@ngrx/store';
import { FilteredOption } from '@shared/components/autocomplete-select/autocomplete-select.component';
import { SimpleTreeNode } from '@shared/components/simple-tree/model';
import { convertNestedToFlat } from '@shared/utils/tree';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';
import * as ProductActions from '../+state/actions/product.actions';
import * as fromProduct from '../+state/selectors/product.selectors';
import { ProductService } from '../+state/services/product.service';
@Component({
  selector: 'app-products-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class ProductsUpdateComponent implements OnInit {
  manufacturers$!: Observable<FilteredOption[]>;
  categories$!: Observable<SimpleTreeNode[]>;
  productTypes$!: Observable<FilteredOption[]>;
  languages$!: Observable<Language[]>;
  form!: FormGroup;
  descriptions!: FormArray;
  properties: FormArray = this.fb.array([]);
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
    tap(({ id, lang }) => this.store.dispatch(ProductActions.getById({ id: parseInt(id), lang })))
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
      descriptions: this.descriptions,
    });
    this.languages$ = this.store.select(fromProfile.selectStoreLanguages);
    this.selected$ = this.store.select(fromProduct.selectProductSelected).pipe(
      tap(product => {
        if (product) {
          const categories = convertNestedToFlat(product.categories);
          if (product.properties && product.properties.length > 0) {
            this.properties.clear();
            product.properties.forEach(() => this.createProperty());
          }
          this.form.patchValue({
            identifier: product.identifier,
            sortOrder: product.sortOrder,
            categories,
            dateAvailable: product.dateAvailable,
            manufacturer: { label: product.manufacturer?.code, value: product.manufacturer },
            type: { label: product.type?.code, value: product.type },
            price: product.price,
            quantity: product.quantity,
            shipeable: product.shipeable,
            canBePurchased: product.canBePurchased,
            visible: product.visible,
            virtual: product.virtual,
            productSpecifications: product.productSpecifications,
            properties: product.properties,
            descriptions: [product.description],
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

  getIndexedFormGroup(index: number) {
    return this.descriptions.controls[index] as FormGroup;
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

  update(ev: Event, id: string, lang: string) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(
      ProductActions.updateProduct({ id: parseInt(id), data: this.form.value, lang })
    );
  }

  hanldeCountryChange(ev: MatSelectChange) {
    this.router.navigate(['/products', 'update', this.form.value.code], {
      queryParams: { lang: ev.value },
    });
  }

  delete(id: string) {
    this.store.dispatch(ProductActions.deleteProduct({ id: parseInt(id) }));
  }
}
