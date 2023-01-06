import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { ProductOptionValue } from '@models';
import { Store } from '@ngrx/store';
import { filter, map, Observable, tap } from 'rxjs';
import * as ProductOptionValueActions from '../../+state/actions/product-option-value.actions';
import * as fromProductOptionValue from '../../+state/selectors/product-option-value.selectors';

@Component({
  selector: 'app-product-options-values-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductOptionValueUpdateComponent implements OnInit {
  languages$ = this.store.select(fromProfile.selectStoreLanguages);
  selected$!: Observable<ProductOptionValue | undefined>;
  id$ = this.route.paramMap.pipe(
    filter(params => params.has('id')),
    map(params => params.get('id') as string),
    tap(id => this.store.dispatch(ProductOptionValueActions.getById({ id: parseInt(id) })))
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
      order: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
      sortOrder: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
      defaultValue: [true],
      image: [''],
      name: [''],
      descriptions: [[]],
    });
    this.selected$ = this.store
      .select(fromProductOptionValue.selectProductOptionValueSelected)
      .pipe(
        tap(selected => {
          this.form.patchValue({ ...selected });
        })
      );
  }

  update(ev: Event, id: string) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(
      ProductOptionValueActions.updateProductOptionValue({
        id: parseInt(id),
        data: this.form.value,
      })
    );
  }

  hanldeCountryChange(language: string) {
    this.router.navigate([], {
      queryParams: { lang: language },
    });
  }

  delete(id: string) {
    this.store.dispatch(ProductOptionValueActions.deleteProductOptionValue({ id: parseInt(id) }));
  }
}
