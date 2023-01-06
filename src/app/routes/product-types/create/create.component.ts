import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Language } from '@models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProductTypeActions from '../+state/actions/product-type.actions';
import { ProductTypeService } from '../+state/services/product-type.service';

@Component({
  selector: 'app-product-types-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTypesCreateComponent implements OnInit {
  languages$!: Observable<Language[]>;
  form!: FormGroup;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: ProductTypeService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      code: ['', [Validators.required], [this.codeValidator()]],
      visible: [true],
      allowAddToCart: [true],
      descriptions: [[]],
    });
    this.languages$ = this.store.select(fromProfile.selectStoreLanguages);
  }

  codeValidator(): AsyncValidatorFn {
    return control => this.service.unique(control.value);
  }

  create(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.dispatch(ProductTypeActions.createProductType({ data: this.form.value }));
  }
}
