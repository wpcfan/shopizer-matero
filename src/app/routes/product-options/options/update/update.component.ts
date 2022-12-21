import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { ProductOption } from '@models';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, tap } from 'rxjs';
import * as ProductOptionsActions from '../../+state/actions/product-option.actions';
import * as fromProductOptions from '../../+state/selectors/product-option.selectors';

@Component({
  selector: 'app-product-options-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductOptionsUpdateComponent implements OnInit {
  optionTypes = ['select', 'radio', 'checkbox', 'text'];
  languages$ = this.store.select(fromProfile.selectStoreLanguages);
  selected$!: Observable<ProductOption | undefined>;
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
      this.store.dispatch(ProductOptionsActions.getById({ id: parseInt(id), lang }))
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
      order: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
      readOnly: [true],
      type: ['', [Validators.required]],
      descriptions: this.descriptions,
    });
    this.selected$ = this.store.select(fromProductOptions.selectProductOptionSelected).pipe(
      tap(selected => {
        if (selected) {
          this.form.patchValue({
            code: selected.code,
            order: selected.order,
            readOnly: selected.readonly,
            type: selected.type,
            descriptions: [selected.description],
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
      ProductOptionsActions.updateProductOption({ id: parseInt(id), data: this.form.value, lang })
    );
  }

  hanldeCountryChange(ev: MatSelectChange) {
    this.router.navigate(['/product-options', 'options', 'update', this.form.value.code], {
      queryParams: { lang: ev.value },
    });
  }

  delete(id: string) {
    this.store.dispatch(ProductOptionsActions.deleteProductOption({ id: parseInt(id) }));
  }
}
